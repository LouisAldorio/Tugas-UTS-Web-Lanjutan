module.exports = app => {
    const secret = require("../controllers/secret.controller.js");
  
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
  
    // delete secret by id
    app.delete("/secret/:secretId", secret.delete);
  
    //  delete all user secrets
    app.delete("/secret/user/me", secret.deleteAll);
};