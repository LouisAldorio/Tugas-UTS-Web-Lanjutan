const Secret = require("../models/secret.model.js");

exports.create = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	const userId = req.user.id

	const secret = new Secret({
		title: req.body.title,
		body: req.body.body,
		userId: userId
	});

	Secret.create(secret, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Some error occurred while creating Secret."
			});
		else {      
			res.send(data);
		}
	});
};

exports.findAll = (req, res) => {
	Secret.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving secrets."
			});
		else res.send(data);
	});
};

exports.findOne = (req, res) => {
	Secret.findById(req.params.secretId, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Secret with id ${req.params.secretId}.`,
					secrets: []
				});
			} else {
				res.status(500).send({
					message: "Error retrieving Secret with id " + req.params.secretId
				});
			}
		} else res.send(data);
	});
};

exports.findCurrentLoggedUserSecret = (req, res) => {
	Secret.findLoggedInUserSecrets(req.user.id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Secrets for user ${req.user.email}.`,
					secrets: []
				});
			} else {
				res.status(500).send({
					message: "Error retrieving Secrets for user " + req.user.email
				});
			}
		} else res.send(data);
	});
};


exports.update = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	Secret.updateById(req.params.secretId,req.body.title,req.body.body,req.user,(err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Secret with id ${req.params.secretId}.`
				});
			}else if (err.kind === "not_own_secret"){
				res.status(401).send({
					message: `You are not the owner of Secret with id ${req.params.secretId}.`
				});
			} else {
				res.status(500).send({
					message: "Error updating Secret with id " + req.params.secretId
				});
			}
		} else res.send(data);
	});
};

exports.delete = (req, res) => {
	Secret.remove(req.params.secretId,req.user, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Secret with id ${req.params.secretId}.`
				});
			}else if (err.kind === "not_own_secret") {
				res.status(401).send({
					message: `You are not the owner of secret with id ${req.params.secretId}.`
				});
			} else {
				res.status(500).send({
					message: "Could not delete Secret with id " + req.params.secretId
				});
			}
		} else res.send({ message: `Secret was deleted successfully!` });
	});
};

exports.deleteAll = (req, res) => {
	Secret.removeAll(req.user.id,(err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Some error occurred while removing all user."
			});
		else res.send({ message: `All Secrets were deleted successfully!` });
	});
};