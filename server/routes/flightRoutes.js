const express = require('express');
const router = express.Router();
const { getArrivals } = require('../controllers/flightController');

router.get('/arrivals', getArrivals);

module.exports = router;