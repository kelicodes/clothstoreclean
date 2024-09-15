import React, { useContext, useEffect, useState } from 'react'
import './Popular.css'
import Item from'../Items/Item'
import { ShopContext } from '../../context/Context'

const Popular = () => {
  const [popular, setPopular]= useState([]);
  const {url}=useContext(ShopContext)
  useEffect(()=>{
    fetch(`${url}popularforwomen`)
    .then((response)=>response.json()).then((data)=>setPopular(data))
  },[])
  return (
    <div className='popular'>
      <h1>Popular in women.</h1>
      <hr />
      <div className="popularitem">
        {popular.map((item,i)=>{
            return <Item key={i} id={item.id} name = {item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default Popular
