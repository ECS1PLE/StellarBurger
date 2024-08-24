import styles from "./MenuItem.module.scss";
import React from "react";

interface MenuItemProps {
  text: string;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  return (
    <div className={styles.MenuItem}>
      <p>{props.text}</p>
    </div>
  );
};

export default MenuItem;
