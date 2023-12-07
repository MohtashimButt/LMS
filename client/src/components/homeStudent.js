import { Button, Modal, Form, ListGroup } from "react-bootstrap";
import Cookies from "universal-cookie";
import "../styles/styles.css";
import React, { useState } from "react";
import axios from "axios";
import { captureRejectionSymbol } from "events";

const cookies = new Cookies();
const API_URL = "http://localhost:3000/api/getStudent";
const API_URL2 = "http://localhost:3000/api/searchCourses";

const HomeStudent = (prop) => {
  const studentUsername = cookies.get("StudentUsername");
  const [studentDetails, setStudentDetails] = useState(null);

  // Getting this stuff is the 2nd stage
  const [showRankingModal, setShowRankingModal] = useState(false);
  const [instructorUsername, setInstructorUsername] = useState("");
  const [ranking, setRanking] = useState(0);

  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [sectionNumber, setSectionNumber] = useState("");
  const [myStudent, setMyStudent] = useState("");

  // SEARCH STUFF
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleViewDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/${studentUsername}`);
      setStudentDetails(response.data);
    } catch (error) {
      console.error("Error fetching student details O BHAI:", error);
    }
  };

  const handleRateInstructor = () => {
    setShowRankingModal(true);
  };
  const handleRankingSubmit = async () => {
    try{
      const instructorUsername = cookies.get("InstructorUsername");
      const response = await axios.get(`http://localhost:3000/api/getInstructor/${instructorUsername}`);
      const instructorRanking = response.data.ranking;
      console.log ("MERA INSTRUCTOR:",instructorUsername);
      console.log("OR UNKI RANKING:",instructorRanking);
      console.log("YE HAI INKI NEW RANKING:",ranking)
    }
    catch(error){
      console.error("Error is erroring in the submit grade:", error);
    }

    try{
      const response2 = await axios.post('http://localhost:3000/api/updateInstructorRanking', {
        instructorUsername,
        newRanking: ranking,
      });
      console.log('Ranking updated successfully:', response2.data);
    }
    catch(error){
      console.error('Error updating ranking:', error);
    }
  };

  const handleCloseRankingModal = () => {
    setShowRankingModal(false);
  };

  // ENROLLMENT
  const handleEnrollmentCourse = () => {
    setShowEnrollmentModal(true);
  };

  const handleEnrollmentSubmit = async () => {
    // const response3 = await axios.get(`http://localhost:3000/api/getStudent/${studentUsername}`);
    // const studentUsernameForEnrollment = response3.data.first_name;
    // setStudentUsernameForEnrollment(response3);
    // console.log("MER NAME:",studentUsernameForEnrollment)
    try {
      const randomVar = await axios.get(`http://localhost:3000/api/getStudent/${studentUsername}`);
      // Send enrollment data to the server
      console.log(randomVar.data.username, courseName, sectionNumber, "T")
      setMyStudent(randomVar.data.username)
      const response4 = await axios.post("http://localhost:3000/api/enrollStudent", {
        studentUsername,
        courseName,
        sectionNumber,
        grade: "T",
      });
      console.log("Client men hu")
      // Handle the response as needed
      console.log("Enrollment submitted:", response4.data);

      // Close the enrollment modal
      setShowEnrollmentModal(false);
    }
    catch(error){
      console.error("ENROLLMENT K SIAPPAY:", error);
    }

    // try{
    //   const response2 = await axios.post('http://localhost:3000/api/updateCourseRanking', {
    //     // CourseName,
    //     newEnrollment: enrollment,
    //   });
    //   console.log('Ranking updated successfully:', response2.data);
    // }
    // catch(error){
    //   console.error('Error updating ranking:', error);
    // }
  };
  const handleCloseEnrollmentModal = () => {
    setShowEnrollmentModal(false);
  };

    // SEARCH:
    const handleSearchCourses = async () => {
      try {
        const response = await axios.get(`${API_URL2}?searchTerm=${searchTerm}`);
        setSearchResults(response.data.courses);
        setShowSearchModal(true);
      } catch (error) {
        console.error('Error searching courses:', error);
      }
    };
  
    const handleCloseSearchModal = () => {
      setShowSearchModal(false);
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
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-nav">
          <button onClick={handleViewDetails}>View My Details</button>
          <button onClick={handleRateInstructor}>Rate my instructor</button>
          <button onClick={handleEnrollmentCourse}>Enrollment</button>
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

        {/* Ranking Modal */}
        <Modal show={showRankingModal} onHide={handleCloseRankingModal}>
          <Modal.Header closeButton>
            <Modal.Title>Rate Instructor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="instructorUsername">
                <Form.Label>Instructor Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter instructor username"
                  onChange={(e) => setInstructorUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="ranking">
                <Form.Label>Ranking (0 to 10)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Ranking"
                  min="0"
                  max="10"
                  onChange={(e) => setRanking(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseRankingModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleRankingSubmit}>
              Submit Ranking
            </Button>
          </Modal.Footer>
        </Modal>
      {/* Enrollment Modal */}
      <Modal show={showEnrollmentModal} onHide={handleCloseEnrollmentModal}>
      <Modal.Header closeButton>
        <Modal.Title>Do Enrollment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="courseName">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter course name"
              onChange={(e) => setCourseName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="sectionNumber">
            <Form.Label>Section Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Section number"
              onChange={(e) => setSectionNumber(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseEnrollmentModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEnrollmentSubmit}>
          ENROLL
        </Button>
      </Modal.Footer>
    </Modal>
      </div>
      <div>
      <Form.Group controlId="searchTerm">
        <Form.Label>Search Courses</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter course name"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSearchCourses}>
        Search
      </Button>

      {/* Search Results Modal */}
      <Modal show={showSearchModal} onHide={handleCloseSearchModal}>
        <Modal.Header closeButton>
          <Modal.Title>Search Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {searchResults.map((course, index) => (
              <ListGroup.Item key={index}>{course.course_name}</ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSearchModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
      {/* <Modal show={showEnrollmentModal} onHide={handleCloseEnrollmentModal}>
          <Modal.Header closeButton>
            <Modal.Title>Do Enrollment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="courseName">
                <Form.Label>Course Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter course name"
                  onChange={(e) => setEnrollment(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="enrollment">
                <Form.Label>section number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Section number"
                  onChange={(e) => setRanking(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEnrollmentModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEnrollmentSubmit}>
              ENROLL
            </Button>
          </Modal.Footer>
        </Modal>
       */}
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
