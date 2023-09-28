import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../../CartContext';
import { useState } from 'react';

function AddToCart() {
  const { id } = useParams();
  const { addToCart, cartItemIds } = useCart();
  const [ showMessage, setShowMessage ] = useState(false)

  const handleAddToCart = () => {
    addToCart(id);
    setShowMessage(true)
  };

  const itemQuantity = cartItemIds.filter((itemId) => itemId === id).length;

  return (
    <div>
      <button onClick={handleAddToCart}>Add Item to Cart</button>
      {showMessage && <h1>Item Added To Cart</h1>}
    </div>
  );
}

export default AddToCart;