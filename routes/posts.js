const express= require('express');
const routes=express.Router();
const  Post = require('../modela/post')
const checkAuth=require('../middleware/check_auth');
var app=express()



routes.get('/articles', function(req,res){
  
    let fetchedpost;
    const pageSize=+req.query.pageSize;
    const currentpage=+req.query.page;
    const postQuery=Post.find();
    if(pageSize && currentpage){
      postQuery.skip(pageSize*(currentpage-1))
      .limit(pageSize);
    }
    console.log(req.query);
    postQuery.then((docs)=>{
      fetchedpost=docs;
      return Post.count();
    //
  }).then(count=>{
    console.log(count);
    res.status(200).json({
    message:'fetched',posts:fetchedpost,maxPosts:count});

  })
    .catch((err)=>{
console.log(err);
    });
  });


        routes.post('/articles',checkAuth,function(req,res)
        {
       console.log(req);
        var sam=new Post({
         title:req.body.title,
         body:req.body.content,
         author:req.body.author
        });
        console.log(sam);
        sam.save().then((createid)=>{
          res.status(200).json({
            message: "New articles added successfully!",
          post:{
            ...createid,
           id: createid._id,
           }
          })
          console.log('sent to db');
        }).catch((err)=>{
          console.log(err);
        }
        
        );
        console.log(sam);
       console.log('sent');
      

    
});

routes.get('/articles/:id',function(req,res){
  Post.findById(
  req.params.id
).then((resp)=>
{
  if(resp){
res.status(200).json(resp)
  }
  else{
    res.status(404).json({message:'Not found'})
  }
  console.log(resp);
}).catch((err)=>
{
  console.log(err);
})
})

module.exports=routes;