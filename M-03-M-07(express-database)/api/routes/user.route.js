module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    // Create or register user
    app.post("/users/register", user.create);

    //login user
    app.post("/users/login",user.login)
  
    // get All users 
    app.get("/users", user.findAll);
  
    // get user by id
    app.get("/users/:userId", user.findOne);
  
    // update user by id
    app.put("/users/:userId", user.update);
  
    // delete user by id
    app.delete("/users/:userId", user.delete);
  
    // delete all user
    app.delete("/users", user.deleteAll);
};