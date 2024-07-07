import styles from "./InfoBlock.module.scss";
import PropTypes from "prop-types";

const InfoBlock = (props) => {
  return (
    <div className={styles.Infoblock}>
      <h3>{props.name}</h3>
      <p>{props.value}</p>
    </div>
  );
};

InfoBlock.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default InfoBlock;
