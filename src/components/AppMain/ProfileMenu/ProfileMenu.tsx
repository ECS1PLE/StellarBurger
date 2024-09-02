import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./ProfileMenu.module.scss";
import { LogOut } from "../../../services/actions/LogOut";
import { setValue } from "../../../services/reducers/ResetPassword";

import { useAppDispatch } from "../../../services/hooks/hooks";

const ProfileMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleResetPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(LogOut());
    dispatch(
      setValue({
        refreshToken: "",
        statusAuth: false,
        email: "",
        password: "",
        name: "",
        from: "/",
      })
    );
  };

  return (
    <>
      <div className={styles.ProfileBlocks}>
        <Link
          to="/profile"
          className={`${styles.ProfileBlock} ${
            location.pathname === "/profile/" ||
            location.pathname === "/profile"
              ? styles.activeProfileBlock
              : ""
          }`}
        >
          <p>Профиль</p>
        </Link>
        <Link
          to="/profile/orders"
          className={`${styles.ProfileBlock} ${
            location.pathname === "/profile/orders"
              ? styles.activeProfileBlock
              : ""
          }`}
        >
          <p>История заказов</p>
        </Link>
        <div className={styles.ProfileBlock} onClick={handleResetPassword}>
          <p>Выход</p>
        </div>
      </div>
      <p className={`${styles.mark} mt-20`}>
        В этом разделе вы можете <br /> изменить свои персональные данные
      </p>
    </>
  );
};

export default ProfileMenu;
