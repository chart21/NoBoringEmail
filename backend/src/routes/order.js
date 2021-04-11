"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const OrderController = require('../controllers/order');


router.get('/', middlewares.checkAuthentication, OrderController.list);
router.post('/', middlewares.checkAuthentication, OrderController.create);
router.get('/:id', middlewares.checkAuthentication, OrderController.read);


module.exports = router;
