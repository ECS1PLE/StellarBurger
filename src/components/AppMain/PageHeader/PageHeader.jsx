import styles from "./PageHeader.module.scss";
import PropTypes from "prop-types";

const PageHeader = (props) => {
  return (
    <>
      <h2 className={styles.HeaderText}>{props.HeaderText}</h2>
    </>
  );
};

PageHeader.propTypes = {
  HeaderText: PropTypes.string.isRequired,
};

export default PageHeader;
