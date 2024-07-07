import PropTypes from "prop-types";
import styles from "./CustomTab.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const CustomTab = ({ active = "bun", setActive }) => {
  //const [current, setCurrent] = React.useState(active);

  return (
    <div className={styles.flex}>
      <a href="#bun">
        <Tab
          value="bun"
          active={active == "bun"}
          onClick={() => setActive("bun")}
          id="bun"
        >
          Булки
        </Tab>
      </a>
      <a href="#sauce">
        <Tab
          value="sauce"
          active={active == "sauce"}
          onClick={() => setActive("sauce")}
          id="sauce"
        >
          Соусы
        </Tab>
      </a>
      <a href="#main">
        <Tab
          value="main"
          active={active == "main"}
          onClick={() => setActive("main")}
          id="main"
        >
          Начинки
        </Tab>
      </a>
    </div>
  );
};

CustomTab.propTypes = {
  active: PropTypes.string,
  setActive: PropTypes.func,
};

export default CustomTab;
