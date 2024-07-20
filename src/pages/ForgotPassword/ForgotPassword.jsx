import styles from "./ForgotPassword.module.scss";
import PageHeader from "../../components/AppMain/PageHeader/PageHeader";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import HelpUser from "../../components/AppMain/HelpUser/HelpUser";
import { resetPassword } from "../../services/actions/ForgotPasswordThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setValue } from "../../services/reducers/ResetPassword";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [value, setVal] = React.useState("");
  const onChange = (e) => {
    setVal(e.target.value);
  };

  const dispatch = useDispatch();

  const handleResetPassword = () => {
    dispatch(setValue(value));
    dispatch(resetPassword(value));
    console.log("Thats work");
    navigate("/reset-password");
  };

  return (
    <div className={`${styles.EnterBlock}  ${styles.registerBlock}`}>
      <div className={`${styles.MainEnterBlock} mb-20`}>
        <PageHeader HeaderText="Восстановление пароля" />
        <EmailInput
          onChange={onChange}
          value={value}
          name={"email"}
          placeholder="Укажите e-mail"
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

export default ForgetPassword;
