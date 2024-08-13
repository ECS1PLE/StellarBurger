import React, { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import styles from "./HelpUser.module.scss";

interface HelpUserProps {
  question: string;
  LinkTo?: string;
  LinkText?: string;
}

const HelpUser: React.FC<HelpUserProps> = ({ question, LinkTo, LinkText }) => {
  return (
    <>
      <p className={styles.text}>{question}</p>
      {LinkTo && LinkText && <Link to={LinkTo}>{LinkText}</Link>}
    </>
  );
};

export default HelpUser;
