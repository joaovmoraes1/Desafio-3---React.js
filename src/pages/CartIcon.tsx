import { useCart } from "../context/CartContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  const { totalItems } = useCart(); // Obtém o número total de itens no carrinho
  const navigate = useNavigate(); // Hook para navegação entre páginas

  return (
    <div 
      style={{ position: "relative", cursor: "pointer" }} 
      onClick={() => navigate("/shopping-cart")} // Redireciona para o carrinho ao clicar
    >
      {/* Ícone do carrinho */}
      <AiOutlineShoppingCart size={24} />
      
      {/* Exibe a contagem de itens no carrinho, se houver algum */}
      {totalItems > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            background: "red",
            color: "white",
            fontSize: "12px",
            borderRadius: "50%",
            padding: "4px",
          }}
        >
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
