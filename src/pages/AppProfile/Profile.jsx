import styles from "./Profile.module.scss";
import ProfileMenu from "../../components/AppMain/ProfileMenu/ProfileMenu";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../services/actions/UserInfo";
import { setUserInfo } from "../../services/actions/NewUserInfo";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const HandleClickSave = () => {
    dispatch(
      setUserInfo({
        name: name,
        email: email,
      })
    );
  };

  const HandleClickCancel = () => {
    setName(initialName);
    setEmail(initialEmail);
  };

  const user = useSelector((state) => state.resetPasswordSlice);
  const UserName = useSelector((state) => state.resetPasswordSlice.name);
  console.log(UserName);

  const UserPassword = user.password;
  const UserEmail = user.email;

  const [name, setName] = useState(UserName);
  const [email, setEmail] = useState(UserEmail);
  const [password, setPassword] = useState(UserPassword);

  const [initialName, setInitialName] = useState(UserName);
  const [initialEmail, setInitialEmail] = useState(UserEmail);

  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
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
          onChange={(e) => setName(e.target.value)}
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
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={"password"}
          icon="EditIcon"
        />
        <div className={styles.RedactUser}>
          <Button
            htmlType="button"
            type="secondary"
            size="large"
            onClick={HandleClickCancel}
          >
            Отменить
          </Button>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={HandleClickSave}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
