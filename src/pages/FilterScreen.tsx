import React from "react";
import Modal from "react-modal"; // Biblioteca para exibição de modais
import styles from "../styles/FilterScreen.module.css"; 

// Tipagem das propriedades que o componente recebe
interface FilterScreenProps {
  isOpen: boolean; 
  onClose: () => void; 
  category: string; 
  setCategory: React.Dispatch<React.SetStateAction<string>>; 
  sortBy: string; 
  setSortBy: React.Dispatch<React.SetStateAction<string>>; // Função para atualizar a ordenação
  applyFilter: () => void; // Função para aplicar os filtros selecionados
}


const FilterScreen: React.FC<FilterScreenProps> = ({
  isOpen,
  onClose,
  category,
  setCategory,
  sortBy,
  setSortBy,
  applyFilter,
}) => {
  return (
    <Modal
      isOpen={isOpen} // Controla a visibilidade do modal
      onRequestClose={onClose} // Fecha o modal ao clicar fora
      className={styles.modalContent} // Aplica os estilos do modal
      overlayClassName={styles.modalOverlay} // Estilos para o fundo do modal
    >
      {/* Botão para fechar o modal */}
      <button onClick={onClose} className={styles.closeButton}>
        ✕
      </button>

      {/* Título do modal */}
      <h3 className={styles.title}>
        Filter
        <button onClick={onClose} className={styles.closeButton}>
          ✕
        </button>
      </h3>

      {/* Seção para filtragem por categoria */}
      <div className={styles.filterSection}>
        <h4 className={styles.filterLabel}>Category</h4>
        <div className={styles.buttonGroup}>
          {/* Botão para selecionar a categoria "Headphone" */}
          <button
            onClick={() => setCategory("headphones")}
            className={`${styles.button} ${
              category === "headphones" ? styles.active : ""
            }`}
          >
            Headphone
          </button>

          {/* Botão para selecionar a categoria "Headset" */}
          <button
            onClick={() => setCategory("headsets")}
            className={`${styles.button} ${
              category === "headsets" ? styles.active : ""
            }`}
          >
            Headset
          </button>
        </div>
      </div>

      {/* Seção para ordenação dos produtos */}
      <div className={styles.filterSection}>
        <h4 className={styles.filterLabel}>Sort By</h4>
        <div className={styles.sortGrid}>
          {/* Mapeia as opções de ordenação e cria botões dinâmicos */}
          {[
            { key: "popularity", label: "Popularity" },
            { key: "newest", label: "Newest" },
            { key: "oldest", label: "Oldest" },
            { key: "highPrice", label: "High Price" },
            { key: "lowPrice", label: "Low Price" },
          ].map((option) => (
            <button
              key={option.key}
              onClick={() => setSortBy(option.key)}
              className={`${styles.button} ${
                sortBy === option.key ? styles.active : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Botão para aplicar os filtros selecionados */}
      <button onClick={applyFilter} className={styles.applyButton}>
        Apply Filter
      </button>
    </Modal>
  );
};

export default FilterScreen;
