import React from "react";
import FilterImage from "../assets/Filter.png"; 
import { useNavigate } from "react-router-dom";

type FilterScreenProps = {
  onBackPress?: () => void; 
};

const FilterScreen: React.FC<FilterScreenProps> = ({ onBackPress }) => {
  const navigate = useNavigate();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress(); 
    } else {
      navigate(-1); 
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        position: "relative",
        padding: "16px",
      }}
    >
      {/* Botão de fechar */}
      <button
        onClick={handleBackPress}
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          background: "none",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      {/* Conteúdo da tela */}
      <img
        src={FilterImage}
        alt="Filter"
        style={{
          maxWidth: "100%",
          borderRadius: "16px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
};

export default FilterScreen;
