const express=require('express');
const User=require('../modela/user');
const User1=require('../modela/user');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const router=express.Router();
 router.post('/register',function(req,res,next){
 bcrypt.hash(req.body.password,10)
 .then(hash=>{
  const user=new User1({
        username:req.body.username,
        password:hash,
        email:req.body.email,
        address:req.body.address
    });
 user.save().then(result=>{
    console.log(result);
    res.status(200).json({
       message:'New User Created' ,
       result:result
    });
 
  }).catch(err=>{
      console.log(err);
      res.status(500).json({error:err
      })
  })
  
 })
})
 router.post('/login',function(req,res,next){
 let fetchuser;
   User.findOne({email:req.body.email}).then(user=>{
 
    if(!user){

  return  res.status(401).json({message:'Auth Failed'});
}
fetchuser=user;
return bcrypt.compare(req.body.password,user.password)
   }).then(result=>{
    
if(!result)
{
  return res.status(401).json({
    message:'Auth failed'
  });
} const token =jwt.sign({email:fetchuser.email,userid:fetchuser._id},
  'always_love_john_cena',
  {expiresIn:"1h"});
  console.log(token);
  res.status(200).json({
    message:'success',
    token:token,
    expiresIn:3600
  })
 }).catch(err=>{
   console.log(err);
   return res.status(401).json({
     message:'Auth failed'
   })
 })
 })
 module.exports=router;