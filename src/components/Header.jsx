import { Box, Flex, Link, Button, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <Box bg="teal.500" p={4} color="white">
      <Flex align="center">
        <Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold">
          Mi Ecommerce
        </Link>
        <Spacer />
        <Link as={RouterLink} to="/products" mx={2}>
          Productos
        </Link>
        <Link as={RouterLink} to="/checkout" mx={2}>
          Carrito
        </Link>
        {user ? (
          <>
            <Link as={RouterLink} to="/profile" mx={2}>
              Mis Datos
            </Link>
            <Button
              colorScheme="teal"
              variant="outline"
              mx={2}
              onClick={logout}
            >
              Cerrar Sesión
            </Button>
          </>
        ) : (
          <>
            <Button
              as={RouterLink}
              to="/login"
              colorScheme="teal"
              variant="outline"
              mx={2}
            >
              Iniciar Sesión
            </Button>
            <Button as={RouterLink} to="/register" colorScheme="teal" mx={2}>
              Registrarse
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
