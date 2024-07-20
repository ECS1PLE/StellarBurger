import { Link } from "react-router-dom";
import styles from "./HelpUser.module.scss";
import PropTypes from "prop-types";

const HelpUser = (props) => {
  return (
    <>
      <p className={styles.text}>{props.question}</p>
      <Link to={props.LinkTo}>{props.LinkText}</Link>
    </>
  );
};

HelpUser.propTypes = {
  question: PropTypes.string.isRequired,
  LinkTo: PropTypes.string,
  LinkText: PropTypes.string,
};

export default HelpUser;
