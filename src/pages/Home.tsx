import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Hook para navegação entre páginas
import { Swiper, SwiperSlide } from "swiper/react"; // Biblioteca para o carrossel de produtos
import "swiper/css"; // Importação do CSS do Swiper
import styles from "../styles/Home.module.css"; // Importação dos estilos CSS

// Importação de componentes e assets
import StatusBar from "../assets/Status Bar (1).png";
import Avatar from "../assets/Avatar.png"; 
import Logo from "../assets/Logo.png"; 
import MenuVariant from "../assets/menu-variant.png"; // Ícone do menu lateral

// Interface para os produtos
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  img: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegação entre páginas
  const [products, setProducts] = useState<Product[]>([]); // Estado para armazenar os produtos da API

  // Efeito para buscar os produtos ao carregar a página
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Requisição para a API que retorna os produtos
        const response = await fetch("https://run.mocky.io/v3/37bb6a40-2006-4d0a-9d3e-ccd2bd7eb50f");
        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }
        const data = await response.json();
        setProducts(data); // Atualiza o estado com os produtos retornados
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts(); // Chama a função de busca ao montar o componente
  }, []);

  return (
    <div className={styles.container}>
      {/* Barra de Status */}
      <img src={StatusBar} alt="Status Bar" className={styles.statusBar} />

      {/* Cabeçalho com menu, logo e avatar */}
      <div className={styles.header}>
        <img src={MenuVariant} alt="Menu" className={styles.menuIcon} />
        <img src={Logo} alt="Logo" className={styles.logo} />
        <img src={Avatar} alt="Avatar" className={styles.avatar} />
      </div>

      {/* Seção de boas-vindas */}
      <div className={styles.welcomeSection}>
        <img
          src={require("../assets/Frame 31.png")}
          alt="Welcome"
          className={styles.welcomeImage}
        />
      </div>

      {/* Barra de Pesquisa que redireciona para a tela de busca */}
      <div className={styles.searchBar} onClick={() => navigate("/search")}>
        <input type="text" placeholder="Search headphone" className={styles.searchInput} />
      </div>

      {/* Lista de Categorias */}
      <div className={styles.categoryList}>
        <img
          src={require("../assets/Category list.png")}
          alt="Category List"
          className={styles.categoryImage}
        />
      </div>

      {/* Banner de Destaque com o primeiro produto */}
      <div className={styles.featuredBanner}>
        <img
          src={products[0]?.img || ""}
          alt={products[0]?.name || "Product"}
          className={styles.featuredImage}
        />
        <div className={styles.featuredText}>
          <h2>{products[0]?.name || "TMA-2 Modular Headphone"}</h2>
          <p>Shop now →</p>
        </div>
      </div>

      {/* Carrossel de Produtos */}
      <div className={styles.carouselSection}>
        {/* Cabeçalho do carrossel com link para explorar mais produtos */}
        <div className={styles.carouselHeader}>
          <img
            src={require("../assets/Frame 32.png")}
            alt="See All"
            onClick={() => navigate("/explore")}
            className={styles.carouselImage}
          />
        </div>

        {/* Swiper para navegação entre os produtos */}
        <Swiper spaceBetween={16} slidesPerView={2.2}>
          {products.slice(1, 6).map((product) => (
            <SwiperSlide key={product.id}>
              <div
                onClick={() => navigate(`/product/${product.id}`)}
                className={styles.productCard}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className={styles.productImage}
                />
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>USD {product.price}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Home; // Exporta o componente para ser utilizado em outras partes do projeto
