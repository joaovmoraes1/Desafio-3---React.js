import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiTrash } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import StatusBarImage from "../assets/Status Bar (1).png";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cart, clearCart, updateItemQuantity, totalItems, totalPrice } = useCart();
  
  // Estado para exibir o modal de confirmação
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Função para abrir o modal
  const handleClearCart = () => {
    setShowConfirmModal(true);
  };

  // Função para confirmar a limpeza do carrinho
  const confirmClearCart = () => {
    clearCart();
    setShowConfirmModal(false); // Fecha o modal após limpar o carrinho
  };

  return (
    <div
      style={{
        fontFamily: "'Arial', sans-serif",
        maxWidth: "375px",
        margin: "0 auto",
        backgroundColor: "#fff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
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
        <FiArrowLeft size={24} onClick={() => navigate(-1)} style={{ cursor: "pointer" }} />
        <h1 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>Shopping Cart</h1>
        <FiTrash size={24} onClick={handleClearCart} style={{ cursor: "pointer", color: "red" }} />
      </div>

      {/* Conteúdo */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        {cart.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>Seu carrinho está vazio.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
              />
              <div style={{ flex: 1, marginLeft: "16px" }}>
                <h3 style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>{item.name}</h3>
                <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>USD {item.price.toFixed(2)}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} style={buttonStyle}>-</button>
                <span style={{ margin: "0 8px", fontSize: "14px" }}>{item.quantity}</span>
                <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} style={buttonStyle}>+</button>
                <FiTrash size={20} onClick={() => updateItemQuantity(item.id, 0)} style={{ cursor: "pointer", color: "red" }} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total e Botão */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid #ddd",
          backgroundColor: "#fff",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
          <span style={{ fontSize: "14px", color: "#666" }}>Total {totalItems} Items</span>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>USD {totalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          style={{
            width: "100%",
            padding: "16px",
            backgroundColor: "#00A859",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "background 0.3s ease-in-out, transform 0.1s ease-in-out",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.backgroundColor = "#00804D";
            e.currentTarget.style.transform = "scale(0.95)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.backgroundColor = "#00A859";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Proceed to Checkout
        </button>
      </div>

      {/* Modal de Confirmação */}
      {showConfirmModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <p style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "20px" }}>
              Tem certeza que deseja limpar o carrinho?
            </p>
            <button
              onClick={confirmClearCart}
              style={{
                backgroundColor: "#0a0a0a",
                color: "#fff",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Sim, limpar
            </button>
            <button
              onClick={() => setShowConfirmModal(false)}
              style={{
                backgroundColor: "#ccc",
                color: "#000",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Estilos para os botões de quantidade
const buttonStyle = {
  width: "32px",
  height: "32px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f0f0f0",
  border: "1px solid #ddd",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

export default ShoppingCart;
