import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import "../styles/styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const cookies = new Cookies();
const API_URL = "http://localhost:3000/api/getStudent";

const HomeStudent = (prop) => {
  const studentUsername = cookies.get("StudentUsername");
  const [studentDetails, setStudentDetails] = useState(null);
  const handleViewDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/${studentUsername}`);

      setStudentDetails(response.data);

    } catch (error) {
      console.error("Error fetching student details O BHAI:", error);
    }
  };

  const StudentUseCase2 = () => {
    // Functionality for submitting grades of a student
  };

  const StudentUseCase3 = () => {
    // Functionality for expelling a student from the course
  };

  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-nav">
        <button onClick={handleViewDetails}>View My Details</button>
          {/* Add more buttons for other functionalities */}
        </div>
        {/* Logout button */}
        <div className="text-right">
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </div>
      </nav>

      <div className="main-content">
        <h2 className="text-gray-50 text-center">LET'S START</h2>
        {/* Display student details */}
        {studentDetails && (
          <div className="student-details">
            <h3>Student Details:</h3>
            <p>First Name: {studentDetails.first_name}</p>
            <p>Last Name: {studentDetails.last_name}</p>
            <p>Username: {studentDetails.username}</p>
            <p>Date of Birth: {studentDetails.date_of_birth}</p>
            <p>Major: {studentDetails.major}</p>
          </div>
        )}
      </div>

      {/* Style */}
      <style>
        {`
          body {
              background-color: #fff;
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
          }
          .navbar {
              background-color: #333;
              padding: 10px;
              color: #fff;
          }
          .navbar button {
              margin-right: 10px;
              background-color: #fff;
              color: #333;
              border: none;
              padding: 8px 16px;
              border-radius: 4px;
              cursor: pointer;
          }
          .navbar button:hover {
              background-color: #ddd;
          }
          .main-content {
              padding: 20px;
          }
        `}
      </style>
    </>
  );
};

export default HomeStudent;
