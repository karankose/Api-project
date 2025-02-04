const mongoose = require('mongoose');


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

module.exports = User;

