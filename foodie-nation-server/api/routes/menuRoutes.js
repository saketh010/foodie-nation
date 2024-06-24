const express=require("express");
const router=express.Router();
const Menu=require('../models/menu');


const menuController=require('../controllers/menuControllers')

//getting all the menu items from the database
router.get('/',menuController.getGetAllMenuItems);
module.exports=router;