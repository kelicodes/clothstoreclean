import React from 'react'
import './Items.css'
import { Link } from 'react-router-dom'
const Item = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}>
        <img src={props.image} alt="" onClick={window.scrollTo(0, 0)} />
      </Link>
      <p>{props.name}</p>
      <div className="itemprices">
        <div className="itempricenew">
          ${props.new_price}
        </div>
        <div className="itempriceold">
          ${props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Item
