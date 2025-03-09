import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = '/login';
    }
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const booksResponse = await axios.get("http://localhost:5000/api/books", {
          headers: { authorization: `Bearer ${token}` },
        });
        setBooks(booksResponse.data);
        const usersResponse = await axios.get("http://localhost:5000/api/users", {
          headers: { authorization: `Bearer ${token}` },
        });
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Error fetching data. Please try again.");
      }
    };
    fetchData();
  }, []);

  const handleDeleteBook = (bookId) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:5000/api/books/${bookId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => setBooks(books.filter((book) => book._id !== bookId)))
      .catch((err) => {
        console.error("Error deleting book", err);
        setError("Error deleting book. Please try again.");
      });
  };

  const handleDeleteUser = (userId) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => setUsers(users.filter((user) => user._id !== userId)))
      .catch((err) => {
        console.error("Error deleting user", err);
        setError("Error deleting user. Please try again.");
      });
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <p>Welcome, Admin! Here you can manage books and users.</p>
      {error && <p className="error-message">{error}</p>}
      <section className="admin-section">
        <h2>Manage Books</h2>
        <Link to="/admin/add-book" className="btn">Add New Book</Link>
        <div className="book-list">
          {books.length === 0 ? (
            <p>No books available. Add some books.</p>
          ) : (
            books.map((book) => (
              <div key={book._id} className="book-item">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <div className="actions">
                  <Link to={`/admin/edit-book/${book._id}`} className="btn">Edit</Link>
                  <button onClick={() => handleDeleteBook(book._id)} className="btn btn-danger">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      <section className="admin-section">
        <h2>Manage Users</h2>
        <div className="user-list">
          {users.length === 0 ? (
            <p>No users available. Add some users.</p>
          ) : (
            users.map((user) => (
              <div key={user._id} className="user-item">
                <h3>{user.username}</h3>
                <p>Email: {user.email}</p>
                <div className="actions">
                  <button onClick={() => handleDeleteUser(user._id)} className="btn btn-danger">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Admin;
