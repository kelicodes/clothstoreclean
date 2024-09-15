import React, { useContext } from 'react'
import './Productdisplay.css'
import star from '../asset/star_icon.png'
import dullstar from '../asset/star_dull_icon.png'
import {ShopContext} from '../../context/Context'

const Productdisplay = (props) => {
    const {product} = props;
    const {addtocart} = useContext(ShopContext);
  return (
    <div className='productdisplay'>
      <div className="displayleft">
        <div className="displayimglist">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
        </div>
        <div className="displayimg">
            <img className='productdisplymainimg' src={product.image} alt="" />
        </div>
      </div>
      <div className="displayright">
        <h1>{product.name}</h1>
        <div className="productdisplayrightstars">
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={dullstar} alt="" />
            <p>(122)</p>
        </div>
        <div className="displayrightprices">
            <div className="oldprice">${product.old_price}</div>
            <div className="newprice">${product.new_price}</div>
        </div>
        <div className="displaydesc">
            A light weight ussualyy neated pullover tshirt. Close fitting with around neck and pullup sleves.
        </div>
        <div className="displaysize">
            <h1>Select size</h1>
            <div className="displaysizes">
                <div>Small</div>
                <div>Medium</div>
                <div>Large</div>
                <div>XL</div>
                <div>Double XL</div>
            </div>
            <button onClick={()=>{addtocart(product.id)}}>Add to Cart.</button>
        </div>
        
        <p className="displaycategory">
            <span>Category:</span>Women, Tshirt croptop
        </p>
        <p className="displaycategory">
            <span>Tags:</span>Modern, Latest 
        </p>
      </div>
    </div>
  )
}

export default Productdisplay
