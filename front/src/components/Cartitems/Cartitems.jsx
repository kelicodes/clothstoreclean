import React, { useContext } from 'react'
import './Cartitems.css'
import { ShopContext } from '../../context/Context'
import remove from '../../assets/cart_cross_icon.png'

const Cartitems = () => {
  const { gettotalcartammount, allproduct, cartitems, removefromcart } = useContext(ShopContext);
  return (
    <div className='cartitems'>
      <div className="cartitemformatmain">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantinty</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {allproduct.map((e) => {
        if (cartitems[e.id] > 0) {
          return <div>
            <div className="carditemsformat cartitemformatmain">
              <img src={e.image} alt="" className="carticon" />
              <p>{e.name}</p>
              <p>${e.new_price}</p>
              <button className="cartitemsquantinty">{cartitems[e.id]}</button>
              <p>${e.new_price * cartitems[e.id]}</p>
              <img className='cartitemsremove' src={remove} alt="" onClick={() => { removefromcart(e.id) }} />
            </div>
            <hr />
          </div>
        }
        return null
      })}
      <div className="cartitemsdown">
        <div className="catritemstotal">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitemstotalitem">
              <p>Subtotal</p>
              <p>${gettotalcartammount()}</p>
            </div>
            <hr />
            <div className="cartitemstotalitem">
              <p>Shipping fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitemstotalitem">
              <h3>Total</h3>
              <h3>${gettotalcartammount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT.</button>
        </div>
        <div className="cartitemspromo">
          <p>If you have a promocode enter it here</p>
          <div className="caritemspromobox">
            <input type="text" placeholder='promocode' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cartitems
