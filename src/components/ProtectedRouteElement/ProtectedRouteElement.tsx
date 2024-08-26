import React, { useEffect, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { setValue } from "../../services/reducers/ResetPassword";
import { RootState } from "../../services/reducers/store"; // Adjust the import according to your store structure

interface ProtectedRouteElementProps {
  children: ReactNode;
}

const allowedPaths = ["/login", "/register", "/forgot-password", "/"];

const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({
  children,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.resetPasswordSlice.statusAuth
  );
  const from = useSelector((state: RootState) => state.resetPasswordSlice.from);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setValue({ from: location.pathname }));
    }
  }, [location, isAuthenticated, dispatch]);

  if (!isAuthenticated && !allowedPaths.includes(location.pathname)) {
    console.log("REDIRECT TO LOGIN");
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // if (isAuthenticated && from && from !== location.pathname) {
  //   console.log(`REDIRECT TO ${from} ${location.pathname}`);

  //   return <Navigate to={from} replace />;
  // }

  return <>{children}</>;
};
export default ProtectedRouteElement;
