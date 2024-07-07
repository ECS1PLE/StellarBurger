import styles from "./MenuItem.module.scss";

function MenuItem(props) {
  return (
    <div className={styles.MenuItem}>
      <p>{props.text}</p>
    </div>
  );
}

export default MenuItem;
