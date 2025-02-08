import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  useToast,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { db } from "../services/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { updateEmail, updatePassword } from "firebase/auth";

const Profile = () => {
  const { user } = useAuth();
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const toast = useToast();

  // Obtengo el historial de compras del usuario
  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      if (user) {
        try {
          const q = query(
            collection(db, "purchases"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          const history = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPurchaseHistory(history);
        } catch (error) {
          console.error("Error al obtener el historial de compras:", error);
          toast({
            title: "Error",
            description: "No se pudo cargar el historial de compras.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPurchaseHistory();
  }, [user, toast]);

  // Actualizo el correo electrónico
 const handleUpdateEmail = async () => {
   if (!newEmail) {
     toast({
       title: "Error",
       description: "Por favor, ingresa un correo electrónico válido.",
       status: "error",
       duration: 3000,
       isClosable: true,
     });
     return;
   }

   try {
     await updateEmail(user, newEmail);
     toast({
       title: "Correo electrónico actualizado",
       description: "Tu correo electrónico se ha actualizado correctamente.",
       status: "success",
       duration: 3000,
       isClosable: true,
     });
     setNewEmail("");
   } catch (error) {
     console.error("Error al actualizar el correo electrónico:", error);
     toast({
       title: "Error",
       description: "No se pudo actualizar el correo electrónico.",
       status: "error",
       duration: 3000,
       isClosable: true,
     });
   }
 };


  // Actualizo la contraseña
 const handleUpdatePassword = async () => {
   if (!newPassword || newPassword.length < 6) {
     toast({
       title: "Error",
       description: "La contraseña debe tener al menos 6 caracteres.",
       status: "error",
       duration: 3000,
       isClosable: true,
     });
     return;
   }

   try {
     await updatePassword(user, newPassword);
     toast({
       title: "Contraseña actualizada",
       description: "Tu contraseña se ha actualizado correctamente.",
       status: "success",
       duration: 3000,
       isClosable: true,
     });
     setNewPassword("");
   } catch (error) {
     console.error("Error al actualizar la contraseña:", error);
     toast({
       title: "Error",
       description: "No se pudo actualizar la contraseña.",
       status: "error",
       duration: 3000,
       isClosable: true,
     });
   }
 };

  if (!user) {
    return (
      <Box p={4}>
        <Text>Debes iniciar sesión para ver tu perfil.</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Mi Perfil
      </Heading>
      <VStack spacing={4} align="start">
        <Text>
          <strong>Correo electrónico:</strong> {user.email}
        </Text>

        {/* Form para actualizar el correo electrónico */}
        <FormControl>
          <FormLabel>Nuevo correo electrónico</FormLabel>
          <Input
            type="email"
            placeholder="Nuevo correo electrónico"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <Button mt={2} colorScheme="teal" onClick={handleUpdateEmail}>
            Actualizar correo electrónico
          </Button>
        </FormControl>

        {/* Form para actualizar la contraseña */}
        <FormControl>
          <FormLabel>Nueva contraseña</FormLabel>
          <Input
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button mt={2} colorScheme="teal" onClick={handleUpdatePassword}>
            Actualizar contraseña
          </Button>
        </FormControl>

        <Heading
          as="h2"
          size="lg"
          mt={4}
          bgGradient="linear(to-l,rgb(144, 199, 198),rgb(184, 220, 180))"
        >
          Historial de Compras 🛒
        </Heading>
        {loading ? (
          <Text>Cargando historial de compras...</Text>
        ) : purchaseHistory.length === 0 ? (
          <Text>No has realizado ninguna compra.</Text>
        ) : (
          purchaseHistory.map((purchase) => (
            <Box
              key={purchase.id}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              w="100%"
            >
              <Text>
                <strong>Fecha:</strong>{" "}
                {purchase.timestamp
                  ? new Date(purchase.timestamp.toDate()).toLocaleDateString()
                  : "Fecha no disponible"}
              </Text>
              <Text>
                <strong>Total:</strong>{" "}
                {purchase.total
                  ? `$${purchase.total.toFixed(2)}`
                  : "Total no disponible"}
              </Text>
              <Text>
                <strong>Productos:</strong>
              </Text>
              {purchase.items && purchase.items.length > 0 ? (
                <VStack spacing={2} align="start" mt={2}>
                  {purchase.items.map((item) => (
                    <Text key={item.id}>
                      {item.name} - ${item.price} x {item.quantity}
                    </Text>
                  ))}
                </VStack>
              ) : (
                <Text>No hay productos en esta compra.</Text>
              )}
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default Profile;
