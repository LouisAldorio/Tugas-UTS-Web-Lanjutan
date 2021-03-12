module.exports = app => {
    const secret = require("../controllers/secret.controller.js");
    const {verify} = require("../middleware/auth")
  
    // create secret
    app.post("/secret", secret.create);

    // get all secrets
    app.get("/secret", secret.findAll);

    //get logged in user secret
    app.get("/secret/me",secret.findCurrentLoggedUserSecret)

    // get user by id
    app.get("/secret/:secretId", secret.findOne);

    // update secret by id
    app.put("/secret/:secretId", secret.update);
  
    // // delete user by id
    // app.delete("/users/:userId", user.delete);
  
    // // delete all user
    // app.delete("/users", user.deleteAll);
};