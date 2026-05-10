const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all routes in this file
router.use(authMiddleware);

router.post('/', tripController.createTrip);
router.get('/', tripController.getTrips);
router.get('/:id', tripController.getTripDetails);
router.delete('/:id', tripController.deleteTrip);

module.exports = router;
