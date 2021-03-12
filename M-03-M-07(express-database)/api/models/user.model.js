const sql = require("./db.js");
const jwt = require('../../utils/jwt')
const { encrypt, decrypt } = require('../../utils/cryptography');

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

		newUser.id = res.insertId
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
			result(null, res[0]);
			return;
		}
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
	});
};


User.getAll = result => {
	sql.query("SELECT * FROM users", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}
		result(null, res);
	});
};


User.updateById = (id, name,user, result) => {
	
	if(id != user.id){
		result({ kind: "invalid_user" }, null);
		return;
	}

	sql.query("UPDATE users SET  name = ? WHERE id = ?",[name, id],(err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			result({ kind: "not_found" }, null);
			return;
		}
		result(null, { id: id, name: name, email: user.email});
	});
};

module.exports = User;