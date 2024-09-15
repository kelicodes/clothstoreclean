
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { log } = require('console');

require('dotenv').config();



app.use(express.json());
app.use(cors());

//database coonection mongodb
 const DBCONNECTIONSTRING= process.env.DB_CONNECTION;
 const port = process.env.PORT || 4000;



try {
    mongoose.connect(DBCONNECTIONSTRING);
    console.log("connected to server");
} catch (error) {
    console.log(error);
}



//api creation

app.get('/', (req, res)=>{
    res.send("Express app is running.")
})

//image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage});

//creating upload endpoint for images
app.use('/images',express.static('upload/images'))
app.post('/upload',upload.single('product'), (req,res)=> {
    try {
        res.json({
            success:1,
            image_url:`http://localhost:${port}/images/${req.file.filename}`
        })
    } catch (error) {
        console.log(error);
    }
})

//schema for creating products
const Product = mongoose.model('product',{
    id:{
        type: Number,
        required: true,

    },
    name:{
        type: String,
        required: true
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    },
    availabe:{
        type:Boolean,
        default:true
    },

})
//endpoint to add products to database
app.post('/addproduct', async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length > 0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1
    }
    else{
        id = 1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})
//API for deleting products

app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id})
    console.log("removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

//creating API for getting all products
app.get('/allproducts', async (req,res)=>{
    let products =await Product.find({});
    console.log("All products fetched.");
    res.send(products)
})

//schema for user model
const Users = mongoose.model('Users',{
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

//endpoint for user registartion
app.post('/signup', async (req, res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"Existing user found with same email address."})
    }
    let cart ={}
    for (let i = 0; i < 300; i++) {
        cart[i]=0;   
    }
    const user = new Users({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    })
    await user.save();
    const data={
        user:{
            id:user.id
        }

    }
    const token=jwt.sign(data,'secret_ecom');
    console.log(user);
    
    res.json({success:true,token})
})
//user login endpoint
app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passcompare = req.body.password === user.password;
        if(passcompare){
            const data= {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true,token})
        }
        else{
            res.json({success:false,errors:"wrong password"})
        }
    }
    else{
        res.json({success:false,errors:"wrong email id"})
    }
})

//endpoint for newcollection data
app.get('/newcollections', async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("new collection fetched");
    res.send(newcollection)
    
})

//endpoint for popular in women
app.get('/popularforwomen', async (req,res)=>{
    let products = await Product.find({category:"women"});
    let popularinwomen = products.slice(0,4);
    console.log("popular in women fetched");
    res.send(popularinwomen)
    
})
//creating middleware to fetch user//
const fetchuser= async (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token!!"})
    }
    else{
        try {
            const data = jwt.verify(token,"secret_ecom");
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"Please authenticate using a valid token."}) 
            
        }
    }
}
//endpoint for adding product in cart
app.post('/addtocart',fetchuser, async(req,res)=>{
    console.log("added", req.body.ItemId)
    let userdata = await Users.findOne({_id:req.user.id});
    userdata.cartData[req.body.ItemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userdata.cartData});
    res.send("Added");
})

//endpoint to remove product from database
app.post('/removefromcart', fetchuser, async(req,res)=>{
    console.log("removed", req.body.ItemId);
    let userdata = await Users.findOne({_id:req.user.id});
    if(userdata.cartData[req.body.ItemId]>0)
    userdata.cartData [req.body.ItemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userdata.cartData});
    res.send("Removed");
})
//endpoint to get cart data
app.post('/getcart',fetchuser, async(req,res)=>{
    console.log("get cart");
    let userdata = await Users.findOne({_id:req.user.id});
    res.json(userdata.cartData);
    
})
app.listen(port,(error)=>{
    if(!error){
        console.log(`server running on ${port}`);
    }
    else{
        console.log(`Error ${error}`);
    }
})