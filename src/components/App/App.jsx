import styles from "./App.module.scss";
import Header from "../AppHeader/Header/Header";
import store from "../../services/reducers/store";
import { Provider } from "react-redux";
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
import { useState } from "react";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <>
                <Header />
                <main className={styles.main__content}>
                  <Login />
                </main>
              </>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRouteElement>
                <>
                  <Header />
                  <main className={styles.main__content}>
                    <Main />
                  </main>
                </>
              </ProtectedRouteElement>
            }
          >
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
          <Route
            path="/register"
            element={
              <>
                <Header />
                <main className={styles.main__content}>
                  <Register />
                </main>
              </>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <>
                <Header />
                <main className={styles.main__content}>
                  <ForgetPassword />
                </main>
              </>
            }
          />
          <Route
            path="/reset-password"
            element={
              <>
                <Header />
                <main className={styles.main__content}>
                  <ResetPassword />
                </main>
              </>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRouteElement>
                <>
                  <Header />
                  <main className={styles.main__content}>
                    <Profile />
                  </main>
                </>
              </ProtectedRouteElement>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
