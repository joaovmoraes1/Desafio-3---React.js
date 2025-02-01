import { useCart } from "../context/CartContext"; // Importa o hook useCart para acessar o contexto do carrinho
import { AiOutlineShoppingCart } from "react-icons/ai"; // Importa o ícone do carrinho de compras
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para navegação entre páginas
import styles from "../styles/CartIcon.module.css"; // Importa os estilos específicos do componente

const CartIcon = () => {
  // Obtém o número total de itens no carrinho do contexto global
  const { totalItems } = useCart();
  
  // Hook para navegação entre páginas
  const navigate = useNavigate();

  return (
    <div 
      className={styles["cart-icon-container"]} 
      onClick={() => navigate("/shopping-cart")} // Redireciona para a página do carrinho ao ser clicado
    >
      {/* Ícone do carrinho de compras */}
      <AiOutlineShoppingCart size={24} /> 
      
      {/* Se houver itens no carrinho, exibe um indicador numérico */}
      {totalItems > 0 && <span className={styles["cart-badge"]}>{totalItems}</span>}
    </div>
  );
};

// Exporta o componente para ser utilizado em outras partes do projeto
export default CartIcon;
