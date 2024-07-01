const jwt = require('jsonwebtoken');

//token verification (middleware will have 3 parameters)
const verifyToken=(req,res,next)=>{
    if(!req.headers.authorization){
      return res.status(401).send({message:"unauthorized access"});
    }
    
    const token=req.headers.authorization.split(' ')[1];
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
      if(err){
        return res.status(401).send({message:"token is invalid"});
      }
      req.decoded=decoded;
      next();
    })
  }

module.exports=verifyToken;