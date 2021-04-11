"use strict";

const mongoose = require('mongoose');

const UserSchema  = new mongoose.Schema({
	mail: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	}
});

UserSchema.set('versionKey', false);
UserSchema.set('timestamps', true);
UserSchema.set('strict', true);
UserSchema.set('strictQuery', true);

module.exports = mongoose.model('User', UserSchema);
