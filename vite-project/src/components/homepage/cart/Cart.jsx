import './Cart.css'
import NavBar from '../navbar/NavBar'
import Checkout from '../../checkoutpage/Checkout'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'

function Cart(props) {
  const userId = props.userId;
  const [cartItems, setCartItems] = useState([])
  const [items, setItems] = useState([])
//fetches the users cart
  useEffect(() => {
    async function renderUserCart() {
        try {
            const response = await fetch(`https://fakestoreapi.com/carts/user/${userId}`)
            const result = await response.json()
            const items = result[0]
            setCartItems(items.products);
        } catch (err) {
            console.error(err)
        }
    }
    renderUserCart();
}, [userId])

//fetches all the items then sorts through them and updates the array so that the items that are in 
//the cart will be desplayed on the screen
  useEffect(() => {
    async function renderAllItems() {
        try {
            const response = await fetch(`https://fakestoreapi.com/products`)
            const result = await response.json()

            const cartItemIds = cartItems.map(item => item.productId)

            const filteredItems = result.filter(item => cartItemIds.includes(item.id))
            setItems(filteredItems)
        } catch (err) {
            console.error(err)
        }
    }
    renderAllItems();
  }, [cartItems])
  function CheckoutBtn () {
    const path = `/Checkout`
    navigate(path);
  }
  
    return (
      <div>
        <NavBar />
        <button onClick={CheckoutBtn}>Checkout</button>
        <div className='main'> 
                <div className='container'>
                    <div className='row'>
                        {
                            items.map((item) => {
                                return (
                                    <div key={item.id} className='itemCard'>
                                        <ul>{item.title}</ul>
                                        <img src={item.image} alt='picture_of_item' className='item-img'/>
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
  
  export default Cart