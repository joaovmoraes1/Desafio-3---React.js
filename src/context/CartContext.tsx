import React, { createContext, useContext, useState, useEffect } from "react";

// Interface para os itens do carrinho
export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Definição das propriedades do contexto do carrinho
interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string | number) => void;
  updateItemQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// Criando o contexto do carrinho
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Provedor do Carrinho, responsável por gerenciar o estado global do carrinho
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado do carrinho, inicializado com dados do localStorage se existirem
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Atualiza o localStorage sempre que o carrinho for modificado
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Adiciona um item ao carrinho ou atualiza sua quantidade se já existir
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prev, { ...item }];
    });
  };

  // Remove um item do carrinho pelo ID
  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Atualiza a quantidade de um item no carrinho, removendo-o se a quantidade for zero
  const updateItemQuantity = (id: string | number, quantity: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove todos os itens do carrinho
  const clearCart = () => setCart([]);

  // Calcula o total de itens no carrinho
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Calcula o preço total do carrinho
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateItemQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para acessar o contexto do carrinho em outros componentes
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
