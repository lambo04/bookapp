import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../redux/actions/bookActions';
import { Link } from 'react-router-dom';
import "../App.css";

const Home = () => {
  const dispatch = useDispatch();
  const { books } = useSelector(state => state.books);
  const { isAuthenticated } = useSelector(state => state.auth);
  const { role } = useSelector(state => state.auth);

  // State for the search query
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Filter books based on search query
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="home-container">
      <h1>Book List</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {isAuthenticated ? (
        <div className="books-list">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book._id} className="book-card">
                <div className="image-container">
                  <img src={book.imageUrl} alt={book.title} className="img-fluid" />
                </div>
                <h2 className="book-title">{book.title}</h2>
                <p className="book-author">Author: {book.author}</p>
                <Link to={`/books/${book._id}`} className="btn mt-2">View Details</Link>
              </div>
            ))
          ) : (
            <p>No books found for "{searchQuery}".</p>
          )}
        </div>
      ) : (
        <p>Please log in to see the books.</p>
      )}

      {role === "admin" && (
        <div className="admin-actions">
          <Link to="/admin/add-book" className="btn">Add New Book</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
