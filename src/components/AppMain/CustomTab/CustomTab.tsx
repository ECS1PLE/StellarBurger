import React from "react";
import styles from "./CustomTab.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

interface CustomTabProps {
  active?: "bun" | "sauce" | "main"; // Restricting to specific string literals for clarity
  setActive: (tab: "bun" | "sauce" | "main") => void;
}

const CustomTab: React.FC<CustomTabProps> = ({ active = "bun", setActive }) => {
  return (
    <div className={styles.flex}>
      <a href="#bun">
        <Tab
          value="bun"
          active={active === "bun"}
          onClick={() => setActive("bun")}
          id="bun"
        >
          Булки
        </Tab>
      </a>
      <a href="#sauce">
        <Tab
          value="sauce"
          active={active === "sauce"}
          onClick={() => setActive("sauce")}
          id="sauce"
        >
          Соусы
        </Tab>
      </a>
      <a href="#main">
        <Tab
          value="main"
          active={active === "main"}
          onClick={() => setActive("main")}
          id="main"
        >
          Начинки
        </Tab>
      </a>
    </div>
  );
};

export default CustomTab;
