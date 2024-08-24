import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Header.module.scss";
import MenuItem from "../MenuItem/MenuItem";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className={`p-4 ${styles.header}`}>
      <div className={styles.headerContent}>
        <div className={styles.leftMenu}>
          <Link to="/">
            <div
              className={`${styles.MenuItemContent} p-5 ${
                location.pathname === "/" ? styles.Active : styles.notActive
              }`}
            >
              <BurgerIcon type="primary" />
              <MenuItem text="Конструктор" />
            </div>
          </Link>
          <Link to="/orders">
            <div
              className={`${styles.MenuItemContent} p-5 ${
                location.pathname === "/orders"
                  ? styles.Active
                  : styles.notActive
              }`}
            >
              <ListIcon type="primary" />
              <MenuItem text="Лента заказов" />
            </div>
          </Link>
        </div>
        <div className={styles.headerLogo}>
          <Logo />
        </div>
        <div className={styles.rightMenu}>
          <Link to="/profile">
            <div
              className={`${styles.MenuItemContent} p-5 ${
                location.pathname === "/profile"
                  ? styles.Active
                  : styles.notActive
              }`}
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
