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
  const [enrollments, setEnrollments] = useState(null);
  const [gradeValues, setGradeValues] = useState([]);

  const handleViewDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/${instructorUsername}`);
      setInstructorDetails(response.data);
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
      setEnrollments(response.data);
      setGradeValues(response.data.map((v) => v.grade));

      return response.data;
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      throw error;
    }
  };

  const handleEditGrade =  async (index, enrollment) => {
    const newEnrollments = enrollments.map((course, idx) => ({
      ...course,
      grade: gradeValues[idx],
    }));
    setEnrollments(newEnrollments);
    console.log("submit");
    console.log(newEnrollments);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/updateEnrollments",
        { enrollments: newEnrollments }
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error updating enrollments:", error);
    }
  };

  const handleGradeChange = (index, e) => {
    const { value } = e.target;
    console.log("WHERES THE NEW VALUE?");
    console.log(value);
    const tempArr = [...gradeValues];
    tempArr[index] = value;
    setGradeValues(tempArr);
  };

  const handleSubmitGrades = async () => {
    try {
      // Fetch sections based on instructor_username
      const instructorUsername = cookies.get("InstructorUsername");
      const sections = await fetchSections(instructorUsername);

      // Extract pairs of course_name and section_no
      const pairs = sections.map(({ course_name, section_no }) => ({
        course_name,
        section_no,
      }));
      const enrollments = await fetchEnrollment(pairs);
    } catch (error) {
      console.error("Error handling grades:", error);
    }
  };

  const handleDeleteEnrollment = async (index) => {
    // Create a copy of the enrollments array
    const updatedEnrollments = [...enrollments];
    // Remove the enrollment at the specified index
    const [removedEnrollment] = updatedEnrollments.splice(index, 1);
    console.log("Removed enrollment:", removedEnrollment);
    // Update the state with the modified enrollments array
    setEnrollments(updatedEnrollments);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/removeEnrollment",
        { removedEnrollment },
      );
      console.log(response.data);
      console.log("removed");
    } catch (error) {
      console.error("Error removing enrollment:", error);
      // Handle error cases
    }
  };


  const handleExpelStudent = async () => {
    // Functionality for expelling a student from the course
    try {
      // Fetch sections based on instructor_username
      const instructorUsername = cookies.get("InstructorUsername");
      const sections = await fetchSections(instructorUsername);

      // Extract pairs of course_name and section_no
      const pairs = sections.map(({ course_name, section_no }) => ({
        course_name,
        section_no,
      }));
      const enrollments = await fetchEnrollment(pairs);
    } catch (error) {
      console.error("Error handling grades:", error);
    }
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
        {/* Display enrollment details */}
        <div className="enrollment-details">
          <h3>Enrollment Details:</h3>
          {enrollments && enrollments.length > 0 ? (
            <ul>
              {enrollments.map((enrollment, index) => (
                <li key={index}>
                  <p>Course Name: {enrollment.course_name}</p>
                  <p>Section No: {enrollment.section_no}</p>
                  <div>
                    <input
                      type="text"
                      value={gradeValues[index]}
                      onChange={(e) => handleGradeChange(index, e)}
                    />
                    <button onClick={() => handleEditGrade(index, enrollment)}>
                      Submit
                    </button>
                  </div>
                  <p>Student_username: {enrollment.student_username}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No enrollments found</p>
          )}
        </div>
        <div className="student-delete-details">
          <h3>Students Enrolled:</h3>
          {enrollments && enrollments.length > 0 ? (
            <ul>
              {enrollments.map((enrollment, index) => (
                <li key={index}>
                  <p>Course Name: {enrollment.course_name}</p>
                  <p>Section No: {enrollment.section_no}</p>
                  <p>Grade: {enrollment.grade}</p>
                  <p>
                    Student Username: {enrollment.student_username}
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteEnrollment(index)}
                    >
                      Delete
                    </button>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No enrollments found</p>
          )}
        </div>
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
              .delete-button {
                color: white;
                background-color: red;
                border: none;
                padding: 5px 10px;
                border-radius: 5px;
                cursor: pointer;
                margin-left: 10px; /* Adjust margin as needed */
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
