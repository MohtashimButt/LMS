import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import "../styles/styles.css";

const cookies = new Cookies();

const HomeAdmin = (prop) => {
  const AdminUseCase1 = () => {
    // Functionality for viewing instructor details
  };

  const AdminUseCase2 = () => {
    // Functionality for submitting grades of a student
  };

  const AdminUseCase3 = () => {
    // Functionality for expelling a student from the course
  };

  // logout
  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    window.location.href = "/";
  };
  return (
    <>
      <h2 className="text-gray-50 text-center">
        SO BEAUTIFUL, SO ELEGANT, JUST LOOKING LIKE A WOW
      </h2>
      <h2 className="text-gray-50 text-center">STUDENT HU MEN STUDENT</h2>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-nav">
          <button onClick={AdminUseCase1}>Use Case 1</button>
          <button onClick={AdminUseCase2}>Use Case 2</button>
          <button onClick={AdminUseCase3}>Use Case 3</button>
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

export default HomeAdmin;
