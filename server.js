const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
var app=express()

app.use(bodyParser.json());
const  postroutes = require('./routes/posts');
const  userroutes = require('./routes/user')
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,Authorization, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});
mongoose.connect(
  "mongodb+srv://amrutha:cuGYv1Ty5GklagAq@cluster0-jmxdz.mongodb.net/mode-stack?retryWrites=true&w=majority"
  ,{useNewUrlParser: true,useUnifiedTopology: true }).then(()=>
  {
      console.log('sucesss');
  })
  .catch((err)=>{
      console.log('fail',err);
  }
  );
  app.use(express.static(path.join(__dirname,'public')));

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/index.html'));
})
  const PORT=process.env.PORT || 3080;

  app.use('/',postroutes);
  app.use('/',userroutes)

  app.listen(PORT,()=>{
    console.log('Server has been started at port:'+PORT)
  });