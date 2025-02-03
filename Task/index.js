const express = require ('express');
const fs = require('fs');
const app  = express();;
const port = 8100;
const users = require('./MOCK_DATA.json')
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


app.get('/api/users',(req , res,next)=>{
   return res.json(users)
})
app.get('/users',(req , res , next)=>{
    const html = `
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`)}
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
app.post('/api/users',(req , res , next)=>{
   // create user 
   const body = req.body;
   if(!body || !body.first_name || !body.last_name || !body.email ){
      res.status(400).json({msg : "all fields required"});
   }
   console.log(body);
   users.push( {...body, id : users.length + 1 });
   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users),(err, data)=>{
      return res.status(201).json(body);
   }) 
})




app.route('/api/users/:id').get((req , res , next)=>{
   const id = Number(req.params.id);// take query parameters in string Number to type change
   const user = users.find((user)=> user.id === id)
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
.patch((req , res , next)=>{
   // user edit
   res.json({task : " pending"})
})
app.listen(port,()=>{
    
    console.log("http://localhost:8100");
        
})