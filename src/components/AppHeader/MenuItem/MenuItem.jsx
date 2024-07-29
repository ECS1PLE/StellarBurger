import styles from "./MenuItem.module.scss";
import PropTypes from "prop-types";

function MenuItem(props) {
  return (
    <div className={styles.MenuItem}>
      <p>{props.text}</p>
    </div>
  );
}

MenuItem.propTypes = {
  text: PropTypes.string,
};

export default MenuItem;
