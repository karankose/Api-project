const express = require("express");
const {
  handleGetAllUsers,
  HandleGetUseById,
  HandleUpadateById,
  HandleDeleteById,
  createUser,
} = require("../controllers//user.controller.js");

const router = express.Router();

router.route('/')
.get(handleGetAllUsers)
.post(createUser);


router
  .route("/:id")

  .get(HandleGetUseById)

  .delete(HandleDeleteById)

  .patch(HandleUpadateById);

//
//  router.use((req, res, next) =>{
//     console.log(req.myname);

//     next();
//  })

//  router.get('/',async(req , res , next)=>{
//     const allDbusers = await User.find({})
//      const html = `
//      <ul>
//      ${allDbusers.map((user)=>`<li>${user.firstName} - ${user.email}</li>`)}
//      </ul>
//      `;
//      res.send(html)
//  });

router.get("/:id", (req, res, next) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      res.send(404 + "  : user not found");
    } else {
      const html = `<h1> User info </h1>
        <h2> user id : ${user.id}</h2>
        <h2> user name : ${user.first_name}</h2>
        <h2> user email : ${user.email}</h2>`;
      res.send(html);
    }
  });
  

module.exports = router;
