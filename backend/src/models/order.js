"use strict";

const mongoose = require('mongoose');

const OrderSchema  = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	printery: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	text: String,
	options: {
		font: String,
		size: String,
		color: String,
	},
	address: {
		type: String,
		required: true
	}
});

OrderSchema.set('versionKey', false);
OrderSchema.set('timestamps', true);
OrderSchema.set('strict', true);
OrderSchema.set('strictQuery', true);

module.exports = mongoose.model('Order', OrderSchema);
