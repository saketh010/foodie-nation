const express = require("express");
const router = express.Router();

const userController = require('../controllers/userControllers');  // Ensure this path is correct
const verifyToken = require('../middlewares/verifyToken');        // Ensure this path is correct
const verifyAdmin = require('../middlewares/verifyAdmin');        // Ensure this path is correct

// Log imported modules to check if they are properly imported
console.log('userController:', userController);
console.log('verifyToken:', verifyToken);
console.log('verifyAdmin:', verifyAdmin);

router.get('/', verifyToken, verifyAdmin, userController.getAllUsers);
router.post('/', userController.createUser);
router.delete('/:id', verifyToken, verifyAdmin, userController.deleteUser);
router.get('/admin/:email', verifyToken, userController.getAdmin);
router.patch('/admin/:id', verifyToken, verifyAdmin, userController.makeAdmin);

module.exports = router;
