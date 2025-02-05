import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../services/config";
import { doc, getDoc } from "firebase/firestore";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
    const { addToCart } = useCart();
  const { id } = useParams(); // Obtengo el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("Producto no encontrado");
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box textAlign="center" mt={10}>
        <Text>Producto no encontrado</Text>
      </Box>
    );
  }

  
    return (
    <Box p={4}>
      <VStack spacing={4} align="center">
        <Image src={product.image} alt={product.name} boxSize="300px" objectFit="cover" />
        <Heading as="h1" size="xl">
          {product.name}
        </Heading>
        <Text fontSize="2xl" fontWeight="bold">
          ${product.price}
        </Text>
        <Text>{product.description || 'Descripción no disponible'}</Text>
        <Button colorScheme="teal" size="lg" onClick={() => addToCart(product)}>
          Agregar al carrito
        </Button>
      </VStack>
    </Box>
  );
  
};

export default ProductDetail;
