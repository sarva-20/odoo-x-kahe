const express = require('express');
const router = express.Router();
const utilityController = require('../controllers/utilityController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/trips/:id/budget', utilityController.getBudget);
router.post('/trips/:id/checklist', utilityController.addItem);

module.exports = router;
