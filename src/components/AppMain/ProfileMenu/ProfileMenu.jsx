import styles from "./ProfileMenu.module.scss";
import { LogOut } from "../../../services/actions/LogOut";
import { useDispatch } from "react-redux";
import { setValue } from "../../../services/reducers/ResetPassword";

const ProfileMenu = () => {
  const dispatch = useDispatch();

  const handleResetPassword = () => {
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
        <div className={`${styles.ProfileBlock} ${styles.activeProfileBlock}`}>
          <p>Профиль</p>
        </div>
        <div className={styles.ProfileBlock}>
          <p>История заказов</p>
        </div>
        <div className={styles.ProfileBlock} onClick={handleResetPassword}>
          <p>Выход</p>
        </div>
      </div>
      <p className={`mt-20 ${styles.mark}`}>
        В этом разделе вы можете
        <br />
        изменить свои персональные данные
      </p>
    </>
  );
};

export default ProfileMenu;
