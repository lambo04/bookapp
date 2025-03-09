const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public routes
router.get('/', bookController.getAllBooks);
router.get('/:bookId', bookController.getBookById);
router.post('/:bookId/comment', bookController.addComment);
router.post('/:bookId/rate', bookController.addRating);

// Admin-only routes
router.post('/add', adminMiddleware, bookController.addBook);
router.put('/:bookId', adminMiddleware, bookController.updateBook);
router.delete('/:bookId', adminMiddleware, bookController.deleteBook);

module.exports = router;
