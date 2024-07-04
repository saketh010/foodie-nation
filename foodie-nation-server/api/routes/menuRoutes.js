const express=require("express");
const router=express.Router();
const Menu=require('../models/menu');

const menuController=require('../controllers/menuControllers')

//getting all the menu items from the database
router.get('/',menuController.getGetAllMenuItems);

//adding menu items
router.post('/',menuController.postMenuItem);

router.delete('/:id',menuController.deleteMenuItem);

router.get('/:id',menuController.singleMenuItem);

router.patch('/:id',menuController.updateMenuItem);

module.exports=router;