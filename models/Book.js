const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true }, // Fiction, Education, Comics, Exam books
    isbn: { type: String, unique: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    language: { type: String, required: true },
    genre: { type: String },
    description: { type: String },
    pages: { type: Number, default: 0 },
    coverImage: { type: String, required: true },
    fileUrl: { type: String }, // Link to PDF/EPUB
    trending: { type: Boolean, default: false },
    reviews: [reviewSchema], // Embedded reviews for simplicity
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);
