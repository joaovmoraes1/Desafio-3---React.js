import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // Provedor do carrinho de compras

// Importação das páginas do aplicativo
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ProductDetail from "./pages/ProductDetail";
import ExploreProducts from "./pages/ExploreProducts";
import FilterScreen from "./pages/FilterScreen";
import Features from "./pages/Features";
import ShoppingCart from "./pages/ShoppingCart";

function App() {
  return (
    // Envolve o aplicativo dentro do CartProvider para fornecer acesso ao carrinho globalmente
    <CartProvider>
      <Router>
        <Routes>
          {/* Definição das rotas do aplicativo */}
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore" element={<ExploreProducts />} />
          <Route path="/filter" element={<FilterScreen />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/features/:productId" element={<Features />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />

          {/* Rota coringa: Redireciona para SignIn caso a rota não seja encontrada */}
          <Route path="*" element={<SignIn />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;