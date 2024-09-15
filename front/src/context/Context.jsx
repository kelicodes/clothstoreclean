import React, { createContext, useEffect, useState } from "react";


export const ShopContext = createContext(null);
const getDefaultCart = () =>{
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart [index] = 0;  
    }
    return cart
}


const ShopContextProvider = (props) =>{

    const url = "http://localhost:4000/"
    const [allproduct, setAllproduct]= useState([])
    const [cartitems, setCartitems] = useState(getDefaultCart());
    useEffect(()=>{
        fetch(`${url}allproducts`)
        .then((response)=>response.json()).then((data)=>setAllproduct(data))

        if(localStorage.getItem("auth-token")){
            fetch(`${url}getcart`,{
                method:"POST",
                headers:{
                    Accept:'application/form-data',
                    'auth-token': `${localStorage.getItem("auth-token")}`,
                    'Content-Type': "application/json"
                },
                body:""
            }).then((response)=>response.json()).then((data)=>setCartitems(data))
        }
    },[])

    const addtocart = (ItemId) =>{
        setCartitems((prev)=> ({...prev,[ItemId]:prev[ItemId]+1}));
        if(localStorage.getItem("auth-token")){
            fetch(`${url}addtocart`,{
                method:"POST",
                headers:{
                    Accept:"application/form-data",
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"ItemId":ItemId})
            })
            .then((response)=>response.json()).then((data)=>console.log(data))
        }
    }
    const removefromcart = (ItemId) =>{
        setCartitems((prev)=> ({...prev,[ItemId]:prev[ItemId]-1}));
        if(localStorage.getItem("auth-token")){
            fetch(`${url}removefromcart`,{
                method:"POST",
                headers:{
                    Accept:"application/form-data",
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"ItemId":ItemId})
            })
            .then((response)=>response.json()).then((data)=>console.log(data))
        }
    }

    const gettotalcartammount = () =>{
        let totalammount = 0;
        for(const item in cartitems){
            if(cartitems[item]>0 ){
                let iteminfo = allproduct.find((product)=>product.id === Number(item));
                totalammount += iteminfo.new_price * cartitems[item]
            }
            
        }
        return totalammount;
    }
    const gettotalcartitems = () =>{
        let totalitem = 0;
        for(const item in cartitems){
            if(cartitems[item]> 0){
                totalitem += cartitems[item]
            }
        }
        return totalitem
    }
    const contextvalue = {gettotalcartitems,gettotalcartammount,allproduct,cartitems,addtocart,removefromcart,url};
    return (
        <ShopContext.Provider value = {contextvalue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider