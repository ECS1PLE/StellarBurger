import React from "react";
import styles from "./InfoBlock.module.scss";

interface InfoBlockProps {
  name: string;
  value: number;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ name, value }) => {
  return (
    <div className={styles.Infoblock}>
      <h3>{name}</h3>
      <p>{value}</p>
    </div>
  );
};

export default InfoBlock;
