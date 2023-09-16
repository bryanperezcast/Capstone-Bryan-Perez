import React, { useState, useEffect } from 'react';
import { useCart } from '../../CartContext'; // Import your CartContext
import NavBar from '../navbar/NavBar';

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
        const cartItemsData = result.filter((item) =>
          cartItemIdsStrings.includes(item.id.toString())
        );
        setItems(cartItemsData);
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

  return (
    <div>
      <NavBar />
      <div className='main'> 
              <div className='container'>
                  <div className='row'>
                      {
                          items.map((item, index) => {
                              return (
                                  <div key={index} className='itemCard'>
                                    
                                      <div>{item.title}</div>
                                      <img src={item.image} alt='picture_of_item' className='item-img'/>
                                      <button onClick={() => handleRemoveFromCart(item.id)}>Delete</button>
                                      
                                  </div>
                              )
                          })
                      }
                  </div>
              </div>
          </div>
    </div>
  )
}

export default Cart;