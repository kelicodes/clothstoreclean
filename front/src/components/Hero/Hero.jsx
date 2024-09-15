import React from 'react'
import './Hero.css'
import handicon from '../asset/hand_icon.png'
import arrowicon from '../asset/arrow.png'
import heroimage from '../asset/hero_image.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="heroleft">
        <h2>New Arrivals Only</h2>
        <div>
          <div className="herohandicon">
            <p>New</p>
            <img src={handicon} alt="" />
          </div>
          <p>Collection</p>
          <p>For every one</p>
        </div>
        <div className="herolatestbtn">
          <div>Latest collection</div>
          <img src={arrowicon} alt="" />
        </div>
      </div>
      <div className="heroright">
        <img src={heroimage} alt="" />
      </div>
    </div>
  )
}

export default Hero
