import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Importação de componentes e assets
import CartIcon from "../pages/CartIcon";
import StatusBar from "../assets/Status Bar (1).png";
import Avatar from "../assets/Avatar.png";
import Logo from "../assets/Logo.png";
import MenuVariant from "../assets/menu-variant.png";

// Interface para definir o formato dos produtos
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  img: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  // Busca os produtos da API ao carregar a página
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/37bb6a40-2006-4d0a-9d3e-ccd2bd7eb50f"
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "375px",
        margin: "0 auto",
        backgroundColor: "#fff",
        padding: "16px",
      }}
    >
      {/* Barra de Status */}
      <img src={StatusBar} alt="Status Bar" style={{ width: "100%" }} />

      {/* Cabeçalho */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          padding: "0 16px",
        }}
      >
        <img src={MenuVariant} alt="Menu" style={{ width: "24px" }} />
        <img src={Logo} alt="Logo" style={{ height: "24px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img
            src={Avatar}
            alt="Avatar"
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
          />
        </div>
      </div>

      {/* Seção de boas-vindas */}
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <img
          src={require("../assets/Frame 31.png")}
          alt="Welcome"
          style={{ width: "80%", maxWidth: "375px", borderRadius: "8px", marginRight: "50px" }}
        />
      </div>

      {/* Barra de Pesquisa */}
      <div style={{ marginTop: "16px" }} onClick={() => navigate("/search")}>
        <input
          type="text"
          placeholder="Search headphone"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "14px",
          }}
        />
      </div>

      {/* Lista de Categorias */}
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <img
          src={require("../assets/Category list.png")}
          alt="Category List"
          style={{ width: "110%", maxWidth: "375px", borderRadius: "8px", marginLeft: "-22px" }}
        />
      </div>

      {/* Banner de Destaque com o primeiro produto */}
      <div
        style={{
          backgroundColor: "#f8f8f8",
          borderRadius: "8px",
          padding: "16px",
          marginTop: "16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={products[0]?.img || ""}
          alt={products[0]?.name || "Product"}
          style={{ width: "80px", height: "80px", marginRight: "16px" }}
        />
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: "bold" }}>{products[0]?.name || "TMA-2 Modular Headphone"}</h2>
          <p style={{ fontSize: "14px", color: "#555" }}>Shop now →</p>
        </div>
      </div>

      {/* Carrossel de Produtos */}
      <div style={{ marginTop: "32px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src={require("../assets/Frame 32.png")}
            alt="See All"
            onClick={() => navigate("/explore")}
            style={{ cursor: "pointer", width: "360px", height: "auto", marginLeft: "-10px" }}
          />
        </div>

        {/* Swiper para navegação entre produtos */}
        <Swiper spaceBetween={16} slidesPerView={2.2}>
          {products.slice(1, 6).map((product, index) => (
            <SwiperSlide key={product.id}>
              <div
                onClick={() => navigate(`/product/${product.id}`)}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  style={{ width: "80px", height: "80px", objectFit: "cover", display: "block", margin: "0 auto" }}
                />
                <h3 style={{ fontSize: "14px", margin: "8px 0", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</h3>
                <p style={{ fontSize: "12px", color: "#555" }}>USD {product.price}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;
