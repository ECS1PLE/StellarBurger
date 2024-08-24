import React from "react";
import styles from "./PageHeader.module.scss";

interface PageHeaderProps {
  HeaderText: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ HeaderText }) => {
  return (
    <>
      <h2 className={styles.HeaderText}>{HeaderText}</h2>
    </>
  );
};

export default PageHeader;
