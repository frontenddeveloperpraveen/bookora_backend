const express = require('express');
const router = express.Router(); // Fixed casing and Router usage
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/', bookController.getAllBooks);
router.post('/', authMiddleware, adminMiddleware, bookController.createBook);
router.get('/search', bookController.searchBooks);

router.get('/content/:id', bookController.getBookContent);
router.get('/:id', bookController.getBookById);
router.put('/:id', authMiddleware, adminMiddleware, bookController.updateBook);
router.delete('/:id', authMiddleware, adminMiddleware, bookController.deleteBook);

module.exports = router;
