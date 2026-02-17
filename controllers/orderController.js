const Order = require('../models/Order');
const Coupon = require('../models/Coupon');

exports.createOrder = async (req, res) => {
    try {
        const { books, totalAmount, paymentMethod, couponCode, discountAmount } = req.body;
        
        // In a real app, verify stock here
        let couponId = null;
        if (couponCode) {
            const coupon = await Coupon.findOne({ code: couponCode });
            if (coupon) {
                couponId = coupon._id;
                coupon.usageCount += 1;
                await coupon.save();
            }
        }

        const order = new Order({
            user: req.user.id,
            books,
            totalAmount,
            paymentMethod,
            coupon: couponId,
            discountsApplied: discountAmount || 0,
            status: 'Completed' // Simulate immediate success
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getUserOrders = async (req, res) => {
    try {
        console.log(`Fetching orders for user: ${req.user.id}`);
        const orders = await Order.find({ user: req.user.id }).populate('books.book');
        console.log(`Found ${orders.length} orders`);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.validateCoupon = async (req, res) => {
    try {
        const { code, amount } = req.body;
        const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

        if (!coupon) {
            return res.status(404).json({ error: 'Invalid coupon code' });
        }

        // Expiry check removed as requested

        let discount = 0;
        if (coupon.type === 'percentage') {
            discount = (amount * coupon.value) / 100;
        } else {
            discount = coupon.value;
        }

        // Cap discount at total amount
        if (discount > amount) {
            discount = amount;
        }

        res.json({ 
            discount, 
            code: coupon.code, 
            type: coupon.type, 
            value: coupon.value 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
