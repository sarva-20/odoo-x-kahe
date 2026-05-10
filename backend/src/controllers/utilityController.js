const utilityService = require('../services/utilityService');

exports.getBudget = async (req, res) => {
  try {
    const budgetData = await utilityService.getTripBudget(req.userId, req.params.id);
    res.status(200).json({ success: true, data: budgetData });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

exports.addItem = async (req, res) => {
  try {
    const item = await utilityService.addChecklistItem(req.userId, req.params.id, req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
exports.toggleItem = async (req, res) => {
  try {
    const updatedItem = await utilityService.toggleChecklistItem(req.userId, req.params.itemId);
    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};