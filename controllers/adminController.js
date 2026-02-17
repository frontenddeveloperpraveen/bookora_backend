const Order = require('../models/Order');
const Book = require('../models/Book');
const User = require('../models/User');
const Coupon = require('../models/Coupon');

exports.getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBooks = await Book.countDocuments();
        const orders = await Order.find({ status: 'Completed' });
        
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
        const totalBooksSold = orders.reduce((acc, order) => {
            return acc + order.books.reduce((sum, item) => sum + item.quantity, 0);
        }, 0);

        const recentTransactions = await Order.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('user', 'name email')
            .populate('books.book', 'title price');

        res.json({
            totalUsers,
            totalBooks,
            totalRevenue,
            totalBooksSold,
            recentTransactions
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Coupon Management
exports.createCoupon = async (req, res) => {
    try {
        const coupon = new Coupon(req.body);
        await coupon.save();
        res.status(201).json(coupon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCoupon = async (req, res) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id);
        res.json({ message: 'Coupon deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
