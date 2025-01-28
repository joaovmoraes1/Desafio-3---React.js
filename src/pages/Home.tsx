import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Importando os assets
import Avatar from "../assets/Avatar.png";
import Logo from "../assets/Logo.png";
import MenuVariant from "../assets/menu-variant.png";
import StatusBar from "../assets/Status Bar (1).png";
import Frame31 from "../assets/Frame 31.png";
import Frame32 from "../assets/Frame 32.png"; // Nova imagem adicionada
import BannerDefault from "../assets/Banner default.png";
import HeadphoneImage from "../assets/fone.png";
import CableImage from "../assets/cabo.png";

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

  const fetchProducts = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL || "");
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }
      const data = await response.json();
      setProducts(data.featuredProducts || []);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  const staticProducts = [
    {
      id: "1",
      name: "Fone Premium",
      img: HeadphoneImage,
      price: 120,
    },
    {
      id: "2",
      name: "Cabo Ultra",
      img: CableImage,
      price: 25,
    },
  ];

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "375px",
        margin: "0 auto",
        backgroundColor: "#fff",
        padding: "0",
      }}
    >
      {/* Barra de Status */}
      <div style={{ marginTop: "290px" }}>
        <img src={StatusBar} alt="Status Bar" style={{ width: "100%" }} />
      </div>

      {/* Cabeçalho */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          height: "56px",
          backgroundColor: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={MenuVariant}
            alt="Menu"
            style={{
              height: "20px",
              marginRight: "99px",
              cursor: "pointer",
            }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={Logo}
              alt="Logo"
              style={{
                height: "24px",
                marginRight: "8px",
              }}
            />
            <span
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                color: "#000",
              }}
            ></span>
          </div>
        </div>
        <img
          src={Avatar}
          alt="Avatar"
          style={{
            height: "32px",
            width: "32px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
      </div>

      {/* Boas-vindas */}
      <div style={{ padding: "0 16px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0" }}>
          Hi, Andrea
        </h1>
        <img
          src={Frame31}
          alt="Welcome Frame"
          style={{ width: "100%", marginTop: "8px", borderRadius: "8px" }}
        />
      </div>

      {/* Barra de Pesquisa */}
      <div
        style={{ cursor: "pointer", padding: "16px" }}
        onClick={() => navigate("/search")}
      >
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

      {/* Categorias */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "16px",
          backgroundColor: "#f8f8f8",
          borderRadius: "8px",
          margin: "16px",
        }}
      >
        <button
          style={{
            backgroundColor: "#00a859",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "16px",
            border: "none",
            fontSize: "14px",
            marginRight: "8px",
          }}
        >
          Headphone
        </button>
        <button
          style={{
            backgroundColor: "#ddd",
            color: "#000",
            padding: "8px 16px",
            borderRadius: "16px",
            border: "none",
            fontSize: "14px",
          }}
        >
          Headset
        </button>
      </div>

      {/* Banner */}
      <div style={{ padding: "16px", textAlign: "center" }}>
        <div
          style={{
            backgroundColor: "#f8f8f8",
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          <img
            src={BannerDefault}
            alt="TMA-2 Modular Headphone"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>
      </div>

      {/* Produtos em Destaque */}
      <div style={{ padding: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: "0", fontSize: "18px", fontWeight: "bold" }}>
            
          </h2>
          <img
            src={Frame32}
            alt="See All"
            style={{ cursor: "pointer", height: "19px" ,  marginRight: "1px"}}
            onClick={() => navigate("/explore")}
          />
        </div>

        <Swiper spaceBetween={16} slidesPerView={1.5}>
          {products
            .filter((product) => product.category === "Headphone")
            .map((product) => (
              <SwiperSlide key={product.id}>
                <div
                  style={{
                    textAlign: "center",
                    borderRadius: "8px",
                    padding: "16px",
                    backgroundColor: "#f8f8f8",
                  }}
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                      marginBottom: "8px",
                    }}
                  />
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      margin: "8px 0",
                    }}
                  >
                    {product.name}
                  </p>
                  <p style={{ fontSize: "12px", color: "#555" }}>
                    USD {product.price}
                  </p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Produtos Fixos */}
      <div style={{ padding: "16px" }}>
        <Swiper spaceBetween={16} slidesPerView={1.5}>
          {staticProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div
                style={{
                  textAlign: "center",
                  borderRadius: "8px",
                  padding: "16px",
                  backgroundColor: "#f8f8f8",
                }}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "contain",
                    marginBottom: "8px",
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;