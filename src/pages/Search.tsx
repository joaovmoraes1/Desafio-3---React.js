import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatusBarImage from "../assets/Status Bar (1).png"; // Status Bar
import ProductIcon from "../assets/product_list_item.png";
import ProductListFrame from "../assets/Frame_47.png"; // Lista de Produtos

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  popularity: number;
}

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

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
        setFilteredProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  const getPopularProducts = () => {
    return products.sort((a, b) => b.popularity - a.popularity).slice(0, 3);
  };

  const popularProducts = getPopularProducts();

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#fff",
        maxWidth: "375px",
        margin: "0 auto",
        minHeight: "100vh",
      }}
    >
      {/* Barra de Status */}
      <div>
        <img src={StatusBarImage} alt="Status Bar" style={{ width: "100%" }} />
      </div>

      {/* Cabeçalho */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1px 16px",
          borderBottom: "1px solid #ddd",
        }}
      >
        {/* Botão de Voltar */}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            padding: "0",
            margin: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            width: "340px",
            height: "40px",
          }}
        >
          <img
            src={require("../assets/title_page.png")}
            alt="Back"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
            }}
          />
        </button>

        {/* Título da página */}
        <h1
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            margin: "0",
            textAlign: "center",
            flex: 1,
          }}
        >
          
        </h1>

        {/* Placeholder para manter alinhamento */}
        <div style={{ width: "40px" }}></div>
      </div>

      {/* Campo de Busca */}
      <div style={{ padding: "16px" }}>
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
            outline: "none",
          }}
        />
      </div>

      {/* Imagem Acima da Lista de Produtos */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <img
          src={ProductIcon}
          alt="Produto"
          style={{
            width: "100%",
            objectFit: "contain",
            borderRadius: "8px",
            padding: "0 16px",
          }}
        />
      </div>

      {/* Lista de Produtos */}
      <div style={{ padding: "0 17px" }}>
        {/* Exibir produtos populares */}
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>
            
          </h2>
          {popularProducts.map((product) => (
            <div key={product.id} style={{ marginBottom: "16px" }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <h3 style={{ fontSize: "16px", margin: "8px 0" }}>
                {product.name}
              </h3>
              <p style={{ color: "#555", margin: "4px 0" }}>
                USD {product.price}
              </p>
              <p style={{ color: "#999", fontSize: "14px" }}>
                {product.rating} ({product.reviews} Reviews)
              </p>
            </div>
          ))}
        </div>

        {/* Exibir produtos filtrados somente se houver resultados */}
        {filteredProducts.length > 0 && (
          <div>
            <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>
              Search Results
            </h2>
            {filteredProducts.map((product) => (
              <div key={product.id} style={{ marginBottom: "16px" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
                <h3 style={{ fontSize: "16px", margin: "8px 0" }}>
                  {product.name}
                </h3>
                <p style={{ color: "#555", margin: "4px 0" }}>
                  USD {product.price}
                </p>
                <p style={{ color: "#999", fontSize: "14px" }}>
                  {product.rating} ({product.reviews} Reviews)
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Imagem da Lista de Produtos */}
      <div style={{ padding: "0 17px" }}>
        <img
          src={ProductListFrame}
          alt="Lista de Produtos"
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default Search;