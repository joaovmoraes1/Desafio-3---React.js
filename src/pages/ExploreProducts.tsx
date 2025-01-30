import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import CartIcon from "../pages/CartIcon";
import StatusBar from "../assets/Status Bar (1).png";
import FilterEmpty from "../assets/Filter Empty.png";
import Frame41 from "../assets/Frame 41.png";

// Definição das interfaces para os produtos e reviews
interface Review {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  reviews: Review[];
  rating?: number;
  category: string;
}

const ExploreProducts: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  // Efeito para buscar os produtos ao carregar a página
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://run.mocky.io/v3/37bb6a40-2006-4d0a-9d3e-ccd2bd7eb50f");
        const data = await response.json();

        if (Array.isArray(data)) {
          const storedCategory = localStorage.getItem("selectedCategory") || "";
          const storedSortBy = localStorage.getItem("selectedSortBy") || "";

          let filtered = data;

          // Filtragem baseada na categoria
          if (storedCategory) {
            filtered = filtered.filter((product) => product.category === storedCategory);
          }

          // Ordenação dos produtos conforme a seleção do usuário
          if (storedSortBy === "popularity") {
            filtered = filtered.sort((a, b) => b.reviews.length - a.reviews.length);
          } else if (storedSortBy === "newest") {
            filtered = filtered.sort((a, b) => b.id.localeCompare(a.id));
          } else if (storedSortBy === "oldest") {
            filtered = filtered.sort((a, b) => a.id.localeCompare(b.id));
          } else if (storedSortBy === "highPrice") {
            filtered = filtered.sort((a, b) => b.price - a.price);
          } else if (storedSortBy === "lowPrice") {
            filtered = filtered.sort((a, b) => a.price - b.price);
          }

          setFilteredProducts(filtered);
        } else {
          console.error("Formato inesperado da API:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  // Função para abrir a tela de filtros
  const openFilter = () => {
    navigate("/filter");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#fff", overflow: "hidden" }}>
      {/* Barra de Status */}
      <div style={{ flexShrink: 0 }}>
        <img src={StatusBar} alt="Status Bar" style={{ width: "100%", height: "auto", marginBottom: 8 }} />
      </div>

      {/* Cabeçalho */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px", marginBottom: 8, flexShrink: 0 }}>
        <FiArrowLeft size={24} onClick={() => navigate("/search")} style={{ cursor: "pointer" }} />
        <CartIcon />
      </div>

      {/* Banner e botão de filtro */}
      <div style={{ textAlign: "center", marginBottom: 16, flexShrink: 0 }}>
        <img src={Frame41} alt="TMA Wireless" style={{ width: "80%", height: "auto", marginBottom: "16px" }} />
        <div onClick={openFilter} style={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
          <img src={FilterEmpty} alt="Filter Icon" style={{ width: "300px", height: "auto" }} />
        </div>
      </div>

      {/* Lista de Produtos */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 16 }}>
        {filteredProducts.map((product) => {
          const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
          const averageRating = totalRating / product.reviews.length || 0;

          return (
            <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "8px", backgroundColor: "#fff", textAlign: "center", cursor: "pointer", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
              <img src={product.img} alt={product.name} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "4px", marginBottom: "8px" }} />
              <h4 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "4px" }}>{product.name}</h4>
              <p style={{ fontSize: "12px", color: "#555", marginBottom: "8px" }}>USD {product.price.toFixed(2)}</p>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <span style={{ fontSize: "12px", marginRight: "4px" }}>{Array.from({ length: 5 }, (_, index) => (<span key={index} style={{ color: index < averageRating ? "#FFD700" : "#ddd" }}>★</span>))}</span>
                <span style={{ fontSize: "12px", color: "#555" }}>{product.reviews.length} Reviews</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreProducts;
