import './CartPrice.css'

function CartPrice(props) {
    const items = props.items
    const cartItemIds = props.cartItemIds
    let totalPrice = 0;
    //loops through each element in the items array and adds the prices and sets it to a variable
    items.forEach((item) => {
        //matches the cartItemIds to the item id
        const cartItem = cartItemIds.find((cartItem) => cartItem.id === item.id.toString());
    //if the id is found, it will multiply the price & quantity and set it = to totalPrice
        if (cartItem) {
          const itemTotalPrice = item.price * cartItem.quantity;
          totalPrice += itemTotalPrice;
        }
    });
    //changes the price to string and makes sure there is 2 decimal places
    const totalPricestring = totalPrice.toFixed(2).toString()

    return (
      <div>
        <button className='price'>hi</button>
        <h1 className='price'>${totalPricestring}</h1>
      </div>
    )
  }
  
  export default CartPrice