import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { auth } from "../services/config";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Correo enviado",
        description: "Se ha enviado un correo para restablecer tu contraseña.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      toast({
        title: "Error",
        description:
          "No se pudo enviar el correo. Verifica tu dirección de correo electrónico.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="center">
        <Heading as="h1" size="xl">
          Recuperar Contraseña
        </Heading>
        <Text>
          Ingresa tu correo electrónico para restablecer tu contraseña 😉.
        </Text>
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleResetPassword}>
          Enviar correo
        </Button>
      </VStack>
    </Box>
  );
};

export default ForgotPassword;
