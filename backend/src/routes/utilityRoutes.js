const express = require('express');
const router = express.Router();
const utilityController = require('../controllers/utilityController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/trips/:id/budget', utilityController.getBudget);
router.get('/trips/:id/recommendations', utilityController.getRecommendations);
router.post('/trips/:id/checklist', utilityController.addItem);
router.patch('/checklist/:itemId/toggle', utilityController.toggleItem);

module.exports = router;
