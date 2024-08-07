import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { setValue } from "../../services/reducers/ResetPassword";

const allowedPaths = ["/login", "/register", "/forgot-password", "/"];

const ProtectedRouteElement = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state) => state.resetPasswordSlice.statusAuth
  );

  const from = useSelector((state) => state.resetPasswordSlice.from);
  console.log(from);
  console.log(location.pathname);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setValue({ from: location.pathname }));
    }
  }, [location, isAuthenticated, dispatch]);

  if (!isAuthenticated && !allowedPaths.includes(location.pathname)) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (isAuthenticated && from && from !== location.pathname) {
    return <Navigate to={from} replace />;
  }

  return children;
};

ProtectedRouteElement.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRouteElement;
