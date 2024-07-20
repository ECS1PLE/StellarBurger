import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";

const allowedPaths = [
  "/login",
  "/register",
  "/reset-password",
  "/forgot-password",
];

const ProtectedRouteElement = ({ children }) => {
  const navigation = useNavigate();
  const location = useLocation();

  console.log(location);

  const isAuthenticated = useSelector(
    (state) => state.resetPasswordSlice.statusAuth
  );

  useEffect(() => {
    if (!isAuthenticated && !allowedPaths.includes(location.pathname)) {
      navigation("/login");
    }
  }, [isAuthenticated, navigation, location]);

  return children;
};

ProtectedRouteElement.propTypes = {
  children: PropTypes.element,
  path: PropTypes.string,
};
export default ProtectedRouteElement;
