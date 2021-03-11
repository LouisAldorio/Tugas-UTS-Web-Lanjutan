const sql = require("./db.js");
const jwt = require('../../utils/jwt')
const { encrypt, decrypt } = require('../../utils/cryptography');

// constructor
const User = function(user) {
  this.email = user.email;
  this.name = user.name;
  this.password = user.password;
  this.iv = user.iv
};


User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser,token:  jwt.GenerateToken(newUser)});
    result(null, { id: res.insertId, ...newUser,token:  jwt.GenerateToken(newUser) });
  });
};


User.login = (loginUser,result) => {
    sql.query(`SELECT * FROM users WHERE email = '${loginUser.email}'`, loginUser, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if(res.length){
            //check password
            const decryptUserPassword = decrypt({
                iv: res[0].iv,
                hashed: res[0].password
            })
            console.log(decryptUserPassword,loginUser.password)
            if(loginUser.password != decryptUserPassword){
                result({ kind: "invalid_password" }, null);
                return
            }

            res[0].token = jwt.GenerateToken(res[0])
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
         // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
}




User.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};




User.getAll = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};




User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET email = ?, name = ? WHERE id = ?",
    [user.email, user.name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};




User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};


User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;