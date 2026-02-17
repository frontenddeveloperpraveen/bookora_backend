const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true, uppercase: true },
    type: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
    value: { type: Number, required: true }, // e.g., 20 for 20% or 20$
    expiryDate: { type: Date }, // Optional now
    isActive: { type: Boolean, default: true },
    usageCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Coupon', couponSchema);
