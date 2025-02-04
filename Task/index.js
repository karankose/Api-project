const express = require ('express');
const fs = require('fs');
const app  = express();;
const port = 8100;
const mongoose = require('mongoose');

const { log } = require('console');
// create connection
// it will return promise that why we use then and catch
mongoose.connect('mongodb://127.0.0.1:27017/Api-test-db')
.then(()=>{console.log('connection established')})
   .then(() => { console.log('connection established') }) 



// schema 
const userSchema = new mongoose.Schema({
   firstName : {
      type : String,
      required : true, // means without it not work 
   },
   lastName : {
      type : String,
   },
   email : {
      type : String,
      required : true, // means without it not work
      unique : true, // duplicate id is not allowed
   },
   jobTitle : {
      type : String,
   },
   gender : {
      type : String,
   },
},{
   timestamps : true // it used to track updation in mongo db
   // createdAt: ISODate('2025-02-03T09:29:53.191Z'),
   //  updatedAt: ISODate('2025-02-03T09:29:53.191Z'),
});

// mongoose model 
const User = mongoose.model('User', userSchema);



app.use(express.json());

app.use(express.urlencoded({extended: true }))//use to get deta from form in body
// middleware



app.use((req, res, next) =>{
   console.log('hello middleware 1cd');
   const date = `${Date.now()} : ${req.method} ${req.path}`;
  fs .appendFile('./lgo.txt' ,date,(err, res)=>{
   req.myname  ="karan";
   next();
  })

})
app.use((req, res, next) =>{
   console.log(req.myname);
   
   next();
})


app.get('/api/users',async(req , res,next)=>{
   const allDbusers = await User.find({})
   return res.json(allDbusers)
})


app.get('/users',async(req , res , next)=>{
   const allDbusers = await User.find({})
    const html = `
    <ul>
    ${allDbusers.map((user)=>`<li>${user.firstName} - ${user.email}</li>`)}
    </ul>
    `;
    res.send(html)
});

 


 app.get('/users/:id', (req ,res, next)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    if(!user){
      res.send(404+"  : user not found");
    }
    else{
      const html = `<h1> User info </h1>
      <h2> user id : ${user.id}</h2>
      <h2> user name : ${user.first_name}</h2>
      <h2> user email : ${user.email}</h2>`      
      res.send(html);
 }
})

//                                POST 
app.post('/api/users',async(req , res , next)=>{
   // create user 
   const body = req.body;
   if(!body || !body.first_name || !body.last_name || !body.email ){
      res.status(400).json({msg : "all fields required"});
   }
   console.log(body);
  const result =   await User.create({
      firstName : body.first_name,
      lastName : body.last_name,
      email : body.email,
      gender : body.gender,
      jobTitle : body.job_Title,

   })
   console.log("result : "+result);
   
   return res.status(201).json({msg : "ceate  successful"});
});




app.route('/api/users/:id')
.get(async(req , res , next)=>{
   const user = await User.findById(req.params.id);
   if(!user){''
      res.send(404+" user not found");
   }
   else{
      return res.json(user);
   }
})
.delete((req , res , next)=>{
   console.log("delete")
      const getId = parseInt(req.params.id)
      console.log(getId);
   
   const user = users.find((user)=> user.id === getId)
   if(!user){
      res.send("User not found")
   }{
      users.splice( getId, 1 )
      console.log( users.slice( getId , 1))
      res.send("delete user ")
   }
   // res.json({task : " pending"})
})
.patch(async(req , res , next)=>{
   // user edit
   await User.findById(req.params.id, {lastName : "changed"})
   res.json({task : " sucess"})
})
app.listen(port,()=>{
    
    console.log("http://localhost:8100");
        
})