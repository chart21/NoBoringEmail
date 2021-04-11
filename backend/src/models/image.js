"use strict";

const mongoose = require('mongoose');

const ImageSchema  = new mongoose.Schema({
	filename: {
		type: String,
		required: true,
		unique: true,
	},
	public: {
		type: Boolean,
		required: true,
		default: false
	},
	location: String,
	lnglat: {
		type: {type: String},
		coordinates: [{type: Number}]
	}
});

ImageSchema.index({lnglat: "2dsphere"})

ImageSchema.set('versionKey', false);
ImageSchema.set('timestamps', true);
ImageSchema.set('strict', true);
ImageSchema.set('strictQuery', true);

module.exports = mongoose.model('Image', ImageSchema);
