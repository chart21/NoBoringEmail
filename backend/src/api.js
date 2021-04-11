"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const middlewares = require('./middlewares');

const auth  = require('./routes/auth');
const order = require('./routes/order');
const image = require('./routes/image');
const tracking = require('./routes/tracking');

const api = express();


// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);

// Basic route
api.get('/', (req, res) => {
	res.json({
		name: 'NoBoring.Mail Backend'
	});
});

// API routes
api.use('/auth' , auth);
api.use('/order', order);
api.use('/image', image);
api.use('/tracking', tracking);

// static files
api.use(express.static('public'));


module.exports = api;
