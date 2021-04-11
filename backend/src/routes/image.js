"use strict";

const express = require('express');
const multer	= require('multer')
const readChunk = require('read-chunk');
const fileType = require('file-type');
const md5File = require('md5-file')
const crypto = require('crypto')
const mime = require('mime')

const router  = express.Router();

const middlewares = require('../middlewares');
const ImageController = require('../controllers/image');
const logger = require('../logger');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, __dirname + '/../../public/images/');
	},
	filename: function (req, file, cb) {
		crypto.pseudoRandomBytes(16, function (err, raw) {
			cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
		});
	}

});
const upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		cb(null, file.mimetype === 'image/jpeg');
	},
	limits: {
		fileSize: 10 * 1024 * 1024 // 10 MB
	},
})

router.post('/', upload.single('image'), ImageController.create);
router.get('/', ImageController.list);
router.get('/:filename', ImageController.read);
//router.put('/:id', middlewares.checkAuthentication, ImageController.update);
//router.delete('/:id', middlewares.checkAuthentication, ImageController.remove);


module.exports = router;
