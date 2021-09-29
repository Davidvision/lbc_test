const express = require('express');
const firefighterController = require('../controllers/firefighter.controller');

const router = express.Router();

router.post('/new', firefighterController.newFireFighter);

module.exports = router;
