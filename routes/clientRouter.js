const express = require('express');

const clientController = require('../controller/clientController');

const router = express.Router();

router.get('/verify', clientController.checkToken);
router.get('/', clientController.getAllClients);

router.post('/referral', clientController.addReferral);
router.post('/', clientController.addClient);

router.patch('/secret', clientController.addSecret);

router.post('/image', clientController.uploadImage);
router.post('/image-path', clientController.createImagePath);

module.exports = router;
