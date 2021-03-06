"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');
const AuthController = require('../controllers/auth');


router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/account', middlewares.checkAuthentication , AuthController.account);
router.get('/logout', middlewares.checkAuthentication, AuthController.logout);

module.exports = router;
