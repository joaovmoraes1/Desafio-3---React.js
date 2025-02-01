import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Hook para navegação entre páginas
import styles from "../styles/Search.module.css"; // Importação dos estilos CSS

// Importação de imagens e ícones
import StatusBarImage from "../assets/Status Bar (1).png";
import { FiArrowLeft, FiMoreVertical } from "react-icons/fi"; // Ícones de navegação
import { FaStar } from "react-icons/fa"; // Ícone de estrela para avaliação
import CartIcon from "../pages/CartIcon"; // Ícone do carrinho de compras

// Interface para representar um produto
interface Product {
  id: string;
  name: string;
  img: string;
  price: number;
  popularity: number;
  reviews: Array<{ rating: number }>;
}


const Search: React.FC = () => {
  // Estado para armazenar o termo de busca
  const [searchTerm, setSearchTerm] = useState(""); 
  // Estado para armazenar os produtos carregados da API
  const [products, setProducts] = useState<Product[]>([]); 
  // Estado para armazenar os produtos filtrados conforme a busca
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); 

  const navigate = useNavigate(); // Hook para navegação

  /**
   * Busca os produtos da API ao carregar a página
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://run.mocky.io/v3/37bb6a40-2006-4d0a-9d3e-ccd2bd7eb50f");
        if (!response.ok) throw new Error("Erro ao buscar produtos");

        const data = await response.json();
        setProducts(data); // Atualiza o estado com os produtos carregados
        setFilteredProducts(data); // Define os produtos filtrados inicialmente como todos os produtos
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts(); // Executa a busca ao montar o componente
  }, []);

  /**
   * Filtra os produtos conforme o usuário digita no campo de busca
   */
  useEffect(() => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  /**
   * Obtém os três produtos mais populares da lista
   */
  const popularProducts = products
    .sort((a, b) => b.popularity - a.popularity) // Ordena por popularidade
    .slice(0, 3); // Seleciona os três primeiros

  /**
   * Renderiza um cartão de produto com as informações básicas
   */
  const renderProductCard = (product: Product) => (
    <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} className={styles.productCard}>
      {/* Imagem do produto */}
      <img src={product.img} alt={product.name} className={styles.productImage} />
      
      <div className={styles.productInfo}>
        {/* Nome e preço do produto */}
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productPrice}>USD {product.price}</p>
        
        {/* Exibição da média de avaliações do produto */}
        <div className={styles.productRating}>
          <FaStar color="#FFD700" /> {/* Ícone de estrela dourada */}
          <span>
            {(
              product.reviews.reduce((a, b) => a + b.rating, 0) / product.reviews.length
            ).toFixed(1)} Stars
          </span>
          <span className={styles.productReviews}>{product.reviews.length} Reviews</span>
        </div>
      </div>
      {/* Ícone de menu vertical para futuras ações */}
      <FiMoreVertical size={16} /> 
    </div>
  );

  return (
    <div className={styles.container}>
      {/* Barra de Status */}
      <img src={StatusBarImage} alt="Status Bar" className={styles.statusBar} />

      {/* Cabeçalho com botão de voltar, título e ícone do carrinho */}
      <div className={styles.header}>
        <FiArrowLeft size={24} onClick={() => navigate("/Home")} className={styles.backIcon} />
        <h1 className={styles.title}>Search</h1>
        <CartIcon />
      </div>


      {/* Campo de Busca */}
      <input
        type="text"
        placeholder="Search headphone"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />

      {/* Resultados da Pesquisa */}
      {searchTerm && (
        <div>
          <h2 className={styles.sectionTitle}>Search Results</h2>
          {filteredProducts.map(renderProductCard)}
        </div>
      )}

      {/* Produtos Populares */}
      <h2 className={styles.sectionTitle}>Popular Products</h2>
      <div>{popularProducts.map(renderProductCard)}</div>
    </div>
  );
};

export default Search;
