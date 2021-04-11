"use strict";

const mongoose = require('mongoose');

const TrackingSchema  = new mongoose.Schema({
	order: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	status: {
		type: String,
		required: true
	},
	info: String
});

TrackingSchema.set('versionKey', false);
TrackingSchema.set('timestamps', false);
TrackingSchema.set('strict', true);
TrackingSchema.set('strictQuery', true);

module.exports = mongoose.model('Tracking', TrackingSchema);
