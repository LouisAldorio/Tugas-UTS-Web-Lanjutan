module.exports = app => {
    const secret = require("../controllers/secret.controller.js");
    const {verify} = require("../middleware/auth")
  
    // Create or register user
    app.post("/secret", secret.create);

    //login user
    // app.post("/users/login",user.login)
  
    // // get All users 
    // app.get("/users", user.findAll);
  
    // // get user by id
    // app.get("/users/:userId", user.findOne);
  
    // // update user by id
    // app.put("/users/:userId", user.update);
  
    // // delete user by id
    // app.delete("/users/:userId", user.delete);
  
    // // delete all user
    // app.delete("/users", user.deleteAll);
};