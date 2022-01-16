import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getAuthSlice } from "../store/auth";

const ProtectedRoute = ({ children, check, redirectTo }) => {
  const { isAuth } = useSelector(getAuthSlice);
  if (check && !isAuth) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};

export default ProtectedRoute;
