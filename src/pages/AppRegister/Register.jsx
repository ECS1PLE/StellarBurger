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
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const [email, setEmail] = React.useState("");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = React.useState("");
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const dispatch = useDispatch();

  const handleResetPassword = () => {
    dispatch(setValue({ email: email, name: name }));
    dispatch(registerAcc());
  };

  return (
    <>
      <div className={`${styles.EnterBlock} ${styles.registerBlock}`}>
        <div className={`${styles.MainEnterBlock} mb-20`}>
          <PageHeader HeaderText="Регистрация" />{" "}
          <Input
            onChange={onChangeName}
            value={name}
            name={"name"}
            placeholder="Имя"
            inputMode="text"
          />
          <EmailInput onChange={onChangeEmail} value={email} name={"email"} />
          <PasswordInput
            onChange={onChangePassword}
            value={password}
            name={"password"}
            extraClass="mb-2"
          />
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleResetPassword}
          >
            Зарегестрироваться
          </Button>
        </div>
        <div className={styles.HelpUser}>
          <div>
            <HelpUser
              question="Уже зарегистрированы?"
              LinkTo="/login"
              LinkText="Войти"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
