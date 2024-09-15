import React from 'react'
import './Newsletter.css'

const Newsletter = () => {
  return (
    <div className='newsletter'>
      <h1>Get exclusive offers in your email</h1>
      <p>Subscibe to our newsletter and stay updated</p>
      <div>
        <input type="text" placeholder='your email' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default Newsletter
