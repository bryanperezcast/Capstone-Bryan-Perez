import './ItemDetails.css'
import NavBar from '../navbar/NavBar'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function ItemDetails() {
  const [item, setItem] = useState([])
  const { id } = useParams();

  useEffect(() => {
    async function renderItemById() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const result = await response.json();
        console.log(result)
        setItem(result);
      } catch (err) {
        console.error(err)
      }
    }
    renderItemById();
  }, []);
  
    return (
      <div>
        <NavBar />
        <div className='item-details-card'>
          <h1>{item.title}</h1>
          <img src={item.image} alt={item.title} className='img'/>
          <h3>{item.price}</h3>
          <h5>{item.description}</h5>
          <h3>{item.category}</h3>
        </div>
      </div>
    )
  }
  
  export default ItemDetails