import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  Text,
  Link as ChakraLink,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
        navigate("/products");
    } catch (error) {
      setError("Correo electrónico o contraseña incorrectos");
      toast({
        title: "Error",
        description: "Correo electrónico o contraseña incorrectos.",
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
          Iniciar Sesión
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
        <Button colorScheme="teal" onClick={handleLogin}>
          Iniciar Sesión
        </Button>
        <Text>
          ¿No tienes una cuenta?{" "}
          <ChakraLink as={RouterLink} to="/register" color="teal.500">
            Regístrate
          </ChakraLink>
        </Text>
        <Text>
          ¿Olvidaste tu contraseña?{" "}
          <ChakraLink as={RouterLink} to="/forgot-password" color="teal.500">
            Recuperar contraseña
          </ChakraLink>
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;
