import React, { useContext } from 'react'
import '../pages/CSS/Shopcategory.css'
import { ShopContext } from '../context/Context'
import dropdown from '../components/asset/dropdown_icon.png'
import Item from '../components/Items/Item'

const Shopcategory = (props) => {
  const {allproduct} = useContext(ShopContext)
  return (
    <div className='shopcategory'>
      <img className='shopcategorybanner' src={props.banner} alt="" />
      <div className="shopcategoryindexsort">
        <p>
          <span>
            Showing 1 to 12
          </span>
          out of 36 products
        </p>
        <div className="shopcategorysort">
          sort by <img src={dropdown} alt="" />
        </div>
      </div>
      <div className="shopcategoryproducts">
        {allproduct.map((item,i)=>{
          if(props.category === item.category){
            return <Item key={i} id={item.id} name = {item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          }
          else{
            return null;
          }
        })}
      </div>
      <div className="loadmore">
        Explore more
      </div>
    </div> 
  )
}

export default Shopcategory
