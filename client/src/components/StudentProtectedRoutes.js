import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const StudentProtectedRoutes = ({ component: Component, ...rest }) => {
  const token = cookies.get("StudentTOKEN");
  return token ? (
    <Component />
  ) : (
    <Navigate to="/" state={{ from: rest.location }} />
  );
};

export default StudentProtectedRoutes;
