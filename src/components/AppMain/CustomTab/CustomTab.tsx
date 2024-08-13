import React from "react";
import styles from "./CustomTab.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

interface CustomTabProps {
  active?: "bun" | "sauce" | "main"; // Restricting to specific string literals for clarity
  setActive: (tab: "bun" | "sauce" | "main") => void;
}

const CustomTab: React.FC<CustomTabProps> = ({ active = "bun", setActive }) => {
  const handleTabClick =
    (tab: "bun" | "sauce" | "main") =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setActive(tab);
    };

  return (
    <div className={styles.flex}>
      <a href="#bun">
        <Tab
          value="bun"
          active={active === "bun"}
          onClick={handleTabClick("bun")}
          id="bun"
        >
          Булки
        </Tab>
      </a>
      <a href="#sauce">
        <Tab
          value="sauce"
          active={active === "sauce"}
          onClick={handleTabClick("sauce")}
          id="sauce"
        >
          Соусы
        </Tab>
      </a>
      <a href="#main">
        <Tab
          value="main"
          active={active === "main"}
          onClick={handleTabClick("main")}
          id="main"
        >
          Начинки
        </Tab>
      </a>
    </div>
  );
};

export default CustomTab;
