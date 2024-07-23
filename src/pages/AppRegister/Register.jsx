import styles from "./Register.module.scss";
import PageHeader from "../../components/AppMain/PageHeader/PageHeader";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import HelpUser from "../../components/AppMain/HelpUser/HelpUser";
import { setValue } from "../../services/reducers/ResetPassword";
import { registerAcc } from "../../services/actions/Register";
import { useDispatch } from "react-redux";

const Register = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(setValue({ email: email, name: name }));
    dispatch(registerAcc());
  };

  return (
    <div className={`${styles.EnterBlock} ${styles.registerBlock}`}>
      <div className={`${styles.MainEnterBlock} mb-20`}>
        <PageHeader HeaderText="Регистрация" />
        <form onSubmit={handleResetPassword}>
          <Input
            onChange={(e) => setName(e.target.value)}
            value={name}
            name={"name"}
            placeholder="Имя"
            inputMode="text"
          />
          <EmailInput
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"email"}
          />
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name={"password"}
            extraClass="mb-2"
          />
          <Button htmlType="submit" type="primary" size="large">
            Зарегистрироваться
          </Button>
        </form>
      </div>
      <div className={styles.HelpUser}>
        <HelpUser
          question="Уже зарегистрированы?"
          LinkTo="/login"
          LinkText="Войти"
        />
      </div>
    </div>
  );
};

export default Register;
