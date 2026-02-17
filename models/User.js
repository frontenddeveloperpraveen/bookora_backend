const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Using email/phone as ID logically, but separate field for flexibility
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    photo: { type: String, default: '' },
    preferences: {
        genres: [String],
        authors: [String]
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    cart: [{
        book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
        quantity: { type: Number, default: 1 }
    }],
    walletBalance: { type: Number, default: 0 },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
