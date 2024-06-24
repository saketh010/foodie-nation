const Carts = require("../models/Carts");

const getCartsByEmail=async(req,res)=>{
    try {
        const email=req.query.email;
        const query= {email:email};
        const result=await Carts.find(query).exec();
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

const addToCart=async(req,res)=>{
    const {menuItemId,name,recipe,image,price,quantity,email}=req.body;
    try {
        const existingCartItem=await Carts.findOne({menuItemId});
        if(existingCartItem){
            return res.status(400).json({message:"Item already exists in your cart"});
        }
        const cartItem=await Carts.create({menuItemId,name,recipe,image,price,quantity,email})
        res.status(201).json(cartItem);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

//delete
const deleteCart=async(req,res)=>{
    const cartId=req.params.id;
    try {
        const deletedCart=await Carts.findByIdAndDelete(cartId);
        if(!deletedCart){
            res.status(401).json({message:"Item not found"});
        }        
        res.status(200).json({message:"Cart item deleted"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const updateCart=async(req,res)=>{
    const cartId=req.params.id;
    const {menuItemId,name,recipe,image,price,quantity,email}=req.body;
    try {
        const updatedCart=await Carts.findByIdAndUpdate(cartId,{menuItemId,name,recipe,image,price,quantity,email},{new :true,runValidators:true});
        if(!updatedCart){
            return res.status(404).json({message:"Item not found"});
        }
        
        res.status(200).json(updateCart);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getSingleCart=async(req,res)=>{
    const cartId=req.params.id;
    try {
        const cartId=await Carts.findById(cartId);
        res.status(200).json(cartItem);
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

module.exports={
    getCartsByEmail,addToCart,deleteCart,updateCart,getSingleCart
}