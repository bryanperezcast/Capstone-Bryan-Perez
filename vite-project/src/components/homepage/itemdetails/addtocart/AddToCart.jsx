import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../../CartContext';

function AddToCart() {
  const { id } = useParams();
  const { addToCart, cartItemIds, setCartItemIds } = useCart();

  const handleAddToCart = () => {
    addToCart(id);

    const updatedCart = [...cartItemIds, id];
    localStorage.setItem('cartItemIds', JSON.stringify(updatedCart));
  };

  return (
    <div>
      <button onClick={handleAddToCart}>Add Item to Cart</button>
    </div>
  );
}

export default AddToCart;