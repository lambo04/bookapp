import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "../App.css";

const EditBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch book details when the component mounts
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${bookId}`, {
          headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error loading book details');
        setLoading(false);
        toast.error('Error loading book');
        console.error('Fetch book error:', error);
      }
    };
    fetchBook();
  }, [bookId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/books/${bookId}`, book, {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.status === 200) {
        toast.success('Book updated successfully!');
        navigate('/admin');
      }
    } catch (error) {
      toast.error('Error updating book');
      console.error('Update book error:', error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    });
  };

  // Show loading state if the data is still being fetched
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="edit-book-container">
      <h1>Edit Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={book.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={book.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
