import React from "react";
import styles from "./CustomTab.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const CustomTab = () => {
  const [current, setCurrent] = React.useState("one");
  return (
    <div className={styles.flex}>
      <a href="#bun">
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
      </a>
      <a href="#sauce">
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
      </a>
      <a href="#main">
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </a>
    </div>
  );
};

export default CustomTab;
