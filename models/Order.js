const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    books: [{
        book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
        quantity: { type: Number, default: 1 },
        priceAtPurchase: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['UPI', 'Credit/Debit Card', 'Net Banking', 'Wallet'], required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
    transactionId: { type: String },
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
    discountsApplied: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
