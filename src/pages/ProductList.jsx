import {
  Box,
  SimpleGrid,
  Image,
  Heading,
  Text,
  Button,
  Spinner,
  Link,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { db } from "../services/config";
import { collection, getDocs } from "firebase/firestore";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductList = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast(); 

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product); // Agrego el producto al carrito
    toast({
      title: "Producto agregado",
      description: `${product.name} se ha agregado al carrito.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  
    return (
      <Box p={4}>
        <Heading as="h2" size="lg" mb={4}>
          Todos los Productos
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          {products.map((product) => (
            <Box
              key={product.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
            >
              <Image
                src={product.image}
                alt={product.name}
                boxSize="200px"
                objectFit="cover"
                mx="auto"
              />
              <Heading as="h3" size="md" mt={2} textAlign="center">
                {product.name}
              </Heading>
              <Text fontSize="lg" fontWeight="bold" mt={2} textAlign="center">
                ${product.price}
              </Text>
              <Button
                colorScheme="teal"
                mt={2}
                w="full"
                onClick={() => handleAddToCart(product)}
              >
                Agregar al carrito
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    );
};


export default ProductList;
