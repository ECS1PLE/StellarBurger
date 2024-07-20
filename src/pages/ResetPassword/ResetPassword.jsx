import styles from "./ResetPassword.module.scss";
import PageHeader from "../../components/AppMain/PageHeader/PageHeader";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import HelpUser from "../../components/AppMain/HelpUser/HelpUser";
import { useDispatch } from "react-redux";
import { setValue } from "../../services/reducers/ResetPassword";
import { newPassword } from "../../services/actions/ResetPasswordThunk";

const ResetPassword = () => {
  const [password, setPassword] = React.useState("");
  const onChangePass = (e) => {
    setPassword(e.target.value);
  };

  const [name, setName] = React.useState("");
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const dispatch = useDispatch();

  const handleResetPassword = () => {
    dispatch(setValue({ password: password, token: name }));
    dispatch(newPassword({ password, token: name }));
  };
  return (
    <div className={`${styles.EnterBlock}  ${styles.registerBlock}`}>
      <div className={`${styles.MainEnterBlock} mb-20`}>
        <PageHeader HeaderText="Восстановление пароля" />
        <PasswordInput
          onChange={onChangePass}
          value={password}
          name={"password"}
          extraClass="mb-2"
        />
        <Input
          onChange={onChangeName}
          value={name}
          name={"email"}
          placeholder="Введите код из письма"
        />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleResetPassword}
        >
          Восстановить
        </Button>
      </div>
      <div className={styles.HelpUser}>
        <div>
          <HelpUser
            question="Вспомнили пароль?"
            LinkTo="/login"
            LinkText="Войти"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
