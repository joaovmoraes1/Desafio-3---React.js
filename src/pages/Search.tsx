import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatusBarImage from "../assets/Status Bar (1).png"; // Imagem da barra de status
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiArrowLeft, FiMoreVertical } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import CartIcon from "../pages/CartIcon";

// Definição da interface do produto
interface Product {
  id: string;
  name: string;
  img: string;
  price: number;
  popularity: number;
  reviews: Array<{ rating: number }>;
}

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de busca
  const [products, setProducts] = useState<Product[]>([]); // Lista de produtos da API
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Lista de produtos filtrados
  const navigate = useNavigate();

  // Busca os produtos da API ao carregar a página
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://run.mocky.io/v3/37bb6a40-2006-4d0a-9d3e-ccd2bd7eb50f");
        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  // Atualiza a lista de produtos filtrados conforme a busca
  useEffect(() => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  // Obtém os 3 produtos mais populares
  const popularProducts = products
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);

  // Renderiza um cartão de produto
  const renderProductCard = (product: Product) => (
    <div
      key={product.id}
      onClick={() => navigate(`/product/${product.id}`)} // Redireciona para a página do produto
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "8px",
        cursor: "pointer", // Indica que o card é clicável
      }}
    >
      <img
        src={product.img}
        alt={product.name}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "8px",
          marginRight: "12px",
        }}
      />
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: "14px", margin: "0 0 4px" }}>{product.name}</h3>
        <p style={{ fontSize: "12px", color: "#555", margin: "0 0 4px" }}>
          USD {product.price}
        </p>
        <div style={{ display: "flex", alignItems: "center", fontSize: "12px" }}>
          <FaStar color="#FFD700" style={{ marginRight: "4px" }} />
          <span>
            {(
              product.reviews.reduce((a, b) => a + b.rating, 0) / product.reviews.length
            ).toFixed(1)} Stars
          </span>
          <span style={{ marginLeft: "8px" }}>
            {product.reviews.length} Reviews
          </span>
        </div>
      </div>
      <FiMoreVertical size={16} />
    </div>
  );

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#fff",
        maxWidth: "375px",
        margin: "0 auto",
        padding: "16px",
      }}
    >
      {/* Barra de Status */}
      <img src={StatusBarImage} alt="Status Bar" style={{ width: "100%" }} />

      {/* Cabeçalho */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <FiArrowLeft size={24} onClick={() => navigate("/Home")} />
        <h1 style={{ fontSize: "18px", fontWeight: "bold" }}>Search</h1>
        <CartIcon />
      </div>

      {/* Campo de Busca */}
      <input
        type="text"
        placeholder="Search headphone"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          fontSize: "14px",
          marginBottom: "16px",
        }}
      />

      {/* Resultados da Pesquisa */}
      {searchTerm && (
        <div>
          <h2 style={{ fontSize: "16px", marginBottom: "8px" }}>Search Results</h2>
          {filteredProducts.map(renderProductCard)}
        </div>
      )}

      {/* Produtos Populares */}
      <h2 style={{ fontSize: "16px", marginBottom: "8px" }}>Popular Products</h2>
      <div>{popularProducts.map(renderProductCard)}</div>
    </div>
  );
};

export default Search;
