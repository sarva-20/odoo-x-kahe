const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);


router.post('/trips/:tripId/stops', itineraryController.createStop);

router.post('/stops/:stopId/activities', itineraryController.createActivity);

router.get('/trips/:tripId/full', itineraryController.getItinerary);

module.exports = router;
