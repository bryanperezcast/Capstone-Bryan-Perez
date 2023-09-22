import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../../CartContext';

function AddToCart() {
  const { id } = useParams();
  const { addToCart, cartItemIds } = useCart();

  const handleAddToCart = () => {
    addToCart(id);
  };

  const itemQuantity = cartItemIds.filter((itemId) => itemId === id).length;

  return (
    <div>
      <button onClick={handleAddToCart}>Add Item to Cart</button>
      <p>Quantity: {itemQuantity}</p>
    </div>
  );
}

export default AddToCart;