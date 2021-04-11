"use strict";

const OrderModel = require('../models/order');
const PrinteryModel = require('../models/printery');
const TrackingModel = require('../models/tracking');
const logger = require('../logger');

const NodeGeocoder = require('node-geocoder');
const geocoder = NodeGeocoder({
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'AIzaSyA-NX_tVYpvgncTkhEbrimOR_zjXlXdYtY' // pl0x no h4x :'(
});
//todo: move api key to config....


const create = (req, res) => {
	if (Object.keys(req.body).length === 0) return res.status(400).json({
		error: 'Bad Request',
		message: 'The request body is empty'
	});

	/*
	1) Turn address into geo location or fail
	2) Get printery close to geo location or fail
	3) Save order with pintery and user or fail
	4) Save some dummy tracking info for good looks
	*/

	//remove the recipients name from address
	const address = req.body.address.split(/\r?\n/).splice(0, 1).join(", ");
	geocoder.geocode(req.body.address) //1
	.then(function(geoRes) {
		console.log(geoRes);
		const orderLocation = geoRes[0];
		PrinteryModel.findOne({ $and: [
			{country: orderLocation.countryCode.toLowerCase()},
			{
				lnglat: {
					$near: {
						$geometry: {
							type: "Point" ,
							coordinates: [ orderLocation.longitude, orderLocation.latitude ]
						}
					}
				}
			}
		]}).exec() //2
		.then(printery => {
			const order = Object.assign(req.body, {user: req.userId, printery: printery._id});
			OrderModel.create(order) //3
				.then(order => {
					res.status(201).json(order)

					const tracking_1 = {
						order: order._id,
						date: order.createdAt,
						status: 'Queued',
						info: 'Your order is being queued for processing'
					}

					let tracking_2_date = new Date(order.createdAt);
					tracking_2_date.setTime(tracking_2_date.getTime()+(60*60*12*1000)); // date+4h
					const tracking_2 = {
						order: order._id,
						date: tracking_2_date,
						status: 'Printery assigned',
						info: 'Your order is assigned to '+printery.name
					}

					// 4
					TrackingModel.create(tracking_1);
					TrackingModel.create(tracking_2);
				})
				.catch(error => {
					logger.warn("Err: order save:", error.message);
					res.status(500).json({
						error: 'Internal server error',
						message: error.message
					});
				});
		})
		.catch(error => {
			logger.warn("Err: find nearest printery:", error.message);
			res.status(500).json({			
				error: 'Internal server error',
				message: error.message
			});
		});
	})
	.catch(error => {
		logger.warn("Err: addr2geo:", error.message);
		res.status(500).json({
			error: 'Internal server error',
			message: error.message
		});
	});
};

const read  = (req, res) => {
	OrderModel.findOne({user: req.userId, _id: req.params.id}).exec()
		.then(order => {

			if (!order){
				res.status(404).json({
					error: 'Not Found',
					message: `Order not found`
				});
				return;
			}

			res.status(200).json(order)
		})
		.catch(error => res.status(500).json({
			error: 'Internal Server Error',
			message: error.message
		}));

};

const update = (req, res) => {
	if (Object.keys(req.body).length === 0)
	{
		return res.status(400).json({
			error: 'Bad Request',
			message: 'The request body is empty'
		});
	}

	OrderModel.findAndUpdate({user: req.userId, _id: req.params.id}, req.body,{
		new: true,
		runValidators: true}).exec()
		.then(order => res.status(200).json(order))
		.catch(error => res.status(500).json({
			error: 'Internal server error',
			message: error.message
		}));
};

const list  = (req, res) => {
	OrderModel.find({user: req.userId}).sort({'createdAt': -1}).exec()
		.then(orders => res.status(200).json(orders))
		.catch(error => res.status(500).json({
			error: 'Internal server error',
			message: error.message
		}));
};

module.exports = {
	create,
	read,
	update,
	list
};
