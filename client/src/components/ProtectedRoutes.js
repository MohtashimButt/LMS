import { Route, Navigate } from 'react-router-dom';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const ProtectedRoutes = ({ component: Component, ...rest }) => {
  const token = cookies.get("TOKEN");
  console.log("WHATS IN THE TOKEN?");
  console.log(token);
  return (
    token ? <Component /> : <Navigate to="/" state={{ from: rest.location }} />
  );
}

export default ProtectedRoutes;