import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import "../styles/styles.css";
import React, { useState } from "react";
import axios from "axios";

const cookies = new Cookies();
const API_URL = "http://localhost:3000/api/getInstructor";

const HomeInstructor = (props) => {
  const instructorUsername = cookies.get("InstructorUsername");
  const [instructorDetails, setInstructorDetails] = useState(null);
  const handleViewDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/${instructorUsername}`);
      // const instructorDetails = response.data;
      setInstructorDetails(response.data);
      // console.log("Instructor Details:", instructorDetails);
    } catch (error) {
      console.error("Error fetching instructor details:", error);
    }
  };

  const fetchSections = async (instructorUsername) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/sections/${instructorUsername}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching sections:", error);
      throw error;
    }
  };

  const fetchEnrollment = async (pairs) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/enrollment",
        { pairs }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      throw error;
    }
  };


  const handleSubmitGrades = async () => {
    try {
      // Fetch sections based on instructor_username
      const instructorUsername = cookies.get("InstructorUsername");
      const sections = await fetchSections(instructorUsername);
      console.log ("SECTIONS: ")
      console.log(sections)

      // Extract pairs of course_name and section_no
      const pairs = sections.map(({ course_name, section_no }) => ({
        course_name,
        section_no,
      }));
      console.log("PAIRS: ")
      console.log(pairs)

      // Fetch enrollments based on pairs
      const enrollments = await fetchEnrollment(pairs);

      // Display or further process the retrieved enrollments
      console.log("Enrollments:", enrollments);
      // Perform actions with fetched enrollments
    } catch (error) {
      console.error("Error handling grades:", error);
    }
  };


  const handleExpelStudent = () => {
    // Functionality for expelling a student from the course
  };

  const logout = () => {
    cookies.remove("InstructorTOKEN", { path: "/" });
    window.location.href = "/";
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-nav">
          <button onClick={handleViewDetails}>View My Details</button>
          <button onClick={handleSubmitGrades}>
            Submit Grades of a Student
          </button>
          <button onClick={handleExpelStudent}>
            Expel a Student from the Course
          </button>
        </div>
        {/* Logout button */}
        <div className="text-right">
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </div>
      </nav>

      <div className="main-content">
        <h2 className="text-gray-50 text-center">LETS START</h2>
        {/* Display instructor details */}
        {instructorDetails && (
          <div className="instructor-details">
            <h3>Instructor Details:</h3>
            <p>First Name: {instructorDetails.first_name}</p>
            <p>Last Name: {instructorDetails.last_name}</p>
            <p>Department: {instructorDetails.department}</p>
            <p>Ranking: {instructorDetails.ranking}</p>
            <p>Salary: {instructorDetails.salary}</p>
            <p>UserName: {instructorDetails.username}</p>
          </div>
        )}
      </div>

      {/* Style */}
      <style>
        {`
                body {
                    background-color: #fff; /* Set background color to white */
                    margin: 0; /* Remove default margin */
                    padding: 0; /* Remove default padding */
                    font-family: Arial, sans-serif; /* Change the font if needed */
                }
                .navbar {
                    background-color: #333; /* Set navbar background color */
                    padding: 10px;
                    color: #fff; /* Set text color */
                }
                .navbar button {
                    margin-right: 10px;
                    background-color: #fff; /* Button background color */
                    color: #333; /* Button text color */
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .navbar button:hover {
                    background-color: #ddd; /* Change button background color on hover */
                }
                .main-content {
                    padding: 20px;
                    /* Other styles for the main content */
                }
                `}
      </style>
    </>
  );
};

export default HomeInstructor;
