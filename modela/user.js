const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
const userchema = mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}  
});
userchema.plugin(uniqueValidator);
module.exports=mongoose.model('User',userchema)

const userchema1 = mongoose.Schema({
    username:{type:String,required:true} , 
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    address:{type:String,required:true}  
});
userchema1.plugin(uniqueValidator);
module.exports=mongoose.model('User1',userchema1)