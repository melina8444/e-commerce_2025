import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useToast,
  
} from "@chakra-ui/react";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../services/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFinalizePurchase = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para finalizar la compra.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (cart.length === 0) {
      toast({
        title: "Error",
        description: "Tu carrito está vacío.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Guarda la compra en Firestore
      const purchaseData = {
        userId: user.uid,
        items: cart,
        total: total,
        timestamp: serverTimestamp(),
      };

      

      await addDoc(collection(db, "purchases"), purchaseData);

      // Limpia el carrito
      clearCart();

      //mensaje de compra exitosa
      toast({
        title: "Compra exitosa",
        description: "Tu compra se ha realizado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirige al usuario al historial de compras
      navigate("/profile");
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      toast({
        title: "Error",
        description: "Hubo un error al procesar tu compra. Inténtalo de nuevo.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Carrito de Compras
      </Heading>
      {cart.length === 0 ? (
        <Text>Tu carrito está vacío.</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {cart.map((item) => (
            <Box key={item.id} borderWidth="1px" borderRadius="lg" p={4}>
              <HStack spacing={4}>
                <Image
                  src={item.image}
                  alt={item.name}
                  boxSize="100px"
                  objectFit="cover"
                />
                <VStack align="start" flex={1}>
                  <Heading as="h3" size="md">
                    {item.name}
                  </Heading>
                  <Text>${item.price}</Text>
                </VStack>
                <NumberInput
                  value={item.quantity}
                  min={1}
                  onChange={(value) =>
                    updateQuantity(item.id, parseFloat(value))
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button
                  colorScheme="red"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </Button>
              </HStack>
            </Box>
          ))}
          <Box textAlign="right">
            <Text fontSize="xl" fontWeight="bold">
              Total: ${total.toFixed(2)}
            </Text>
            <Button colorScheme="teal" mt={4} onClick={handleFinalizePurchase}>
              Finalizar Compra
            </Button>
          </Box>
        </VStack>
      )}
    </Box>
  );
};

export default Checkout; 
