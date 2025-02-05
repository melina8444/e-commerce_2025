import { Box, Heading, Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Bienvenido a Mi Ecommerce 💕😜
      </Heading>
      <Text fontSize="lg">Explora nuestros productos destacados.</Text>
    </Box>
  );
};

export default Home;
