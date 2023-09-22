import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }) {
  const [cartItemIds, setCartItemIds] = useState([]);

  useEffect(() => {
    const storedCartData = localStorage.getItem('cartItemIds');
    if (storedCartData) {
      const parsedCartData = JSON.parse(storedCartData);
      setCartItemIds(parsedCartData);
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItemIds([...cartItemIds, itemId]);
  }

    const removeFromCart = (itemId) => {
    const itemIdString = itemId.toString();
    const updatedCart = cartItemIds.filter((id) => id !== itemIdString);
    setCartItemIds(updatedCart);
    localStorage.setItem('cartItemIds', JSON.stringify(updatedCart));
  };

  // Provide setCartItemIds as part of the context
  const contextValue = {
    cartItemIds,
    addToCart,
    removeFromCart,
    setCartItemIds,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}