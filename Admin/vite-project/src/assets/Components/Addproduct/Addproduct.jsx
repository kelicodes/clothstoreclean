import React, { useState } from 'react'
import './Addproduct.css'
import upload from '../../Admin_Assets/upload_area.svg'

const Addproduct = () => {
  const [image,setImage] = useState(false);
  const [productdetails, setProductdetails] = useState({
    name:"",
    image:"",
    category: "women",
    new_price:"",
    old_price:""
  })
  const addproduct = async () =>{
    console.log(productdetails);
    let responseData;
    let product = productdetails;
    let formData = new FormData();
    formData.append('product', image);
    await fetch('http://localhost:4000/upload',{
      method:"POST",
      headers:{
        Accept:"application/json"
      },
      body:formData,
    }).then((resp)=> resp.json()).then((data)=>{responseData=data})

    if(responseData.success){
      product.image = responseData.image_url;
      console.log(product);
      await fetch ('http://localhost:4000/addproduct',{
        method:"POST",
        headers:{
          Accept:"application/json",
          'Content-Type':"application/json"
        },
        body:JSON.stringify(product),
      }).then((resp)=> resp.json()).then((data)=>{
        data.success?alert('Product added'):alert("Product addition failed")
      })
    }
  }
  const imagehandle = (e) =>{
    setImage(e.target.files[0])
  }

  const changehandler = (e) =>{
    setProductdetails({...productdetails, [e.target.name]:e.target.value})
  }
  return (
    <div className='addproduct'>
      <div className="addproductitemfields">
        <p>Product title</p>
        <input value={productdetails.name} onChange={changehandler} type="text" name="name" placeholder='productname' />
      </div>
      <div className="addproductprice">
        <div className="addproductitemfields">
          <p>Price</p>
          <input value={productdetails.old_price} onChange={changehandler}  type="text" name="old_price" placeholder="old_price" />
        </div>
        <div className="addproductitemfields">
          <p>Offer Price</p>
          <input value={productdetails.new_price} onChange={changehandler} type="text" name="new_price" placeholder="offer_price" />
        </div>
      </div>
      <div className="addproductitemfield">
        <p>Product category</p>
        <select value={productdetails.category} onChange={changehandler} name="category" className='addproductselector'>
          <option value="women">women</option>
          <option value="men">men</option>
          <option value="kid">kid</option>
        </select>
      </div>
      <div className="addproductitemfield">
        <label htmlFor="file-input">
          <img src={image? URL.createObjectURL(image): upload} alt="" className='addproductthumbnailimg' />
        </label>
        <input onChange={imagehandle} type="file" name='image' id='file-input' hidden/>
      </div>
      <button onClick={()=>{addproduct()}} className='addproductbtn'>ADD</button>
    </div>
  )
}

export default Addproduct
