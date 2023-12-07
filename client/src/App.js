import './App.css';
import {Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import HomeAdmin from './components/homeAdmin';
import HomeStudent from './components/homeStudent';
import HomeInstrcutor from './components/homeInstructor';
import FreeComponent from "./FreeComponent";
import AuthComponent from "./AuthComponent";
import ProtectedRoutes from "./components/ProtectedRoutes";
import StudentProtectedRoutes from "./components/StudentProtectedRoutes";
import InstructorProtectedRoutes from './components/InstructorProtectedRoutes';
import AdminProtectedRoutes from './components/AdminProtectedRoutes';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import Cookies from "universal-cookie";

const cookies = new Cookies();

function App() {
  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  }
  return (
    
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/free" element={<FreeComponent />} />
          <Route path="/auth" element={<ProtectedRoutes component={AuthComponent} />} />
          <Route path="/homeAdmin" element={<AdminProtectedRoutes component={HomeAdmin} />} />
          <Route path="/homeStudent" element={<StudentProtectedRoutes component={HomeStudent} />} />
          <Route path="/homeInstructor" element={<InstructorProtectedRoutes component={HomeInstrcutor} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;