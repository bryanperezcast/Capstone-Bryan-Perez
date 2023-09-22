import './CartPrice.css'

function CartPrice(props) {
    const items = props.items
    let totalPrice = 0;
    //loops through each element in the items array and adds the prices and sets it to a variable
    items.forEach(element => {
        let itemPrice = element.price
        totalPrice += itemPrice
    });
    //changes the price to string and makes sure there is 2 decimal places
    const totalPricestring = totalPrice.toFixed(2).toString()

    return (
      <div>
        <h1>${totalPricestring}</h1>
      </div>
    )
  }
  
  export default CartPrice