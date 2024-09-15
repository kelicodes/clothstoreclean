import React from 'react'
import './Offers.css'
import exclusive from '../asset/exclusive_image.png'

const Offers = () => {
  return (
    <div className='offers'>
      <div className="offersleft">
        <h1>Exclusive</h1>
        <h1>Offers for you</h1>
        <p>Only on best sellers product</p>
        <button>Check now</button>
      </div>
      <div className="offersright">
        <img src={exclusive} alt="" />
      </div>
    </div>
  )
}

export default Offers
