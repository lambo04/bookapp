import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../App.css";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const bookData = { title, author, description, imageUrl };

    console.log("Submitting book:", bookData);  // Log the form data
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/books/add",
        bookData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'  // Ensure content type is JSON
          }
        }
      );

      // Log the response (to remove the unused variable warning)
      console.log("Server response:", response.data);

      toast.success("Book added successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Add book error:", error);
    
      if (error.response) {
        console.error("Server response:", error.response.data);
        toast.error(error.response.data.message || 'Failed to add book.');
      } else {
        toast.error('Network error. Please try again.');
      }
    }
  };

  return (
    <div className="add-book-container">
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit} className="add-book-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
