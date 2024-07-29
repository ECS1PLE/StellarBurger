import styles from "./Login.module.scss";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import HelpUser from "../../components/AppMain/HelpUser/HelpUser";
import PageHeader from "../../components/AppMain/PageHeader/PageHeader";
import { Enter } from "../../services/actions/Login";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "../../services/reducers/ResetPassword";
import { useNavigate } from "react-router";

const Login = () => {
  const statusAuth = useSelector(
    (state) => state.resetPasswordSlice.statusAuth
  );

  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = React.useState("");
  const onChangePass = (e) => {
    setPassword(e.target.value);
  };

  const dispatch = useDispatch();
  const from = useSelector((state) => state.resetPasswordSlice.from);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(setValue({ email: email, password: password }));
    dispatch(Enter());
  };

  useEffect(() => {
    if (statusAuth && from) {
      navigate(from);
    }

    if (statusAuth && !from) {
      navigate("/");
    }
  }, [statusAuth, navigate, from]);

  return (
    <>
      <div className={styles.EnterBlock}>
        <div className={`${styles.MainEnterBlock} mb-20`}>
          <PageHeader HeaderText="Войти" />
          <form onSubmit={handleLogin}>
            <EmailInput
              onChange={onChangeEmail}
              value={email}
              name={"email"}
              isIcon={false}
            />
            <PasswordInput
              onChange={onChangePass}
              value={password}
              name={"password"}
              extraClass="mb-2"
            />
            <Button htmlType="submit" type="primary" size="large">
              Войти
            </Button>
          </form>
        </div>
        <div className={styles.HelpUser}>
          <div>
            <HelpUser
              question="Вы — новый пользователь?"
              LinkTo="/register"
              LinkText="Зарегестрироваться"
            />
          </div>
          <div>
            <HelpUser
              question="Забыли пароль?"
              LinkTo="/forgot-password"
              LinkText="Восстановить"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
