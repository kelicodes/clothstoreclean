import React, { useContext, useEffect, useState } from 'react'
import './Newcollections.css'
import Item from '../Items/Item'
import { ShopContext } from '../../context/Context'

const Newcollections = () => {
  const [New_collections, setNewcollection]= useState([]);
  const {url} = useContext(ShopContext)
  useEffect(()=>{
    fetch(`${url}newcollections`)
    .then((response)=>response.json()).then((data)=>setNewcollection(data))
  },[])
  return (
    <div className='newcollections'>
      <h1>new collections</h1>
      <hr />
      <div className="collections">
        {New_collections.map((item,i)=>{
            return <Item key={i} id={item.id} name = {item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default Newcollections
