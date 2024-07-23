import styles from "./App.module.scss";
import Header from "../AppHeader/Header/Header";
import store from "../../services/reducers/store";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../../pages/AppMain/Main";
import Login from "../../pages/AppLogin/Login";
import Register from "../../pages/AppRegister/Register";
import ForgetPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Profile from "../../pages/AppProfile/Profile";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import { IngridientDetails } from "../Dialogs/IngridientDetails/IngridientDetails";
import ModalDialog from "../Dialogs/ModalDialog/ModalDialog";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Enter } from "../../services/reducers/ResetPassword";
import { setValue } from "../../services/reducers/ResetPassword";

const AppContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

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
          accessToken: accessToken,
          refreshToken: refreshToken,
          email: email,
          password: password,
          name: name,
          statusAuth: statusAuth,
        })
      );
    } else {
      Cookies.remove("accessToken");
    }

    console.log(accessToken);
    console.log(refreshToken);
    console.log(email);
    console.log(password);
    console.log(name);
    console.log(statusAuth);
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className={styles.main__content}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />}>
            <Route
              path="/ingredients/:id"
              element={
                <ProtectedRouteElement>
                  <ModalDialog open={isOpen} onClose={() => setIsOpen(false)}>
                    <IngridientDetails />
                  </ModalDialog>
                </ProtectedRouteElement>
              }
            />
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
        </Routes>
      </main>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
