const itineraryService = require('../services/itineraryService');

exports.createStop = async (req, res) => {
  try {
    const stop = await itineraryService.addStop(req.userId, req.params.tripId, req.body);
    res.status(201).json({ success: true, data: stop });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};

exports.createActivity = async (req, res) => {
  try {
    const activity = await itineraryService.addActivity(req.userId, req.params.stopId, req.body);
    res.status(201).json({ success: true, data: activity });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};

exports.getItinerary = async (req, res) => {
  try {
    const trip = await itineraryService.getFullItinerary(req.userId, req.params.tripId);
    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};