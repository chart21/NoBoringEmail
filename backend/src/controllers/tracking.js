"use strict";

const TrackingModel = require('../models/tracking');
const logger = require('../logger');

const read  = (req, res) => {
	TrackingModel.findById(req.params.id).exec()
		.then(tracking => {

			if (!tracking){
				res.status(404).json({
					error: 'Not Found',
					message: `Tracking not found`
				});
				return;
			}

			res.status(200).json(tracking)
		})
		.catch(error => res.status(500).json({
			error: 'Internal Server Error',
			message: error.message
		}));

};

const listByOrder = (req, res) => {
	const orderId = req.query.order || ''

	if(orderId === ''){
		res.status(404).json({
			error: 'Not Found',
			message: `Tracking not found`
		});
		return;
	}

	TrackingModel.find({order: orderId}).sort({'createdAt': -1}).exec()
		.then(tracking => res.status(200).json(tracking))
		.catch(error => res.status(500).json({
			error: 'Internal server error',
			message: error.message
		}));
};

module.exports = {
	read,
	listByOrder
};
