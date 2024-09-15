import React from 'react'
import './Navbar.css'
import logo from "../../Admin_Assets/nav-logo.svg"
import navprofile from '../../Admin_Assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={logo} alt="" className="navlogo"/>
      <img src={navprofile} alt="" className='navprofile' />
    </div>
  )
}

export default Navbar