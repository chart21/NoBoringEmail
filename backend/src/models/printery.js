"use strict";

const mongoose = require('mongoose');

const PrinterySchema  = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	lnglat: {
		type: {type: String},
		coordinates: [{type: Number}]
	}
});

PrinterySchema.index({lnglat: "2dsphere"})

PrinterySchema.set('versionKey', false);
PrinterySchema.set('timestamps', false);
PrinterySchema.set('strict', true);
PrinterySchema.set('strictQuery', true);

module.exports = mongoose.model('Printery', PrinterySchema);
