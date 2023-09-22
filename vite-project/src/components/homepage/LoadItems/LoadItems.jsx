import './LoadItems.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Search from '../searchbar/Search'

function LoadItems() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function renderAllItems() {
            try {
                const response = await fetch(`https://fakestoreapi.com/products`)
                const result = await response.json()
                setItems(result);
            } catch (err) {
                console.error(err)
            }
        }
        renderAllItems();
    }, [])

    function routeChange (item) {
        const path = `/Itemdetails/${item.id}`
        navigate(path);
    }
  
    return (
        <div>
            <div className='search-bar'><Search items={items} setItems={setItems}/></div>
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
                                        onClick={() => routeChange(item)} className='details-Btn'>Details</button>
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
  
  export default LoadItems