import './Category.css'
import NavBar from '../../navbar/NavBar'

function Category(props) {
  const hi = props.hi
  console.log(hi)
    return (
      <div>
        <NavBar />
        <div className='category-page'>
          <h1>hi</h1>
        </div>
      </div>
    )
  }
  
  export default Category