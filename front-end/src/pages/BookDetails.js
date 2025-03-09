import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "../components/StarRating";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const BookDetails = () => {
  const { bookId } = useParams(); // Getting the bookId from URL params
  const [book, setBook] = useState(null);
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookId) {
      setError("Book ID is missing!");
      return;
    }

    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${bookId}`);
        if (response.data) {
          setBook(response.data);
          setComments(response.data.comments || []);
        } else {
          setError("Book details not found!");
        }
      } catch (err) {
        setError("Error loading the book details");
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleRatingChange = async (newRating) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/books/${bookId}/rate`, { rating: newRating });
      if (response.status === 200) {
        toast.success("Rating added successfully!");
        // You might want to update the UI with the new average rating.
      }
    } catch (error) {
      console.error("Error rating the book:", error);
      toast.error("Error rating the book");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) {
      toast.error("Please enter a name and comment");
      return;
    }

    const newComment = { userName, comment, date: new Date().toISOString() };

    setComments([...comments, newComment]); // Optimistic UI update
    setUserName("");
    setComment("");

    try {
      await axios.post(`http://localhost:5000/api/books/${bookId}/comment`, newComment);
      toast.success("Comment posted successfully!");
    } catch (err) {
      toast.error("Error posting the comment");
    }
  };

  if (error) return <div className="error-message">{error}</div>;

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-details-container">
      <div className="book-details-card">
        <div className="book-image">
          <img src={book.imageUrl || "https://via.placeholder.com/150"} alt={book.title || "Book cover"} />
        </div>
        <div className="book-info">
          <h1>{book.title || "Unknown Title"}</h1>
          <StarRating rating={parseFloat(book.averageRating) || 0} onRatingChange={handleRatingChange} />
          <p className="author">Author: {book.author || "Unknown Author"}</p>
          <p className="description">{book.description || "No description available."}</p>
          <p>Average Rating: {book.averageRating || "N/A"} ({book.ratingsCount || 0} users rated)</p>

          <div className="comments-section">
            <h2>Comments</h2>
            <form onSubmit={handleCommentSubmit}>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                required
              />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                rows="4"
                required
              />
              <button type="submit">Submit</button>
            </form>

            <div className="comments-list">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <p><strong>{comment.userName}</strong> ({new Date(comment.date).toLocaleDateString()})</p>
                    <p>{comment.comment}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
