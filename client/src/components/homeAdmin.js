import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import React, { useState } from "react";
import "../styles/styles.css";
import axios from "axios";

const cookies = new Cookies();
const API_URL = "http://localhost:3000/api/getInstructor";

const HomeAdmin = (prop) => {
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showSalary, setShowSalary] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const defaultDOB = new Date("0000-01-01");
  const [instructorDetails, setInstructorDetails] = useState(null);
  const [error, setError] = useState("");
  const [salaries, setSalaries] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    date_of_birth: defaultDOB,
    major: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const signupUser = async (userData) => {
    try {
      console.log("Coming in signupUser in try block");
      const response = await axios.post(
        "http://localhost:3000/api/signup",
        userData
      );
      return response.data;
    } catch (error) {
      console.log("Error signing up:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("okay, submit button pressed");
    try {
      const response = await signupUser(formData);
      console.log("my response:", response);
      // Handle success response here
      const usernameInitials = response.user.username.substring(0, 2);
      console.log("Hey my username:", usernameInitials);
      setFormSubmitted(true);
    } catch (error) {
      console.log("An error occurred:", error.response.data.error);
      // Handle error response here and update the UI with the error message
      // For example, you can set the error message in the state and display it on the form
      // Update the state to store the error message
      setError(error.response.data.error);
    }
  };

  const viewRanking = async () => {
    // Functionality for viewing instructor details
    try {
      const response = await axios.get(`http://localhost:3000/getInstructor`);
      setInstructorDetails(response.data);
    } catch (error) {
      console.error("Error fetching instructor details:", error);
    }
  };

  const viewSalaries = async () => {
    // Functionality for viewing instructor details
    try {
      const response = await axios.get(`http://localhost:3000/getInstructor`);
      setInstructorDetails(response.data);
      setSalaries(response.data.map((val) => val.salary));
    } catch (error) {
      console.error("Error fetching instructor details:", error);
    }
  };

  const createStudent = () => {
    // Functionality for toggling the form visibility
    setShowForm(true); // Display the form when the "Create Student" button is pressed
    setFormSubmitted(false);
  };

  const AdminUseCase3 = async () => {
    setShowRanking(false);
    setShowSalary(true);
    viewSalaries();

    // Functionality for expelling a student from the course
  };

  // logout
  const logout = () => {
    // destroy the cookie
    cookies.remove("AdminTOKEN", { path: "/" });
    window.location.href = "/";
  };

  const handleSalaryChange = () => {
    const newInstructorDetails = instructorDetails.map((val, idx) => ({
      ...val,
      salary: salaries[idx],
    }));
    setInstructorDetails(newInstructorDetails);

    axios.post("http://localhost:3000/api/instructor_salary", {
      instructors: newInstructorDetails,
    });
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-nav">
          <button
            onClick={() => {
              setShowRanking(true);
              viewRanking();
            }}
          >
            View Ranking of Instructors
          </button>
          <button onClick={createStudent}>Create Student</button>
          <button onClick={AdminUseCase3}>Update Salary</button>
        </div>
        {/* Logout button */}
        <div className="text-right">
          <Button type="submit" variant="danger" onClick={() => logout()}>
            Logout
          </Button>
        </div>
      </nav>
      {/* Display instructor details */}
      {showRanking && instructorDetails && (
        <div className="instructor-details">
          <h3>Instructor Rankings:</h3>
          {instructorDetails.map((instructor, index) => (
            <div key={index}>
              <p>First Name: {instructor.first_name}</p>
              <p>Last Name: {instructor.last_name}</p>
              <p>Department: {instructor.department}</p>
              <p>Ranking: {instructor.ranking}</p>
              <hr /> {/* Separator between instructors */}
            </div>
          ))}
        </div>
      )}
      {showForm && !formSubmitted && (
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <input
              className="pass-inp"
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="pass-inp"
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="pass-inp"
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="pass-inp"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="date-inp"
              type="date"
              placeholder="Date of Birth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="pass-inp"
              type="text"
              placeholder="Major"
              name="major"
              value={formData.major}
              onChange={handleChange}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div>
            <button className="sub-button" type="submit">
              Create Student
            </button>
          </div>
        </form>
      )}
      {showSalary && (
        <div>
          {instructorDetails &&
            instructorDetails.map((val, index) => (
              <div key={index}>
                <p>
                  Name: {val.first_name} {val.last_name}
                </p>
                <p>Department: {val.department}</p>
                <p>
                  Salary:{" "}
                  <input
                    value={salaries[index]}
                    onChange={(e) => {
                      const { value } = e.target;
                      const newSalaries = [...salaries];
                      newSalaries[index] = value;
                      setSalaries(newSalaries);
                    }}
                  ></input>
                  <button onClick={handleSalaryChange}>Submit</button>
                </p>
                <hr /> {/* Separator between instructors*/}
              </div>
            ))}
        </div>
      )}
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

export default HomeAdmin;
