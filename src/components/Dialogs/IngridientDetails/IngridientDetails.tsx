import React, { useEffect, SyntheticEvent } from "react";
import styles from "./IngridientDetails.module.scss";
import InfoBlock from "../InfoBlock/InfoBLock";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ingridientsThunk } from "../../../services/actions/IngridientsThunk";

interface Ingredient {
  _id: string;
  name: string;
  image: string;
  price: number;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

interface RootState {
  burgerIngredients: {
    ingredients: Ingredient[];
  };
}

const detailKeys: Record<string, string> = {
  calories: "Калории,ккал",
  proteins: "Белки, г",
  fat: "Жиры, г",
  carbohydrates: "Углеводы, г",
};

const IngridientDetails: React.FC = () => {
  const dispatcher = useDispatch();
  const { id } = useParams<{ id: string }>();

  const ingredients = useSelector(
    (state: RootState) => state.burgerIngredients.ingredients
  );

  useEffect(() => {
    if (!ingredients?.length) {
      dispatcher(ingridientsThunk());
    }
  }, [ingredients, dispatcher]);

  const inf = ingredients.find((item) => item._id === id);

  if (!inf) {
    return <div>Ошибка</div>;
  }

  const handleButtonClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    // Пример обработки события
    console.log("Button clicked", event);
  };

  return (
    <div className={styles.flexBlock}>
      <div className={`${styles.modalTitle} mt-10 ml-10 mr-10`}>
        <p>Детали ингредиента</p>
      </div>
      <div className={`${styles.modalBody} mb-15`}>
        <img src={inf.image} alt={inf.name} />
        <h3 className="mt-4 mb-8">{inf.name}</h3>
        <div className={`${styles.infoIngredient} ${styles.flex}`}>
          {Object.keys(detailKeys)
            .filter((key) => key in inf)
            .map((key, index) => (
              <InfoBlock
                key={index}
                name={detailKeys[key]}
                value={inf[key as keyof Ingredient]}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export { IngridientDetails };
