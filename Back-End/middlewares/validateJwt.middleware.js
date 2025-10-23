const{req,res,next}=require('express');
const jwt=require('jsonwebtoken');
const User = require('../models/user.model');
const validateJWT=(req,res,next)=>{
const authorizationHeader=req.get('authorization');
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');
   
   if (!user) {
     return res.status(401).json({
       success: false,
       message: 'Token غير صالح'
     });
   }
   req.user = user;
   next();
 } catch (error) {
   res.status(401).json({
     success: false,
     message: 'Token غير صالح'
   });
 }

    if(!authorizationHeader){
        res.status(403).send('authorization header not provides');
        return;

    }
    const token = authorizationHeader.split(' ')[1];
    if(!token){
        res.status(403).send('bearer token not found');
        return;
    }
    jwt.verify(token,JWT_SECRET,async(err,data)=>{
        if(err){
            res.status(403).send('invalid token')
            return

        }
        if(!data){
            res.status(403).send('invalid token payload');
            return;
        }
        const user = await User.findOne({email:data.email})
        req.user = user
    })
}
module.exports=validateJWT




