import React from "react";
import { useNavigate } from "react-router-dom"; // Hook para navegação
import CartIcon from "../pages/CartIcon"; 
import styles from "../styles/Features.module.css"; 

// Importação de imagens utilizadas na interface
import StatusBarImage from "../assets/Status Bar (1).png";
import Frame44Image from "../assets/Frame 44.png";
import TabBarDescriptionImage from "../assets/Tab Bar Descrption 1.png";
import Frame54Image from "../assets/Frame 54.png";
import ButtonImage from "../assets/Button.png";

// Ícones
import { FiArrowLeft } from "react-icons/fi"; // Ícone de seta para voltar

const Features: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegação entre páginas

  return (
    <div className={styles.container}>
      {/* Barra de Status */}
      <img src={StatusBarImage} alt="Status Bar" className={styles.statusBar} />

      {/* Cabeçalho da página com botão de voltar, título e ícone do carrinho */}
      <div className={styles.header}>
        <FiArrowLeft 
          size={24} 
          onClick={() => navigate(-1)} // Retorna para a tela anterior
          className={styles.backIcon} 
        />
       
        <CartIcon />
      </div>

      {/* Conteúdo Principal */}
      <div className={styles.content}>
        {/* Imagem principal representando o produto */}
        <img src={Frame44Image} alt="Produto" className={styles.image} />

        {/* Barra de descrição do produto */}
        <img src={TabBarDescriptionImage} alt="Descrição do Produto" className={styles.image} />

        {/* Seção com mais informações sobre o produto */}
        <img src={Frame54Image} alt="Detalhes Adicionais" className={styles.image} />

        {/* Botão de adicionar ao carrinho */}
        <button onClick={() => navigate(-1)} className={styles.button}>
          <img src={ButtonImage} alt="Add to Cart" />
      </button>


      </div>
    </div>
  );
};

export default Features;
