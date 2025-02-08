import { VStack, Heading, Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <VStack p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Bienvenido a Mi Ecommerce 💕😜
      </Heading>
      <Text fontSize="lg">Explora nuestros productos destacados.</Text>
    </VStack>
  );
};

export default Home;
