const mongoose = require('mongoose');

// Comment Schema
const commentSchema = new mongoose.Schema({
  userName: { type: String, required: true, trim: true },
  comment:  { type: String, required: true, trim: true },
  date:     { type: Date, default: Date.now },
});

// Book Schema
const bookSchema = new mongoose.Schema({
  title:       { type: String, required: true, unique: true, trim: true },
  author:      { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  imageUrl:    { type: String, required: true, trim: true },
  comments:    [commentSchema],
  ratings:     { 
    type: [Number], 
    default: [], 
    validate: [validateRatings, 'Ratings must be between 1 and 5'] 
  },
}, { timestamps: true });

// Validate rating values (1-5)
function validateRatings(ratings) {
  return ratings.every(rating => rating >= 1 && rating <= 5);
}

// Calculate average rating method
bookSchema.methods.calculateAverageRating = function () {
  if (this.ratings.length === 0) return 0;
  return this.ratings.reduce((acc, rating) => acc + rating, 0) / this.ratings.length;
};

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
