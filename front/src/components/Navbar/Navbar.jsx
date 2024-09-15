import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from "../asset/logo.png"
import cart from "../asset/cart_icon.png"
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/Context'
import dropdown from'../../assets/dropdown_icon.png'

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const {gettotalcartitems} = useContext(ShopContext);
    const menuRef = useRef();
    const dropdowntoggle = (e) =>{
      menuRef.current.classList.toggle('navmenuvisible');//change nav component classlist
      e.target.classList.toggle('open');//rotation effect
    }
  return (
    <div className= "navbar">
      <div className="navlogo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <img className='navdropdown' onClick={dropdowntoggle} src={dropdown} alt="" />
      <ul ref={menuRef} className="navmenu">
        <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu === "shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("men")}}><Link style={{textDecoration:'none'}} to='/men'>Men</Link>{menu === "men"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("women")}}><Link style={{textDecoration:'none'}} to='/women'>Women</Link>{menu === "women"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:'none'}} to='/kids'>kids</Link>{menu === "kids"?<hr/>:<></>}</li>
      </ul>
      <div className="logincart">
        {localStorage.getItem('auth-token')?
        <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Log out</button>:
        <Link to='/login'><button>Log in</button></Link>}
        <Link to='/cart'><img src={cart} alt="" /></Link>
        <div className="logincartcount">{gettotalcartitems()}</div>
      </div>
    </div>
  )
}

export default Navbar
