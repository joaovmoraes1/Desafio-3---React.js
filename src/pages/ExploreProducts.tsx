import React, { useState, useEffect } from "react";
import FilterScreen from "./FilterScreen"; // Componente para exibição dos filtros
import { FiArrowLeft } from "react-icons/fi"; // Ícone de seta para voltar
import CartIcon from "../pages/CartIcon"; // Ícone do carrinho
import StatusBar from "../assets/Status Bar (1).png"; // Imagem da barra de status
import FilterEmpty from "../assets/Filter Empty.png"; // Ícone do filtro
import Frame41 from "../assets/Frame 41.png"; // Imagem do banner
import styles from "../styles/ExploreProducts.module.css"; // Estilos do componente
import { useNavigate } from "react-router-dom"; // Hook para navegação entre páginas

// Definição da interface para os reviews dos produtos
interface Review {
    userId: string;
    userName: string;
    rating: number;
    comment: string;
}

// Definição da interface para os produtos
interface Product {
    id: string;
    name: string;
    price: number;
    img: string;
    reviews: Review[];
    rating?: number;
    category: string;
}

/**
 * Componente ExploreProducts:
 * - Exibe todos os produtos disponíveis
 * - Permite aplicar filtros por categoria e ordenação
 * - Redireciona para a tela de detalhes do produto ao clicar em um item
 */
const ExploreProducts: React.FC = () => {
    // Estado para armazenar os produtos
    const [products, setProducts] = useState<Product[]>([]);
    // Estado para armazenar os produtos filtrados
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    // Estado para controlar a exibição da tela de filtros
    const [isFilterOpen, setFilterOpen] = useState(false);
    // Estado para armazenar a categoria do filtro
    const [category, setCategory] = useState<string>("");
    // Estado para armazenar o critério de ordenação
    const [sortBy, setSortBy] = useState<string>("");

    // Hook para navegação entre páginas
    const navigate = useNavigate();

    /**
     * Busca os produtos da API ao carregar o componente
     */
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "https://run.mocky.io/v3/37bb6a40-2006-4d0a-9d3e-ccd2bd7eb50f"
                );
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProducts();
    }, []);

    /**
     * Aplica os filtros e ordenação selecionados aos produtos
     */
    const applyFilter = () => {
        let filtered = [...products];

        // Filtra os produtos pela categoria selecionada
        if (category) {
            filtered = filtered.filter((product) => product.category === category);
        }

        // Ordena os produtos conforme a opção selecionada
        if (sortBy === "popularity") {
            filtered.sort((a, b) => b.reviews.length - a.reviews.length);
        } else if (sortBy === "newest") {
            filtered.sort((a, b) => b.id.localeCompare(a.id));
        } else if (sortBy === "oldest") {
            filtered.sort((a, b) => a.id.localeCompare(b.id));
        } else if (sortBy === "highPrice") {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === "lowPrice") {
            filtered.sort((a, b) => a.price - b.price);
        }

        // Atualiza a lista de produtos filtrados e fecha a tela de filtro
        setFilteredProducts(filtered);
        setFilterOpen(false);
    };

    /**
     * Função para voltar à página de pesquisa
     */
    const handleGoBack = () => {
        navigate("/search"); // Redireciona para a página de busca
    };

    return (
        <div className={styles.container}>
            {/* Barra de status */}
            <div className={styles.statusBar}>
                <img src={StatusBar} alt="Status Bar" />
            </div>

            {/* Cabeçalho com botão de voltar e ícone do carrinho */}
            <div className={styles.header}>
                <FiArrowLeft size={24} className={styles.backIcon} onClick={handleGoBack} />
                <CartIcon />
            </div>

            {/* Banner principal da página */}
            <div className={styles.banner}>
                <img src={Frame41} alt="TMA Wireless" />
                <div onClick={() => setFilterOpen(true)} className={styles.filterButton}>
                    <img src={FilterEmpty} alt="Filter Icon" />
                </div>
            </div>

            {/* Lista de produtos exibidos */}
            <div className={styles.productsGrid}>
                {filteredProducts.map((product) => {
                    // Calcula a média das avaliações do produto
                    const averageRating =
                        product.reviews.reduce((sum, review) => sum + review.rating, 0) /
                            product.reviews.length || 0;

                    return (
                        <div key={product.id} className={styles.productCard}>
                            {/* Imagem do produto */}
                            <img
                                src={product.img}
                                alt={product.name}
                                className={styles.productImage}
                            />
                            {/* Nome do produto */}
                            <h4 className={styles.productName}>{product.name}</h4>
                            {/* Preço do produto */}
                            <p className={styles.productPrice}>USD {product.price.toFixed(2)}</p>
                            
                            {/* Seção de avaliações */}
                            <div className={styles.rating}>
                                {/* Estrelas da avaliação */}
                                <span className={styles.ratingStars}>
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <span
                                            key={index}
                                            style={{ color: index < averageRating ? "#FFD700" : "#ddd" }}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </span>
                                {/* Número de reviews */}
                                <span className={styles.reviewCount}>
                                    {product.reviews.length} Reviews
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tela de filtro, aparece quando ativada */}
            <FilterScreen
                isOpen={isFilterOpen}
                onClose={() => setFilterOpen(false)}
                category={category}
                setCategory={setCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
                applyFilter={applyFilter}
            />
        </div>
    );
};

// Exporta o componente para uso em outras partes do projeto
export default ExploreProducts;
