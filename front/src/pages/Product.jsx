import React, { useContext } from 'react'
import { ShopContext } from '../context/Context'
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/Breadcrum/Breadcrum';
import Productdisplay from '../components/Productdisplay/Productdisplay';
import Descriptionbox from '../components/Descbox/Descriptionbox';
import Relatedproducts from '../components/RelatedProducts/Relatedproducts';

const Product = () => {
  const {allproduct} = useContext(ShopContext);
  const {productId} = useParams();
  const product = allproduct.find((e)=>e.id === Number(productId))
  return (
    <div>
      <Breadcrum product={product}/>
      <Productdisplay product={product}/>
      <Descriptionbox/>
      <Relatedproducts/>
    </div>
  )
}

export default Product
