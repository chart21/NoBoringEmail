"use strict";
const fs = require('fs');
const path = require('path');
const readChunk = require('read-chunk');
const fileType = require('file-type');
const md5File = require('md5-file')

const ImageModel = require('../models/image');
const logger = require('../logger');


const create = (req, res) => {
	if (typeof req.file === undefined || !req.file){
		res.status(415);
		return;
	}

	// since multer is a utter piece of shit and relies on user input we need to do this manually...
	const buffer = readChunk.sync(req.file.path, 0, 4100);
	const mime = fileType(buffer);

	if(mime.mime !== 'image/jpeg'){
		fs.unlink(req.file.path);
		res.status(415);
		return;
	}
	
	// noboring.mail presenting world cheapest deduplication....
	const hash = md5File.sync(req.file.path)
	fs.rename(req.file.path, `${req.file.destination}/${hash}.jpg`, function(err) {
		if( err ){
			res.status(415);
			fs.unlink(req.file.path);
			return;
		}
	});

	const image = {
		filename: `${hash}.jpg`,
		public: false,
		lnglat: {type: "Point", coordinates: [0,0]}
	}

	ImageModel.count({filename: image.filename}, function (err, count){ 
		if(count === 0){
			ImageModel.create(image)
				.then(image => res.status(200).json(image))
				.catch(error => {
					logger.warn(error.message);
					res.status(500).json({
					error: 'Internal server error',
					message: error.message
				})} );
		} else {
			res.status(200).json(image)
		}
	});
};

const read  = (req, res) => {
	// make sure there is no directory traversal possible
	const filename = path.basename(req.params.filename);
	
	ImageModel.findOne({filename: filename}).exec()
		.then(image => {
			const file = __dirname + '/../../public/images/' + image.filename;
			res.download(file); // Set disposition and send it.
		})
		.catch(error => res.status(500).json({
			error: 'Internal Server Error',
			message: error.message
		}));
};

const list  = (req, res) => {
	let location = req.query.location || ''
	let lat = req.query.lat || ''
	let lng = req.query.lng || ''

	if(location !== ''){
		listByLocation(req, res, location);
	} else if(lat !== '' && lng !== ''){
		listByLngLat(req, res, lat, lng);
	} else {
		listNewest(req, res, location);
	}
};


const listNewest  = (req, res) => {
	ImageModel.find({public: true}).sort({'createdAt': -1}).limit(20).exec()
		.then(images => res.status(200).json(images))
		.catch(error => res.status(500).json({
			error: 'Internal server error',
			message: error.message
		}));
}

const listByLocation  = (req, res, location) => {
	ImageModel.find({ $and: [
		{public: true},
		{location: location.toString()}
		]}).limit(20).exec()
		.then(images => res.status(200).json(images))
		.catch(error => res.status(500).json({
			error: 'Internal server error',
			message: error.message
		}));
}

const listByLngLat  = (req, res, lat, lng) => {
	ImageModel.find({ $and: [
		{public: true},
		{
			lnglat: {
				$near: {
					$geometry: {
						type: "Point" ,
						coordinates: [ lng.toString(), lat.toString() ]
					},
					$maxDistance: 100000, // distance in meters
					$minDistance: 0       // distance in meters
				}
			}
		}
	]}).limit(20).exec()
		.then(images => res.status(200).json(images))
		.catch(error => res.status(500).json({
			error: 'Internal server error',
			message: error.message
		}));
}



module.exports = {
	create,
	read,
	list
};
