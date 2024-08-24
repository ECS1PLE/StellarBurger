import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import Header from "../AppHeader/Header/Header";
import store from "../../services/reducers/store";
import { Provider, useDispatch } from "react-redux";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import Main from "../../pages/AppMain/Main";
import Login from "../../pages/AppLogin/Login";
import Register from "../../pages/AppRegister/Register";
import ForgetPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Profile from "../../pages/AppProfile/Profile";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import { IngridientDetails } from "../Dialogs/IngridientDetails/IngridientDetails";
import ModalDialog from "../Dialogs/ModalDialog/ModalDialog";
import Cookies from "js-cookie";
import { setValue } from "../../services/reducers/ResetPassword";
import Layout from "./Layout";
import FeedId from "../../pages/FeedId/FeedId";
import ProfileOrders from "../../pages/ProfileOrders/ProfileOrders";
import OrderList from "../../pages/OrderList/OrderList";

interface LocationState {
  background?: Location;
}

const AppContent: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() as { state: LocationState };
  const background = location.state && location.state.background;

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    const email = Cookies.get("email");
    const password = Cookies.get("password");
    const name = Cookies.get("name");
    const statusAuth = Cookies.get("statusAuth");

    if (accessToken) {
      dispatch(
        setValue({
          accessToken,
          refreshToken,
          email,
          password,
          name,
          statusAuth,
        })
      );
    } else {
      Cookies.remove("accessToken");
    }

    console.log(accessToken, refreshToken, email, password, name, statusAuth);
  }, [dispatch]);

  const handleClose = () => {
    setIsOpen(false);
    navigate("/");
  };

  console.log(background);

  return (
    <>
      <Header />
      <main className={styles.main__content}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="/ingredients" element={<Outlet />}>
              <Route
                path=":id"
                element={
                  background ? (
                    <>
                      <Main />
                      <ModalDialog open={isOpen} onClose={handleClose}>
                        <IngridientDetails />
                      </ModalDialog>
                    </>
                  ) : (
                    <IngridientDetails />
                  )
                }
              />
            </Route>
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRouteElement>
                <Profile />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/feed/:orderId"
            element={
              <>
                <OrderList />
                <ModalDialog open={isOpen} onClose={handleClose}>
                  <FeedId />
                </ModalDialog>
              </>
            }
          />
          <Route
            path="/profile/orders"
            element={
              <ProtectedRouteElement>
                <ProfileOrders />
              </ProtectedRouteElement>
            }
          />
          <Route path="/feed" element={<OrderList />} />
          <Route
            path="/profile/orders/:orderId"
            element={
              <ProtectedRouteElement>
                <FeedId />
              </ProtectedRouteElement>
            }
          />
        </Routes>
      </main>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<AppContent />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
