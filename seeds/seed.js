const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('../models/Book');
const User = require('../models/User');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => {
      console.error('MongoDB Connection Error:', err);
      process.exit(1);
  });

const books = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        isbn: "9780743273565",
        price: 10.99,
        rating: 4.5,
        language: "English",
        genre: "Classic",
        description: "A novel set in the Jazz Age that explores themes of decadence, idealism, resistance to change, social upheaval, and excess.",
        coverImage: "https://example.com/gatsby.jpg",
        trending: true
    },
    {
        title: "Atomic Habits",
        author: "James Clear",
        category: "Education",
        isbn: "9780735211292",
        price: 15.99,
        rating: 4.8,
        language: "English",
        genre: "Self-Help",
        description: "An easy and proven way to build good habits and break bad ones.",
        coverImage: "https://example.com/atomic.jpg",
        trending: true
    },
    {
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        category: "Education",
        isbn: "9780062316097",
        price: 18.99,
        rating: 4.7,
        language: "English",
        genre: "History",
        description: "Explores the history of humankind from the Stone Age to the present.",
        coverImage: "https://example.com/sapiens.jpg",
        trending: false
    },
    {
        title: "Naruto Vol. 1",
        author: "Masashi Kishimoto",
        category: "Comics",
        isbn: "9781569319000",
        price: 9.99,
        rating: 4.9,
        language: "English",
        genre: "Manga",
        description: "The story of Naruto Uzumaki, a young ninja who seeks to gain recognition from his peers and also dreams of becoming the Hokage.",
        coverImage: "https://example.com/naruto.jpg",
        trending: true
    }
];

const seedDB = async () => {
    await Book.deleteMany({});
    await Book.insertMany(books);
    console.log('Database Seeded!');
    process.exit();
};

seedDB();
