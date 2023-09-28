import './Cart.css'
import React, { useState, useEffect } from 'react';
import { useCart } from '../../CartContext'; // Import your CartContext
import NavBar from '../navbar/NavBar';
import CartPrice from './CartPrice'

function Cart() {
  const { cartItemIds, setCartItemIds, removeFromCart } = useCart();
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  //console.log(cartItemIds)
//use to store cartdata into local storage
  useEffect(() => {
    const storedCartData = localStorage.getItem('cartItemIds');
    if (storedCartData) {
      const parsedCartData = JSON.parse(storedCartData);
      setItems(parsedCartData);
    }
  }, []);
//fetches all items and converts the ids to strings and compares the ids with the ids from cartItemIds and 
//updates the items state to include the matching ids
useEffect(() => {
  async function renderAllItems() {
    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const result = await response.json();
      const cartItemIdsObjects = cartItemIds.flatMap((cartItem) =>
        result.filter((item) => item.id.toString() === cartItem.id)
      );
      setItems(cartItemIdsObjects);
      localStorage.setItem('cartItemIds', JSON.stringify(cartItemIds));
    } catch (err) {
      console.error(err);
    }
  }
  renderAllItems();
}, [cartItemIds]);
//calls the handleremovefromCart function from cartContext to handle the delete of the items
  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };
//counts the amount of the same items in the cart
  const countItemOccurrences = (itemId) => {
    return cartItemIds.filter((id) => id === itemId).length;
  };

  //const itemQuantity = countItemOccurrences(item.id);
  const itemQuantity = (action, itemId) => {
    // Find the index of the item in the cart
    const itemIndex = items.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      const updatedCart = [...cartItemIds];

      if (action === 'add') {
        // Increment the quantity
        updatedCart[itemIndex].quantity += 1;
        setQuantity(quantity + 1); // Update the state
      } else if (action === 'subtract') {
        // Decrement the quantity (only if greater than 0)
        if (updatedCart[itemIndex].quantity > 1) {
          updatedCart[itemIndex].quantity -= 1;
          setQuantity(quantity - 1); // Update the state
        } else {
          // Remove the item from the cart if quantity is 1 or less
          updatedCart.splice(itemIndex, 1);
          setQuantity(0); // Reset quantity if item is removed
        }
      }

      // Update the items state
      setCartItemIds(updatedCart)
    }
  };
  return (
    <div>
      <NavBar />
      <div className='main'> 
              <div className='container'>
                  <div className='cart-items'>
                      {
                          items.map((item, index) => {
                            const cartItem = cartItemIds.find((cartItem) => cartItem.id === item.id.toString());
                              return (
                                  <div key={index} className='cart-item'>
                                    <div className='item-details'>
                                      <div className='item-name'>{item.title}</div>
                                      <img src={item.image} alt='picture_of_item' className='item-img'/>
                                      <div>${item.price}</div>
                                      <div className='item-quantity'>Quantity: {cartItem ? cartItem.quantity : 0}</div>
                                      <button onClick={() => itemQuantity("add", item.id)}>+</button>
                                      <button onClick={() => itemQuantity("subtract", item.id)}>-</button>
                                      <button onClick={() => handleRemoveFromCart(item.id)} className='btnDel'>Delete</button>
                                    </div>
                                  </div>
                              )
                          })
                      }
                  </div>
              </div>
          </div>
          <CartPrice items={items} cartItemIds={cartItemIds}/>
    </div>
  )
}

export default Cart;