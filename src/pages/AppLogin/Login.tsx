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
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { setValue } from "../../services/reducers/ResetPassword";
import { useNavigate } from "react-router";
import { RootState } from "../../services/reducers/store";

const Login: React.FC = () => {
  const statusAuth = useAppSelector(
    (state: RootState) => state.resetPasswordSlice.statusAuth
  );
  const from = useAppSelector(
    (state: RootState) => state.resetPasswordSlice.from
  );

  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useAppDispatch();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setValue({ email, password }));
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

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className={styles.EnterBlock}>
        <div className={`${styles.MainEnterBlock} mb-20`}>
          <PageHeader HeaderText="Войти" />
          <form onSubmit={handleLogin}>
            <EmailInput
              onChange={onChangeEmail}
              value={email}
              name="email"
              isIcon={false}
            />
            <PasswordInput
              onChange={onChangePass}
              value={password}
              name="password"
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
