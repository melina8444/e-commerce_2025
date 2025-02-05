import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { auth } from "../services/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError("Error al registrarse. Inténtalo de nuevo.");
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="center">
        <Heading as="h1" size="xl">
          Registrarse
        </Heading>
        {error && <Text color="red.500">{error}</Text>}
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleRegister}>
          Registrarse
        </Button>
        <Text>
          ¿Ya tienes una cuenta?{" "}
          <ChakraLink as={RouterLink} to="/login" color="teal.500">
            Inicia Sesión
          </ChakraLink>
        </Text>
      </VStack>
    </Box>
  );
};

export default Register;
