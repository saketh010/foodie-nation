// const jwt = require('jsonwebtoken');
// const User=require('../models/User');
// const verifyAdmin=async(req,res,next)=>{
//     const email=req.decoded.email;
//     const query={email:email};

//     const user=await User.findOne(query);
//     const isAdmin=user?.role=='admin';
//     if(!isAdmin){
//         return res.status(403).send({message:"access forbidden"})
//     }
//     next();
// };

// module.exports=jwt.verifyAdmin;
const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
  try {
    const email = req.decoded.email; // Use req.decoded from verifyToken
    const query = { email: email };

    const user = await User.findOne(query);
    const isAdmin = user?.role === 'admin'; // Ensure strict equality check

    if (!isAdmin) {
      return res.status(403).send({ message: "Access forbidden" });
    }

    next();
  } catch (error) {
    console.error('Error verifying admin:', error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = verifyAdmin;
