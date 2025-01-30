import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import CartIcon from "../pages/CartIcon";
import Avatar from "../assets/Avatar.png"; // Ajuste o caminho conforme a estrutura do projeto

// Importando os assets
import StatusBarImage from "../assets/Status Bar (1).png";
import Frame44Image from "../assets/Frame 44.png";
import TabBarDescriptionImage from "../assets/Tab Bar Description.png";
import Frame32Image from "../assets/Frame 32 (1).png";
import ButtonImage from "../assets/Button.png";

import { FiArrowLeft } from "react-icons/fi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  details: string;
  reviews: Review[];
}

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    axios
      .get<Product[]>("https://run.mocky.io/v3/37bb6a40-2006-4d0a-9d3e-ccd2bd7eb50f")
      .then((response) => {
        const selectedProduct = response.data.find((p) => p.id === productId) || null;
        setProduct(selectedProduct);
        setRecommendedProducts(response.data.filter((p) => p.id !== productId));
      })
      .catch((error) => console.error("Erro ao buscar detalhes do produto:", error));
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      setIsAddingToCart(true);
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.img,
        quantity: 1,
      });

      // Mostrar mensagem de sucesso
      setShowSuccessMessage(true);

      // Ocultar mensagem de sucesso após 2 segundos
      setTimeout(() => {
        setShowSuccessMessage(false);
        setIsAddingToCart(false);
      }, 2000);
    }
  };

  const handleNavigateToFeatures = () => {
    navigate(`/features/${productId}`);
  };

  if (!product) return <div>Carregando...</div>;

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
          onClick={() => navigate("/Home")}
          style={{ cursor: "pointer" }}
        />
        <h1 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>
          {product.name}
        </h1>
        <CartIcon />
      </div>

      {/* Conteúdo Principal */}
      <div style={{ padding: "16px" }}>
        <img
          src={Frame44Image}
          alt="Frame 44"
          style={{ width: "100%", marginBottom: "16px" }}
        />

        {/* Tab Bar Description */}
        <img
          src={TabBarDescriptionImage}
          alt="Tab Bar Description"
          style={{
            width: "100%",
            marginBottom: "16px",
            cursor: "pointer",
          }}
          onClick={handleNavigateToFeatures}
        />

        <img
          src={product.img}
          alt={product.name}
          style={{
            width: "100%",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        />

        {/* Lista de Reviews dinâmica */}
        <h3 style={{ marginBottom: "8px" }}>Reviews</h3>
        {product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <div
              key={review.userId}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f8f8f8",
                padding: "8px",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            >
              <img
                src={Avatar}
                alt="User Avatar"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
              />

              <div>
                <strong>{review.userName}</strong>
                <p style={{ margin: "4px 0", fontSize: "14px" }}>
                  {Array(review.rating).fill("⭐").join(" ")}
                </p>
                <p style={{ margin: "4px 0", fontSize: "12px", color: "#666" }}>
                  {review.comment}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ fontSize: "14px", color: "#999" }}>
            Nenhuma avaliação disponível.
          </p>
        )}

        {/* Produtos Recomendados */}
        <div style={{ marginTop: "32px" }}>
          <img
            src={Frame32Image}
            alt="Produtos Recomendados"
            style={{
              width: "100%",
              marginBottom: "16px",
            }}
          />
          <Slider
            dots={false}
            arrows={false}
            infinite={true}
            speed={500}
            slidesToShow={2}
            slidesToScroll={1}
          >
            {recommendedProducts.map((recProduct) => (
              <div
                key={recProduct.id}
                onClick={() => navigate(`/product/${recProduct.id}`)}
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  padding: "8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={recProduct.img}
                  alt={recProduct.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}
                />
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    margin: "0 0 4px",
                    color: "#000",
                  }}
                >
                  {recProduct.name}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#00A859",
                    margin: 0,
                  }}
                >
                  USD {recProduct.price.toFixed(2)}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Mensagem de Sucesso */}
      {showSuccessMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#00A859",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            fontSize: "14px",
            zIndex: 1000,
          }}
        >
          Adicionado com sucesso!
        </div>
      )}

      {/* Botão de Adicionar ao Carrinho */}
      <img
        src={ButtonImage}
        alt="Adicionar ao Carrinho"
        onClick={handleAddToCart}
        style={{
          width: "100%",
          cursor: "pointer",
          marginTop: "32px",
        }}
      />
    </div>
  );
};

export default ProductDetail;
