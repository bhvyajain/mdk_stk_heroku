const mongoose=require('mongoose');
const postschema = mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
   author:{type:String,required:true}
})
module.exports=mongoose.model('Post',postschema)