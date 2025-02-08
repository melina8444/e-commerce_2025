import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
// import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { Grid, GridItem } from "@chakra-ui/react";

function App() {
  return (
    <Router>
      <Grid
        templateAreas={`"header"
                  "main"
                  "footer"`}
        gridTemplateRows={"100px 1fr 70px"}
        gap="1"
        fontWeight="bold"
        minHeight="100vh"
      >
        <Header />
        <GridItem pl="2" bg="white.300" area={"main"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </GridItem>
        <Footer />
      </Grid>
    </Router>
  );
}

export default App;
