import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Header.module.scss";
import MenuItem from "../MenuItem/MenuItem";

const Header = () => {
  return (
    <header className={`p-4 ${styles.header}`}>
      <div className={styles.headerContent}>
        <div className={styles.leftMenu}>
          <div className={`${styles.MenuItemContent} p-5`}>
            <BurgerIcon type="primary" />
            <MenuItem text="Конструктор" />
          </div>
          <div className={`${styles.MenuItemContent} p-5 ${styles.notActive}`}>
            <ListIcon type="primary " />
            <MenuItem text="Лента заказов" />
          </div>
        </div>
        <div className={styles.headerLogo}>
          <Logo />
        </div>
        <div className={styles.rightMenu}>
          <div className={`${styles.MenuItemContent} p-5 ${styles.notActive}`}>
            <ProfileIcon type="primary " />
            <MenuItem text="Личный кабинет" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
