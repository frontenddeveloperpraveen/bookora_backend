const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, orderController.createOrder);
// Validate Coupon
router.post('/validate-coupon', authMiddleware, orderController.validateCoupon);

router.get('/', authMiddleware, orderController.getUserOrders);

module.exports = router;
