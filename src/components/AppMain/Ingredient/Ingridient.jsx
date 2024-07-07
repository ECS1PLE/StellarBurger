import styles from "./Ingredient.module.scss";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

const Ingredient = (props) => {
  const [{ isDragging }, dragSource] = useDrag(
    () => ({
      type: "Ingridient",
      item: { ...props },
      options: {
        dropEffect: "copy",
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );
  return (
    <>
      <div
        ref={dragSource}
        className={`${styles.Ingredient} pr-4 rl-4 ${
          isDragging ? "IsDragging" : ""
        }`}
      >
        <img src={props.image} alt={props.name} />
        <div className={styles.cost}>
          <p>{props.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p>{props.name}</p>
      </div>
    </>
  );
};

Ingredient.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Ingredient;
