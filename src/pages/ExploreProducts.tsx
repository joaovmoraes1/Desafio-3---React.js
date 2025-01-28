import React, { useEffect, useState } from "react";
import axios from "axios";
import TitlePage from "../assets/Title Page .png";
import StatusBar from "../assets/Status Bar (1).png";
import Frame41 from "../assets/Frame 41.png";
import FilterEmpty from "../assets/Filter Empty.png";
import Frame37 from "../assets/Frame 37.png";

interface ExploreProductsProps {
  onFilterPress: () => void;
  onBackPress: () => void;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ExploreProducts: React.FC<ExploreProductsProps> = ({ onFilterPress, onBackPress }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>("https://run.mocky.io/v3/06cb6f62-8e0b-4572-a09d-3811638fc52f")
      .then((response) => {
        // Garante que os dados sejam um array antes de atualizar o estado
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("A resposta não é um array:", response.data);
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
        setProducts([]); // Configura um array vazio em caso de erro
      });
  }, []);
  

  return (
    <div style={{ backgroundColor: "white", padding: "16px", maxWidth: "375px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      {/* Status Bar */}
      <img src={StatusBar} alt="Status Bar" style={{ width: "100%", marginTop: "50px",}} />

      {/* Header */}
      <div onClick={onBackPress} style={{ cursor: "pointer", width: "100%", maxWidth: "375px", margin: "0 auto"}}>
        <img src={TitlePage} alt="Title Page" style={{ width: "100%" }} />
      </div>

      {/* Title Section */}
      <div style={{ display: "flex", justifyContent: "center", margin: "8px 0" }}>
        <img src={Frame41} alt="TMA Wireless" style={{ width: "90%", maxWidth: "250px", height: "auto" }} />
      </div>

      {/* Filter Section */}
      <div style={{ display: "flex", justifyContent: "center", margin: "8px 0" }}>
        <img
          src={FilterEmpty}
          alt="Filter"
          onClick={onFilterPress}
          style={{
            cursor: "pointer",
            width: "90%",
            maxWidth: "300px",
            height: "auto",
            borderRadius: "8px",
          }}
        />
      </div>

      {/* Product Display */}
      <div style={{ margin: "16px 0" }}>
        {products.length > 0 ? (
          products.map(product => (
            <div
              key={product.id}
              style={{
                marginBottom: "16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "8px",
              }}
            >
              <h3>{product.name}</h3>
              <p>USD {product.price}</p>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </div>
          ))
        ) : (
          <p>Carregando produtos...</p>
        )}
      </div>

      {/* Static Image */}
      <div style={{ display: "flex", justifyContent: "center", margin: "16px 0" }}>
        <img
          src={Frame37}
          alt="Frame 37"
          style={{
            width: "92%",
            maxWidth: "680px",
            height: "auto",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

export default ExploreProducts;