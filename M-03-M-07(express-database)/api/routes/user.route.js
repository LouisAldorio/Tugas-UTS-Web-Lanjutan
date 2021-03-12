module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    //get logged in user info
    app.get("/users/me",user.findCurrentLoggedInUser)

    // get user by id
    app.get("/users/:userId", user.findOne);

    //ambil semua user yang terdaftar di app
    app.get("/users",user.findAll)

    //update user info
    app.put("/users/:userId",user.update)
};