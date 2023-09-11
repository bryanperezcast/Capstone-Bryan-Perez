import './NavBar.css'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Category from '../filter/category/Category'
import { AiOutlineHome } from 'react-icons/ai'
import { AiOutlineSearch } from 'react-icons/ai'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsFilterLeft } from 'react-icons/bs'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

function NavBar() {
    const navigate = useNavigate();
    const [filterVar, setFilterVar] = useState('')
    const { id } = useParams()

    function routeChange (filter) {
        const path = `/Home/${filter}`
        navigate(path);
    }
    function routeChangeId(number) {
        const path = `/Home/Price/${number}`
        navigate(path);
    }
  
    return (
        <div className="nav-bar">
            <div className='navbar-nav'>
                <div className='Links'>
                    <Link to={`/Home`} className='Link-text'><AiOutlineHome /></Link>
                </div>
                <div className='Links Filter'>
                    <BsFilterLeft className='Link-text'/>
                    {/*Price buttons */}
                    <button className='filter-item' onClick={(event) => { routeChangeId("1") }}>Price:Low to High</button>
                    <button className='filter-item' onClick={() => routeChangeId("2")}>Price:High to Low</button>
                    {/*Rating buttons */}
                    <button className='filter-item' onClick={() => routeChangeId("3")}>Rating:Least to Greatest</button>
                    <button className='filter-item' onClick={() => routeChangeId("4")}>Rating:Greatest to Least</button>
                    {/*Category buttons */}
                    <button className='filter-item' onClick={() => routeChangeId("5")}>Men's Clothing</button>
                    <button className='filter-item' onClick={() => routeChangeId("6")}>women's Clothing</button>
                    <button className='filter-item' onClick={() => routeChangeId("7")}>Jewelery</button>
                    <button className='filter-item' onClick={() => routeChangeId("8")}>Electronics</button>
                </div>
                <div className='Links'>
                    <Link to={`/Cart`} className='Link-text'><AiOutlineShoppingCart /></Link>
                </div>
            </div>
        </div>
    )
  }
  
  export default NavBar  