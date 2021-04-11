"use strict";

const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');

const config     = require('../config');
const UserModel  = require('../models/user');


const login = (req,res) => {
	if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
		error: 'Bad Request',
		message: 'You have to supply a password.'
	});

	if (!Object.prototype.hasOwnProperty.call(req.body, 'mail')) return res.status(400).json({
		error: 'Bad Request',
		message: 'You have to supply a valid mail address.'
	});

	UserModel.findOne({mail: req.body.mail}).exec()
		.then(user => {
			// check if the password is valid
			const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
			if (!isPasswordValid) return res.status(401).send({token: null });

			// if user is found and password is valid
			// create a token
			const token = jwt.sign({ id: user._id, mail: user.mail }, config.JwtSecret, {
				expiresIn: 86400 // expires in 24 hours
			});

			res.status(200).json({token: token});

		})
		.catch(error => res.status(404).json({
			error: 'User Not Found',
			message: error.message
		}));

};


const register = (req,res) => {
	if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
		error: 'Bad Request',
		message: 'You have to supply a password.'
	});

	if (!Object.prototype.hasOwnProperty.call(req.body, 'mail')) return res.status(400).json({
		error: 'Bad Request',
		message: 'You have to supply a valid mail address.'
	});

	if (!Object.prototype.hasOwnProperty.call(req.body, 'name')) return res.status(400).json({
		error: 'Bad Request',
		message: 'You have to supply a valid name.'
	});

	const user = Object.assign(req.body, {password: bcrypt.hashSync(req.body.password, 8)});


	UserModel.create(user)
		.then(user => {
			// if user is registered without errors
			// create a token
			const token = jwt.sign({ id: user._id, mail: user.mail }, config.JwtSecret, {
				expiresIn: 86400 // expires in 24 hours
			});

			res.status(200).json({token: token});
		})
		.catch(error => {
			if(error.code == 11000) {
				res.status(400).json({
					error: 'User exists',
					message: error.message
				})
			}
			else{
				res.status(500).json({
					error: 'Internal server error',
					message: error.message
				})
			}
		});

};


const account = (req, res) => {
	UserModel.findById(req.userId).select('mail name').exec()
		.then(user => {

			if (!user) return res.status(404).json({
				error: 'Not Found',
				message: `User not found`
			});

			res.status(200).json(user)
		})
		.catch(error => res.status(500).json({
			error: 'Internal Server Error',
			message: error.message
		}));
};


const logout = (req, res) => {
	res.status(200).send({ token: null });
};


module.exports = {
	login,
	register,
	logout,
	account
};
