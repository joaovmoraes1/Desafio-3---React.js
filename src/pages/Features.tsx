import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CartIcon from "../pages/CartIcon"; 

// Importação de imagens utilizadas na interface
import StatusBarImage from "../assets/Status Bar (1).png";
import Frame44Image from "../assets/Frame 44.png";
import TabBarDescriptionImage from "../assets/Tab Bar Descrption 1.png";
import Frame54Image from "../assets/Frame 54.png";
import ButtonImage from "../assets/Button.png";

// Ícones
import { FiArrowLeft } from "react-icons/fi";

const Features: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>(); // Obtém o ID do produto via URL

  return (
    <div
      style={{
        fontFamily: "'Arial', sans-serif",
        maxWidth: "375px",
        margin: "0 auto",
        backgroundColor: "#fff",
        height: "100vh",
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
          padding: "16px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <FiArrowLeft
          size={24}
          onClick={() => navigate(-1)} // Voltar para a página anterior
          style={{ cursor: "pointer" }}
        />
        <h1 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>
          Features
        </h1>
        <CartIcon /> {/* Ícone do carrinho */}
      </div>

      {/* Conteúdo Principal */}
      <div
        style={{
          padding: "16px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Imagem principal */}
        <img
          src={Frame44Image}
          alt="Frame 44"
          style={{ width: "100%", marginBottom: "16px" }}
        />

        {/* Barra de descrição */}
        <img
          src={TabBarDescriptionImage}
          alt="Tab Bar Description"
          style={{ width: "100%", marginBottom: "16px" }}
        />

        {/* Outra seção de informações */}
        <img
          src={Frame54Image}
          alt="Frame 54"
          style={{ width: "100%", marginBottom: "100px" }}
        />

        {/* Botão de adicionar ao carrinho */}
        <button
          onClick={() => navigate(-1)} // Volta para a página anterior
          style={{
            width: "100%",
            padding: "16px",
            backgroundColor: "#00A859",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          <img src={ButtonImage} alt="Add to Cart" style={{ width: "100%" }} />
        </button>
      </div>
    </div>
  );
};

export default Features;
