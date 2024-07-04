const Menu=require('../models/menu')

const getGetAllMenuItems=async(req,res)=>{
    try {
        const menus=await Menu.find({}).sort({createdAt:-1});
        res.status(200).json(menus)
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const postMenuItem=async(req,res)=>{
    const newItem=req.body;
    try {
        const result=await Menu.create(newItem);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const deleteMenuItem=async(req,res)=>{
    const menuId=req.params.id;
    try {
        const deletedItem=await Menu.findByIdAndDelete(menuId);
        if(!deletedItem){
            return res.status(404).json({message:"Item not found"});
        }
        res.status(200).json({message:"Item deleted successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const singleMenuItem=async(req,res)=>{
    const menuId=req.params.id;
    try {
        const menu=await Menu.findById(menuId);
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const updateMenuItem=async(req,res)=>{
    const menuId=req.params.id;
    const {name,recipe,image,category,price}=req.body;
    try {
        const updatedMenu=await Menu.findByIdAndUpdate(menuId,{name,recipe,image,category,price},{new:true,runValidators:true});
        if(!updatedMenu){
            return res.status(404).json({message:"Item not found"});
        }
        res.status(200).json(updatedMenu);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

module.exports = { getGetAllMenuItems, postMenuItem, deleteMenuItem, singleMenuItem, updateMenuItem };


module.exports={getGetAllMenuItems,postMenuItem,deleteMenuItem,singleMenuItem,updateMenuItem};