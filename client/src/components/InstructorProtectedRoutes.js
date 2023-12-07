import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const InstructorProtectedRoutes = ({ component: Component, ...rest }) => {
  const token = cookies.get("InstructorTOKEN");
  return token ? (
    <Component />
  ) : (
    <Navigate to="/" state={{ from: rest.location }} />
  );
};

export default InstructorProtectedRoutes;
