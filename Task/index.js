const express = require ('express');
const { connectMongoDb } = require('./DB/dbConfig.js')
const userRouter = require('./routes/user.route.js'); 
const { logReq } = require('./midleware/index.js');
const app  = express();;
const port = 8100;


// connection
connectMongoDb("mongodb://127.0.0.1:27017/Api-test-db")
.then(()=>{console.log("Connect to MongoDB")})
.catch((err)=>{console.log(err+"  :  something was wrong connection error")})

app.use(express.json());
// middleware
app.use(express.urlencoded({extended: true }))//use to get deta from form in body


// middleware plugin 
app.use(logReq('log.txt'));


// routes
app.use('/user',userRouter);


//liste
app.listen(port,()=>{
    
    console.log("http://localhost:8100");
        
})