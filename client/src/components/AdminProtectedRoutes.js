import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const AdminProtectedRoutes = ({ component: Component, ...rest }) => {
  const token = cookies.get("AdminTOKEN");
  return token ? (
    <Component />
  ) : (
    <Navigate to="/" state={{ from: rest.location }} />
  );
};

export default AdminProtectedRoutes;
