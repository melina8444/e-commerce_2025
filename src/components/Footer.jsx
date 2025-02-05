import { Box, Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="gray.800" p={4} color="white" mt="auto">
      <Flex justify="center" align="center" direction="column">
        <Text>© 2025 - Melina Yangüez | Mi Ecommerce. Todos los derechos reservados.</Text>
        <Flex mt={2}>
          <Link href="#" mx={2}>
            Instagram
          </Link>
          <Link href="#" mx={2}>
            Twitter
          </Link>
          <Link href="#" mx={2}>
            Facebook
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
