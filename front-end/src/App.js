// App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookDetails from "./pages/BookDetails";
import Admin from "./pages/Admin";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute"; // Ensure this is implemented correctly
import { loginSuccess } from "./redux/actions/authActions";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

const App = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);

  // On initial load, check localStorage for an existing login
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("userRole");
    const storedUser = localStorage.getItem("userName");

    if (storedToken && storedRole && storedUser) {
      // Dispatch with a user object that includes a name
      dispatch(
        loginSuccess({
          user: { name: storedUser },
          role: storedRole,
          token: storedToken,
        })
      );
    }
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Admin Route - Only accessible for admin */}
        <Route
          path="/admin"
          element={role === "admin" ? <Admin /> : <Navigate to="/dashboard" />}
        />
        <Route path="/admin/add-book" element={<AddBook />} />
        <Route path="/admin/edit-book/:bookId" element={<EditBook />} />

        {/* Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Protected Route - Requires Authentication */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books/:bookId" element={<BookDetails />} />
      </Routes>

      {/* Toast notifications */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />

      <Footer />
    </Router>
  );
};

export default App;
