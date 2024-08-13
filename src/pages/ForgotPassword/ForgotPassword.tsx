import styles from "./ForgotPassword.module.scss";
import PageHeader from "../../components/AppMain/PageHeader/PageHeader";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { ChangeEvent, FormEvent } from "react";
import HelpUser from "../../components/AppMain/HelpUser/HelpUser";
import { resetPassword } from "../../services/actions/ForgotPasswordThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setValue } from "../../services/reducers/ResetPassword";

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [value, setVal] = React.useState<string>("");
  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const handleResetPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setValue(value));
    dispatch(resetPassword(value));
    navigate("/reset-password");
    dispatch(setValue({ resetToken: true }));
  };

  return (
    <div className={`${styles.EnterBlock} ${styles.registerBlock}`}>
      <div className={`${styles.MainEnterBlock} mb-20`}>
        <PageHeader HeaderText="Восстановление пароля" />
        <form onSubmit={handleResetPassword}>
          <EmailInput
            onChange={onChange}
            value={value}
            name={"email"}
            placeholder="Укажите e-mail"
          />
          <Button htmlType="submit" type="primary" size="large">
            Восстановить
          </Button>
        </form>
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

export default ForgetPassword;
