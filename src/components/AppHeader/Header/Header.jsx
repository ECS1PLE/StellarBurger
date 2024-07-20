import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Header.module.scss";
import MenuItem from "../MenuItem/MenuItem";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={`p-4 ${styles.header}`}>
      <div className={styles.headerContent}>
        <div className={styles.leftMenu}>
          <Link to="/">
            <div className={`${styles.MenuItemContent} p-5 ${styles.Active}`}>
              <BurgerIcon type="primary" />
              <MenuItem text="Конструктор" />
            </div>
          </Link>
          <div className={`${styles.MenuItemContent} p-5 ${styles.notActive}`}>
            <ListIcon type="primary " />
            <MenuItem text="Лента заказов" />
          </div>
        </div>
        <div className={styles.headerLogo}>
          <Logo />
        </div>
        <div className={styles.rightMenu}>
          <Link to={`/profile`}>
            <div
              className={`${styles.MenuItemContent} p-5 ${styles.notActive}`}
            >
              <ProfileIcon type="primary" />
              <MenuItem text="Личный кабинет" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
