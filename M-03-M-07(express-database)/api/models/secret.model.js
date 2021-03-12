const sql = require("./db.js");

const Secret = function(secret) {
	this.title = secret.title
	this.body = secret.body
	this.user_id = secret.userId
};

Secret.create = (newSecret, result) => {
	sql.query("INSERT INTO secrets SET ?", newSecret, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}
		result(null, { id: res.insertId, ...newSecret });
	});
};


Secret.getAll = result => {
	sql.query("SELECT id,title,body FROM secrets", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}
		result(null, res);
	});
};

//find secret by ID
Secret.findById = (secretId, result) => {
	sql.query(`SELECT id,title,body FROM secrets WHERE id = ${secretId}`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		if (res.length) {
			result(null, res[0]);
			return;
		}

		result({ kind: "not_found" }, null);
	});
};

//all secrets of logged in user
Secret.findLoggedInUserSecrets = (userId,result) => {
	sql.query(`SELECT * FROM secrets WHERE user_id = ${userId}`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		if (res.length) {
			result(null, res);
			return;
		}

		result({ kind: "not_found" }, null);
	});
}

//update secret by id and valide that is own secret
Secret.updateById = (id, title,body,user, result) => {
	sql.query(`SELECT * FROM secrets WHERE id = ${id}`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		if (res.length) {			
			if(res[0].user_id == user.id){
				sql.query("UPDATE secrets SET title = ?, body = ? WHERE id = ?",[title, body, id],(err) => {
					if (err) {
						console.log("error: ", err);
						result(null, err);
						return;
					}
			
					return result(null, { id: id, title: title, body: body });
				});
			}else{
				return result({ kind: "not_own_secret" }, null);
			}
		}else{
			return result({ kind: "not_found" }, null);
		}
	});
};
















Secret.remove = (id, result) => {
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


Secret.removeAll = result => {
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

module.exports = Secret;