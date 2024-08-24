import React, { ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import styles from "./Register.module.scss";
import PageHeader from "../../components/AppMain/PageHeader/PageHeader";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import HelpUser from "../../components/AppMain/HelpUser/HelpUser";
import { setValue } from "../../services/reducers/ResetPassword";
import { registerAcc } from "../../services/actions/Register";

const Register: React.FC = () => {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const dispatch = useDispatch();

  const handleResetPassword = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(setValue({ email: email, name: name }));
    dispatch(registerAcc());
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <div className={`${styles.EnterBlock} ${styles.registerBlock}`}>
      <div className={`${styles.MainEnterBlock} mb-20`}>
        <PageHeader HeaderText="Регистрация" />
        <form onSubmit={handleResetPassword}>
          <Input
            onChange={handleNameChange}
            value={name}
            name="name"
            placeholder="Имя"
            inputMode="text"
          />
          <EmailInput onChange={handleEmailChange} value={email} name="email" />
          <PasswordInput
            onChange={handlePasswordChange}
            value={password}
            name="password"
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
