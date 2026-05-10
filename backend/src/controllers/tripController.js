const tripService = require('../services/tripService');

exports.createTrip = async (req, res) => {
  try {
    const trip = await tripService.createTrip(req.userId, req.body);
    res.status(201).json({ success: true, data: trip });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getTrips = async (req, res) => {
  try {
    const trips = await tripService.getAllUserTrips(req.userId);
    res.status(200).json({ success: true, data: trips });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTripDetails = async (req, res) => {
  try {
    const trip = await tripService.getTripById(req.userId, req.params.id);
    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    await tripService.deleteTrip(req.userId, req.params.id);
    res.status(200).json({ success: true, message: "Trip deleted successfully" });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};