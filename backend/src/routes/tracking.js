"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const TrackingController = require('../controllers/tracking');


router.get('/', middlewares.checkAuthentication, TrackingController.listByOrder);
router.get('/:id', middlewares.checkAuthentication, TrackingController.read);


module.exports = router;
