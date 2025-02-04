const User = require('../models/user.model.js')

async function handleGetAllUsers(req , res , next){
    const allDbusers = await User.find({})
    return res.json(allDbusers)
}

async function HandleGetUseById (req , res ,next){
    const user = await User.findById(req.params.id);
    if(!user){''
       res.send(404+" user not found");
    }
    else{
       return res.json(user);
    }
}

async function HandleUpadateById(req , res ,next){
    await User.findById(req.params.id, {lastName : "changed"})
    return res.json({task : " sucess"})
}

async function HandleDeleteById(req , res , next){
    console.log("delete")
       const getId = parseInt(req.params.id)
       console.log(getId);
    
    const user = User.find((user)=> user.id === getId)
    if(!user){
      return res.send("User not found")
    }{
       User.splice( getId, 1 )
       console.log( User.slice( getId , 1))
      return res.send("delete user ")
    }
}

async function createUser(req ,res ,next){
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
        return res.status(201).json({msg : "ceate  successful" ,id: result._id});
}

module.exports = {

    handleGetAllUsers ,
    HandleGetUseById,
    HandleUpadateById,
    HandleDeleteById,
    createUser,
}