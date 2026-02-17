const Book = require('../models/Book');
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.searchBooks = async (req, res) => {
    try {
        const { q } = req.query;
        // Search by title or author, case insensitive
        const books = await Book.find({
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { author: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } }
            ]
        });
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookContent = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book || !book.fileUrl) {
             return res.status(404).json({ message: 'Book or file not found' });
        }

        // Extract filename from URL or path
        const filename = path.basename(book.fileUrl); 
        const filePath = path.join(__dirname, '..', 'uploads', filename);

        if (!fs.existsSync(filePath)) {
             return res.status(404).json({ message: 'File not found on server' });
        }

        const dataBuffer = fs.readFileSync(filePath);
        
        try {
            const data = await pdf(dataBuffer);
            res.json({ content: data.text, totalPages: data.numpages, fileUrl: book.fileUrl });
        } catch (pdfError) {
             console.error('PDF Parse Error:', pdfError);
             res.status(500).json({ message: 'Failed to parse PDF', error: pdfError.message });
        }
        
    } catch (error) {
        console.error('Get Content Error:', error);
        res.status(500).json({ error: error.message });
    }
};
