import styles from "./ResetPassword.module.scss";
import PageHeader from "../../components/AppMain/PageHeader/PageHeader";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import HelpUser from "../../components/AppMain/HelpUser/HelpUser";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "../../services/reducers/ResetPassword";
import { newPassword } from "../../services/actions/ResetPasswordThunk";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../services/reducers/store";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const navigate = useNavigate();

  const TokenToReset = useSelector(
    (state: RootState) => state.resetPasswordSlice.resetToken
  );

  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (!TokenToReset) {
      navigate("/forgot-password");
    }
  }, [TokenToReset, navigate]);

  const dispatch = useDispatch();

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setValue({ password, token: name }));
    dispatch(newPassword({ password, token: name }));
  };

  return (
    <div className={`${styles.EnterBlock} ${styles.registerBlock}`}>
      <div className={`${styles.MainEnterBlock} mb-20`}>
        <PageHeader HeaderText="Восстановление пароля" />
        <form onSubmit={handleResetPassword}>
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

export default ResetPassword;
