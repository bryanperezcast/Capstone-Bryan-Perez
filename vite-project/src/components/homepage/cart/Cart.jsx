import './Cart.css'
import React, { useState, useEffect } from 'react';
import { useCart } from '../../CartContext'; // Import your CartContext
import NavBar from '../navbar/NavBar';
import CartPrice from './CartPrice'

function Cart() {
  const { cartItemIds, removeFromCart } = useCart();
  const [items, setItems] = useState([]);
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
        const cartItemIdsStrings = cartItemIds.map(String);
        const cartItemsData = cartItemIdsStrings.flatMap((cartItemId) =>
          result.filter((item) => item.id.toString() === cartItemId)
        );
        setItems(cartItemsData);
        localStorage.setItem('cartItemIds', JSON.stringify(cartItemIds))
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

  function itemQuantity (num, itemId) {
    if (num === "add") {
      console.log("+1")
    } else if (num === "subtract") {
      console.log(itemId)
    }
  }

  return (
    <div>
      <NavBar />
      <div className='main'> 
              <div className='container'>
                  <div className='cart-items'>
                      {
                          items.map((item, index) => {
                              return (
                                  <div key={index} className='cart-item'>
                                    <div className='item-details'>
                                      <div className='item-name'>{item.title}</div>
                                      <img src={item.image} alt='picture_of_item' className='item-img'/>
                                      <div>${item.price}</div>
                                      <div className='item-quantity'>Quantity: </div>
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
          <CartPrice items={items}/>
    </div>
  )
}

export default Cart;