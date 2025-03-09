const Book = require('../models/Book');

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().lean();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

// Get a single book by ID
const getBookById = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findById(bookId).lean();
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const ratings = book.ratings || [];
    const averageRating = ratings.length === 0 ? 0 : ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length;
    const ratingsCount = ratings.length;

    res.status(200).json({
      ...book,
      averageRating,
      ratingsCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
};

// Add a new book (Admin)
const addBook = async (req, res) => {
  try {
      const { title, author, description, imageUrl } = req.body;

      // Log incoming request data
      console.log('Request data:', { title, author, description, imageUrl });

      if (!title || !author || !description || !imageUrl) {
          return res.status(400).json({ message: 'All fields are required.' });
      }

      // Create the new book object
      const newBook = new Book({
          title,
          author,
          description,
          imageUrl
      });

      console.log('Saving new book:', newBook);

      await newBook.save();  // Save the book to the database

      res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
      console.error('Error adding book:', error);  // Log the error
      res.status(500).json({ 
          message: 'Internal server error', 
          error: error.message, 
          stack: error.stack  // Include stack trace for debugging
      });
  }
};


// Update book details (Admin)
const updateBook = async (req, res) => {
  const { bookId } = req.params;
  let { title, author, description, imageUrl } = req.body;

  // Normalize the input data if provided
  if (title) title = title.trim();
  if (author) author = author.trim();
  if (description) description = description.trim();
  if (imageUrl) imageUrl = imageUrl.trim();

  try {
    const book = await Book.findByIdAndUpdate(
      bookId,
      { title, author, description, imageUrl },
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Error updating book', error: error.message });
  }
};

// Delete a book (Admin)
const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findByIdAndDelete(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
};

// Add a comment to a book
const addComment = async (req, res) => {
  const { bookId } = req.params;
  const { userName, comment } = req.body;
  if (!userName || !comment) {
    return res.status(400).json({ message: 'Both userName and comment are required' });
  }
  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    book.comments.push({ userName, comment });
    await book.save();
    res.status(200).json({ message: 'Comment added successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
};

// Add a rating to a book
const addRating = async (req, res) => {
  const { bookId } = req.params;
  const { rating } = req.body;
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }
  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    book.ratings.push(rating);
    await book.save();
    const ratings = book.ratings || [];
    const averageRating = ratings.length === 0 ? 0 : ratings.reduce((acc, r) => acc + r, 0) / ratings.length;
    const ratingsCount = ratings.length;
    res.status(200).json({
      message: 'Rating added successfully',
      book: { ...book.toObject(), averageRating, ratingsCount }
    });
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({ message: 'Error adding rating', error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addComment,
  addRating,
  addBook,
  updateBook,
  deleteBook,
};
