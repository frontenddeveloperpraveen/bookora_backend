const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Stats
router.get('/stats', authMiddleware, adminMiddleware, adminController.getStats);

// Coupons
router.post('/coupons', authMiddleware, adminMiddleware, adminController.createCoupon);
router.get('/coupons', authMiddleware, adminMiddleware, adminController.getAllCoupons);
router.delete('/coupons/:id', authMiddleware, adminMiddleware, adminController.deleteCoupon);

module.exports = router;
