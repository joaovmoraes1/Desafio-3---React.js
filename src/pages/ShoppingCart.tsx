import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook para navegação entre páginas
import { FiArrowLeft, FiTrash } from "react-icons/fi"; // Ícones de voltar e lixeira
import { useCart } from "../context/CartContext"; // Hook para manipulação do carrinho
import StatusBarImage from "../assets/Status Bar (1).png"; 
import styles from "../styles/ShoppingCart.module.css"; // Importação dos estilos CSS

/**
 * Componente ShoppingCart:
 * - Exibe os itens adicionados ao carrinho
 * - Permite alterar a quantidade de cada item
 * - Possui funcionalidade para limpar o carrinho
 * - Inclui botão para seguir para o checkout
 */
const ShoppingCart: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegação
  const { cart, clearCart, updateItemQuantity, totalItems, totalPrice } = useCart(); // Funções e estados do carrinho
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Estado para controlar exibição do modal de confirmação

  /**
   * Função para abrir o modal de confirmação ao tentar limpar o carrinho
   */
  const handleClearCart = () => {
    setShowConfirmModal(true);
  };

  /**
   * Função para confirmar a limpeza do carrinho
   */
  const confirmClearCart = () => {
    clearCart();
    setShowConfirmModal(false);
  };

  return (
    <div className={styles.container}>
      {/* Barra de Status */}
      <img src={StatusBarImage} alt="Status Bar" className={styles.statusBar} />

      {/* Cabeçalho com botão de voltar, título e ícone de limpar carrinho */}
      <div className={styles.header}>
        <FiArrowLeft size={24} onClick={() => navigate(-1)} className={styles.backIcon} />
        <h1 className={styles.headerTitle}>Shopping Cart</h1>
        <FiTrash size={24} onClick={handleClearCart} className={styles.trashIcon} />
      </div>

      {/* Conteúdo do carrinho */}
      <div className={styles.content}>
        {cart.length === 0 ? (
          <p className={styles.emptyCart}>Seu carrinho está vazio.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              {/* Imagem do produto */}
              <img src={item.image} alt={item.name} className={styles.productImage} />

              {/* Informações do produto */}
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{item.name}</h3>
                <p className={styles.productPrice}>USD {item.price.toFixed(2)}</p>
              </div>

              {/* Controles de quantidade */}
              <div className={styles.quantityControls}>
                {/* Botão para diminuir a quantidade */}
                <button 
                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)} 
                  className={styles.button}
                >
                  -
                </button>

                {/* Quantidade do item no carrinho */}
                <span>{item.quantity}</span>

                {/* Botão para aumentar a quantidade */}
                <button 
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)} 
                  className={styles.button}
                >
                  +
                </button>

                {/* Ícone para remover o item do carrinho */}
                <FiTrash 
                  size={20} 
                  onClick={() => updateItemQuantity(item.id, 0)} 
                  className={styles.trashIcon} 
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Seção de total e botão de checkout */}
      <div className={styles.totalSection}>
        <div className={styles.totalInfo}>
          <span className={styles.totalText}>Total {totalItems} Items</span>
          <span className={styles.totalPrice}>USD {totalPrice.toFixed(2)}</span>
        </div>

        {/* Botão para finalizar compra */}
        <button onClick={() => navigate("/checkout")} className={styles.checkoutButton}>
          Proceed to Checkout
        </button>
      </div>

      {/* Modal de Confirmação para limpar carrinho */}
      {showConfirmModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p className={styles.modalText}>Tem certeza que deseja limpar o carrinho?</p>

            {/* Botão de confirmação */}
            <button 
              onClick={confirmClearCart} 
              className={`${styles.modalButton} ${styles.confirmButton}`}
            >
              Sim, limpar
            </button>

            {/* Botão para cancelar a ação */}
            <button 
              onClick={() => setShowConfirmModal(false)} 
              className={`${styles.modalButton} ${styles.cancelButton}`}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Exporta o componente para ser utilizado em outras partes do projeto
export default ShoppingCart;
