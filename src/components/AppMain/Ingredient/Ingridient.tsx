import styles from "./Ingredient.module.scss";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useLocation, useNavigate } from "react-router";

interface IngredientProps {
  image: string;
  price: number;
  name: string;
  _id?: string;
}

const Ingredient = (props: IngredientProps) => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleClick = () => {
    navigate(`/ingredients/${props._id}`, { state: { background: location } });
  };

  return (
    <>
      <div
        ref={dragSource}
        className={`${styles.Ingredient} pr-4 rl-4 ${
          isDragging ? "IsDragging" : ""
        }`}
        onClick={handleClick}
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
export default Ingredient;
