import styles from "./Profile.module.scss";
import ProfileMenu from "../../components/AppMain/ProfileMenu/ProfileMenu";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { getUserInfo } from "../../services/actions/UserInfo";
import { setUserInfo } from "../../services/actions/NewUserInfo";
import { RootState } from "../../services/reducers/store";

interface User {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const handleClickSave = () => {
    dispatch(
      setUserInfo({
        name,
        email,
      })
    );
  };

  const handleClickCancel = () => {
    setName(initialName);
    setEmail(initialEmail);
  };

  const user = useAppSelector((state: RootState) => state.resetPasswordSlice);
  const userName = user.name;
  const userEmail = user.email;

  const [name, setName] = useState<string>(userName);
  const [email, setEmail] = useState<string>(userEmail);
  const [password, setPassword] = useState<string>(user.password);

  const [initialName, setInitialName] = useState<string>(userName);
  const [initialEmail, setInitialEmail] = useState<string>(userEmail);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onIconClick = () => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 0);
    }
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.ProfileContentMain}>
      <div className={styles.LeftProfileContrent}>
        <ProfileMenu />
      </div>
      <div className={styles.RightProfileContrent}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChangeName}
          icon={"EditIcon"}
          value={name}
          name={"name"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          isIcon={true}
        />
        <EmailInput
          onChange={handleChangeEmail}
          value={email}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
        />
        <PasswordInput
          onChange={handleChangePassword}
          value={password}
          name={"password"}
          icon="EditIcon"
        />
        <div className={styles.RedactUser}>
          <Button
            htmlType="button"
            type="secondary"
            size="large"
            onClick={handleClickCancel}
          >
            Отменить
          </Button>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleClickSave}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
