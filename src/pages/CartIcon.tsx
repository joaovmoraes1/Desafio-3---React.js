import { useCart } from "../context/CartContext"; // Importa o hook useCart para acessar o contexto do carrinho
import { AiOutlineShoppingCart } from "react-icons/ai"; // Importa o ícone do carrinho de compras
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para navegação entre páginas
import styles from "../styles/CartIcon.module.css"; // Importa os estilos específicos do componente

/**
 * Componente CartIcon:
 * - Exibe um ícone de carrinho de compras
 * - Mostra um indicador com o número de itens no carrinho (se houver)
 * - Ao ser clicado, redireciona o usuário para a página do carrinho de compras
 */
const CartIcon = () => {
  // Obtém o número total de itens no carrinho do contexto global
  const { totalItems } = useCart();
  
  // Hook para navegação entre páginas
  const navigate = useNavigate();

  return (
    /**
     * Contêiner do ícone do carrinho:
     * - Aplica estilos específicos ao ícone
     * - Adiciona funcionalidade de clique para navegar até a página do carrinho
     */
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
