import './Search.css'
import { useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

function Search(props) {
  const [input, setInput] = useState("")
  const items = props.items;

  const handleChange = (value) => {
    setInput(value)
    fetchData(value)
  }

  const fetchData = (value) => {
    const results = value.trim() === "" ? items : items.filter((item) => {
      return item && item.title && item.title.toLowerCase().includes(value)
    });
    props.setItems(results);
  }

  return (
    <div className='search bar input-wrapper'>
      <AiOutlineSearch className='search-icon'/>
      <input placeholder='Type to Search' value={input} onChange={(e) => handleChange(e.target.value)}/>
    </div>
  )
}

export default Search