import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Hooks para navegação e obtenção de parâmetros da URL
import axios from "axios"; // Biblioteca para requisições HTTP
import { useCart } from "../context/CartContext"; 
import CartIcon from "../pages/CartIcon"; 
import styles from "../styles/ProductDetail.module.css"; 

// Importação de imagens usadas na interface
import Avatar from "../assets/Avatar.png"; 
import StatusBarImage from "../assets/Status Bar (1).png";
import Frame44Image from "../assets/Frame 44.png";
import TabBarDescriptionImage from "../assets/Tab Bar Description.png";
import Frame32Image from "../assets/Frame 32 (1).png";
import ButtonImage from "../assets/Button.png";

// Ícones e biblioteca de carrossel
import { FiArrowLeft } from "react-icons/fi"; // Ícone de seta para voltar
import Slider from "react-slick"; // Biblioteca de carrossel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Interface para representar os reviews do produto
interface Review {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
}

// Interface para representar um produto
interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  details: string;
  reviews: Review[];
}


const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>(); // Obtém o ID do produto via URL
  const navigate = useNavigate(); // Hook para navegação
  const { addToCart } = useCart(); // Função para adicionar ao carrinho

  // Estado para armazenar os detalhes do produto
  const [product, setProduct] = useState<Product | null>(null);
  // Estado para armazenar produtos recomendados
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  // Estado para controlar a exibição da mensagem de sucesso ao adicionar ao carrinho
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  /**
   * Busca os detalhes do produto ao carregar a página
   */
  useEffect(() => {
    axios
      .get<Product[]>("https://run.mocky.io/v3/37bb6a40-2006-4d0a-9d3e-ccd2bd7eb50f")
      .then((response) => {
        // Filtra o produto pelo ID passado na URL
        const selectedProduct = response.data.find((p) => p.id === productId) || null;
        setProduct(selectedProduct);
        // Define a lista de produtos recomendados (todos, exceto o atual)
        setRecommendedProducts(response.data.filter((p) => p.id !== productId));
      })
      .catch((error) => console.error("Erro ao buscar detalhes do produto:", error));
  }, [productId]);

  /**
   * Adiciona o produto ao carrinho
   */
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.img,
        quantity: 1,
      });

      // Exibe mensagem de sucesso por 2 segundos
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    }
  };

  /**
   * Redireciona o usuário para a tela de recursos do produto
   */
  const handleNavigateToFeatures = () => {
    navigate(`/features/${productId}`);
  };

  // Exibe um aviso de carregamento enquanto os dados não chegam
  if (!product) return <div>Carregando...</div>;

  return (
    <div className={styles.container}>
      {/* Barra de status */}
      <img src={StatusBarImage} alt="Status Bar" className={styles.statusBar} />

      {/* Cabeçalho com botão de voltar, título e ícone do carrinho */}
      <div className={styles.header}>
        <FiArrowLeft size={24} onClick={() => navigate("/Home")} className={styles.backIcon} />
    
        <CartIcon />
      </div>

      {/* Conteúdo principal */}
      <div className={styles.content}>
        {/* Imagem principal do produto */}
        <img src={Frame44Image} alt="Frame 44" className={styles.productImage} />

        {/* Barra de descrição clicável que leva para mais detalhes */}
        <img 
          src={TabBarDescriptionImage} 
          alt="Tab Bar Description" 
          className={styles.tabBar} 
          onClick={handleNavigateToFeatures} 
        />

        {/* Imagem do produto */}
        <img src={product.img} alt={product.name} className={styles.productImage} />

        {/* Seção de avaliações */}
        <h3 className={styles.reviewSection}>Reviews</h3>
        {product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <div key={review.userId} className={styles.reviewContainer}>
              <img src={Avatar} alt="User Avatar" className={styles.userAvatar} />
              <div>
                <strong className={styles.userName}>{review.userName}</strong>
                <p>{Array(review.rating).fill("⭐").join(" ")}</p>
                <p className={styles.userComment}>{review.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noReviews}>Nenhuma avaliação disponível.</p>
        )}

        {/* Seção de produtos recomendados */}
        <div className={styles.recommendedSection}>
          <img src={Frame32Image} alt="Produtos Recomendados" className={styles.recommendedImage} />
          <Slider dots={false} arrows={false} infinite={true} speed={500} slidesToShow={2} slidesToScroll={1}>
            {recommendedProducts.map((recProduct) => (
              <div 
                key={recProduct.id} 
                className={styles.recommendedProduct} 
                onClick={() => navigate(`/product/${recProduct.id}`)}
              >
                <img src={recProduct.img} alt={recProduct.name} className={styles.recommendedProductImage} />
                <p className={styles.recommendedProductName}>{recProduct.name}</p>
                <p className={styles.recommendedProductPrice}>USD {recProduct.price.toFixed(2)}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Mensagem de sucesso ao adicionar ao carrinho */}
      {showSuccessMessage && <div className={styles.successMessage}>Adicionado com sucesso!</div>}

      {/* Botão de adicionar ao carrinho */}
      <img src={ButtonImage} 
      alt="Adicionar ao Carrinho" 
      onClick={handleAddToCart} 
      className={styles.addToCartButton} />
    </div>
  );
};

export default ProductDetail;


