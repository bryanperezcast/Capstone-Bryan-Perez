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
    const itemIndex = cartItemIds.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    // If it's in the cart, increment the quantity
    const updatedCart = [...cartItemIds];
    updatedCart[itemIndex].quantity++;
    setCartItemIds(updatedCart);
  } else {
    // If it's not in the cart, add it with a quantity of 1
    setCartItemIds([...cartItemIds, { id: itemId, quantity: 1 }]);
  }
  }

  const removeFromCart = (itemId) => {
    // Create a copy of cartItemIds
    const updatedCart = [...cartItemIds];
    const itemIdString = itemId.toString();
  
    // Find the index of the item in the cart
    const itemIndex = updatedCart.findIndex((item) => item.id === itemIdString);
  
    if (itemIndex !== -1) {
      // Remove the item from the cart
      updatedCart.splice(itemIndex, 1);
  
      // Update cartItemIds state and localStorage
      setCartItemIds(updatedCart);
      localStorage.setItem('cartItemIds', JSON.stringify(updatedCart));
      console.log(cartItemIds)
    }
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