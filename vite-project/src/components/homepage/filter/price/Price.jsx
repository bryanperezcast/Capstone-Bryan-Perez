import './Price.css'
import NavBar from '../../navbar/NavBar'
import Search from '../../searchbar/Search';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { useState } from 'react';

function Price() {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
//function that pulls all items from api and sorts through the id's and filters for the coresponding id
  useEffect(() => {
    async function renderAllItems() {
        try {
            const response = await fetch(`https://fakestoreapi.com/products`)
            const result = await response.json()
            let updatedItems = [...result];
            if (id === "1") {
              updatedItems.sort((a, b) => a.price - b.price);
            } else if (id === "2") {
              updatedItems.sort((a, b) => b.price - a.price);
            } else if (id === "3") {
              updatedItems.sort((a, b) => a.rating.rate - b.rating.rate);
            } else if (id === "4") {
              updatedItems.sort((a, b) => b.rating.rate - a.rating.rate);
            } else if (id === "5") {
              updatedItems = result.filter(item => item.category === "men's clothing");
            } else if (id === "6") {
              updatedItems = result.filter(item => item.category === "women's clothing");
            } else if (id === "7") {
              updatedItems = result.filter(item => item.category === "jewelery");
            } else if (id === "8") {
              updatedItems = result.filter(item => item.category === "electronics");
            }
            setItems(updatedItems);
        } catch (err) {
            console.error(err)
        }
    }
    renderAllItems();
  }, [id]);

//changes the route when the details button is clicked
  function routeChange (item) {
    const path = `/Itemdetails/${item.id}`
    navigate(path);
}
  
  return (
    <div>
      <NavBar />
      <div className='search-bar'><Search items={items} setItems={setItems} /></div>
      <div className='main'> 
          <div className='container'>
              <div className='row'>
                  {
                      items.map((item) => {
                          return (
                              <div key={item.id} className='itemCard'>
                                  <ul>{item.title}</ul>
                                  <img src={item.image} alt='picture_of_item' className='item-img'/>
                                  <button 
                                  onClick={() => routeChange(item)}className='details-Btn'>Details</button>
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
  
  export default Price