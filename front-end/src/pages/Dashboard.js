import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Dashboard = () => {
  const userRole = localStorage.getItem("userRole");

  return (
    <div className="dashboard">
      {/* Hero Section with Background Image */}
      <section className="hero" style={{ backgroundImage: 'url("https://static.vecteezy.com/system/resources/thumbnails/051/732/961/small/an-open-book-lays-on-a-surface-its-pages-elegantly-fanned-out-inviting-curiosity-photo.jpg")' }}>
        <div className="hero-content">
          <h1>Welcome to BookStore 📚</h1>
          <p>Discover, explore, and manage your favorite books with ease.</p>
          <div className="hero-buttons">
            <Link to="/home" className="btn">Explore Books</Link>
            <Link to="/login" className="btn secondary">Login</Link>
            <Link to="/register" className="btn secondary">Register</Link>
          </div>
        </div>
      </section>

      {/* Special Features Section */}
      <section className="features">
        <h2>Why Choose BookStore?</h2>
        <div className="feature-list">
          <div className="feature">
            <h3>📖 Huge Collection</h3>
            <p>Access thousands of books across different genres to suit every taste.</p>
          </div>
          <div className="feature">
            <h3>🔍 Smart Search</h3>
            <p>Find books effortlessly with our powerful search engine and filters.</p>
          </div>
          <div className="feature">
            <h3>❤️ Personalized</h3>
            <p>Get book recommendations tailored to your interests and reading history.</p>
          </div>
        </div>
      </section>

      {/* Admin Section - Only visible for Admins */}
      {userRole === "admin" && (
        <section className="admin-section"  style={{ backgroundImage: 'url("https://img.freepik.com/premium-photo/book-icon-blue-background_438099-6244.jpg")' }}>
          <h2>Admin Panel</h2>
          <div className="admin-actions">
            <Link to="/admin" className="btn">Go to Admin Panel</Link>
            <Link to="/admin/add-book" className="btn">Add New Book</Link>
          </div>
          <p>Manage the entire bookstore here — books, users, and much more!</p>
        </section>
      )}

      {/* User Reviews Section */}
      <section className="reviews">
        <h2>What Our Users Are Saying</h2>
        <div className="reviews-list">
          <div className="review">
            <p>"A fantastic selection of books. I love the recommendations!"</p>
            <p><strong>- Sarah J.</strong></p>
          </div>
          <div className="review">
            <p>"The search feature is a game-changer. I find books in seconds."</p>
            <p><strong>- Mark L.</strong></p>
          </div>
          <div className="review">
            <p>"Highly recommend! The platform is easy to use and full of great reads."</p>
            <p><strong>- Emma T.</strong></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
