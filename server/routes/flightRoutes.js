const express = require('express');
const router = express.Router();
const { getArrivals } = require('../controllers/flightController');
const { getDepartures } = require('../controllers/flightController');

router.get('/arrivals', getArrivals);
router.get('/departures',getDepartures)

module.exports = router;