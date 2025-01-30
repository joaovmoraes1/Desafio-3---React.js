import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FilterScreen: React.FC = () => {
  const [category, setCategory] = useState<string>("headphones");
  const [sortBy, setSortBy] = useState<string>("popularity");
  const navigate = useNavigate();

  const handleBackPress = () => {
    navigate(-1);
  };

  const applyFilter = () => {
    localStorage.setItem("selectedCategory", category);
    localStorage.setItem("selectedSortBy", sortBy);
    navigate("/explore");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#fff",
        borderRadius: "20px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        maxWidth: "360px",
        margin: "auto",
        padding: "16px",
        position: "relative",
      }}
    >
      {/* Botão de fechar */}
      <button
        onClick={handleBackPress}
        style={{
          position: "absolute",
          top: "0px",
          right: "12px",
          backgroundColor: "transparent",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
          color: "#000",
          marginRight: "-120px",
        }}
      >
        ✕
      </button>

      {/* Título */}
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "16px",
          marginRight: "200px",
        }}
      >
        Filter
      </h3>

      {/* Categoria */}
      <div style={{ width: "100%", marginBottom: "24px" }}>
        <h4 style={{ marginBottom: "8px", fontWeight: "bold" }}>Category</h4>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => setCategory("headphones")}
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: category === "headphones" ? "#28a745" : "#f1f1f1",
              color: category === "headphones" ? "#fff" : "#000",
              border: "none",
              borderRadius: "20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Headphone
          </button>
          <button
            onClick={() => setCategory("headsets")}
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: category === "headsets" ? "#28a745" : "#f1f1f1",
              color: category === "headsets" ? "#fff" : "#000",
              border: "none",
              borderRadius: "20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Headset
          </button>
        </div>
      </div>

      {/* Ordenação */}
      <div style={{ width: "100%", marginBottom: "24px" }}>
        <h4 style={{ marginBottom: "8px", fontWeight: "bold" }}>Sort By</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[
            { key: "popularity", label: "Popularity" },
            { key: "newest", label: "Newest" },
            { key: "oldest", label: "Oldest" },
            { key: "highPrice", label: "High Price" },
            { key: "lowPrice", label: "Low Price" },
          ].map((option) => (
            <button
              key={option.key}
              onClick={() => setSortBy(option.key)}
              style={{
                padding: "10px",
                backgroundColor: sortBy === option.key ? "#28a745" : "#f1f1f1",
                color: sortBy === option.key ? "#fff" : "#000",
                border: "none",
                borderRadius: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Botão de aplicar filtro */}
      <button
        onClick={applyFilter}
        style={{
          padding: "12px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          width: "100%",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        Apply Filter
      </button>
    </div>
  );
};

export default FilterScreen;
