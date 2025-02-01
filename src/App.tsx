import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importação do roteamento
import { CartProvider } from "./context/CartContext"; // Provedor do carrinho de compras

// Importação das páginas do aplicativo
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ProductDetail from "./pages/ProductDetail";
import ExploreProducts from "./pages/ExploreProducts";
import Features from "./pages/Features";
import ShoppingCart from "./pages/ShoppingCart";


function App() {
  return (
    // Provedor do carrinho de compras para gerenciar os estados do carrinho globalmente
    <CartProvider>
      <Router>
        <Routes>
          {/* Definição das rotas do aplicativo */}
          <Route path="/" element={<SignIn />} /> {/* Página inicial de login */}
          <Route path="/signin" element={<SignIn />} /> {/* Login */}
          <Route path="/signup" element={<SignUp />} /> {/* Cadastro */}
          <Route path="/home" element={<Home />} /> {/* Página principal */}
          <Route path="/search" element={<Search />} /> {/* Página de busca */}
          <Route path="/explore" element={<ExploreProducts />} /> {/* Exploração de produtos */}
          <Route path="/product/:productId" element={<ProductDetail />} /> {/* Detalhes do produto */}
          <Route path="/features/:productId" element={<Features />} /> {/* Recursos do produto */}
          <Route path="/shopping-cart" element={<ShoppingCart />} /> {/* Carrinho de compras */}

          {/* Rota coringa: Redireciona para SignIn caso a rota não seja encontrada */}
          <Route path="*" element={<SignIn />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

// Exporta o componente principal do aplicativo
export default App;
