const User = require("../models/user.model.js");
const { encrypt, decrypt } = require('../../utils/cryptography');

//register
exports.create = (req, res) => {

	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	let encyptedPassword = encrypt(req.body.password)

	const user = new User({
		email: req.body.email,
		name: req.body.name,
		password: encyptedPassword.hashed,
		iv: encyptedPassword.iv
	});


	User.create(user, (err, data) => {
		if (err){
			res.status(500).send({
				message: err.message || "Some error occurred while creating the User."
			});
		}else {      
			res.send(data);
		}
	})
};

//login
exports.login = (req,res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}
	const user = new User({
		email: req.body.email,
		password: req.body.password
	});

	
	User.login(user,(err,data) => {
		
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found User with id ${req.params.userId}.`
				});
			}else if(err.kind === "invalid_password"){
				res.status(401).send({
					message: `Invalid Password , Unauthorized!`
				})
			} else {
				res.status(500).send({
					message: "Error retrieving User with id " + req.params.userId
				});
			}
		}
		else {      
			res.send(data);
		}
	})
}


//get all user
exports.findAll = (req, res) => {
	User.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving users."
			});
		else res.send(data);
	});
};


//find by id
exports.findOne = (req, res) => {
	User.findById(req.params.userId, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found User with id ${req.params.userId}.`
				});
			} else {
				res.status(500).send({
					message: "Error retrieving User with id " + req.params.userId
				});
			}
		} else res.send(data);
	});
};

//update user data
exports.update = (req, res) => {

	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	User.updateById(req.params.userId,req.body.name,req.user,(err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found User with id ${req.params.userId}.`
				});
			}else if(err.kind === "invalid_user"){
				res.status(404).send({
					message: `You are not allowed to update User with id ${req.params.userId}.`
				});
			} else {
				res.status(500).send({
					message: "Error updating User with id " + req.params.userId
				});
			}
		} else res.send(data);
	});
};



//find my profile 
exports.findCurrentLoggedInUser = (req, res) => {
	
	User.findById(req.user.id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found User with id ${req.params.userId}.`
				});
			} else {
				res.status(500).send({
					message: "Error retrieving User with id " + req.params.userId
				});
			}
		} else res.send(data);
	});
};

