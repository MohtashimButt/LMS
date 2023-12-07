import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import "../styles/styles.css";
import React from "react";

const cookies = new Cookies();

const HomeStudent = (prop) => {
  const StudentUseCase1 = () => {
    // Functionality for viewing instructor details
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
          <button onClick={StudentUseCase1}>Use Case 1</button>
          <button onClick={StudentUseCase2}>Use Case 2</button>
          <button onClick={StudentUseCase3}>Use Case 3</button>
        </div>
        {/* Logout button */}
        <div className="text-right">
          <Button type="submit" variant="danger" onClick={() => logout()}>
            Logout
          </Button>
        </div>
      </nav>
    </>
  );
};

export default HomeStudent;
