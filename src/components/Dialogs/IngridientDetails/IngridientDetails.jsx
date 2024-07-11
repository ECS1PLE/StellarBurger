import PropTypes from "prop-types";
import styles from "./IngridientDetails.module.scss";
import InfoBlock from "../InfoBlock/InfoBLock";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

const detailKeys = {
  calories: "Калории,ккал",
  proteins: "Белки, г",
  fat: "Жиры, г",
  carbohydrates: "Углеводы, г",
};

const requierdFields = ["name", "price", "type", "image"];

const IngridientDetails = ({ id }) => {
  const ingredientInfoSelector = createSelector(
    [(ingridient) => ingridient],
    (ingridient) => {
      const info = {
        id: id,
        image: "",
        name: "",
        price: 0,
        type: "",
        energy: [],
      };
      if (ingridient) {
        requierdFields.forEach((key) => (info[key] = ingridient[key]));
        info.energy = Object.keys(detailKeys).reduce((prev, cur) => {
          if (!prev) {
            prev = {};
          }
          prev[cur] = {
            name: detailKeys[cur],
            value: ingridient?.[cur] || 0,
          };
          return { ...prev };
        }, {});
      }
      return info;
    }
  );
  const ingredientInfo = ingredientInfoSelector(
    useSelector((state) =>
      state.burgerIngredients.ingredients.find((item) => item._id == id)
    )
  );

  return (
    <>
      <div className={`${styles.modalTitle} mt-10 ml-10 mr-10`}>
        <p>Детали ингредиента</p>
        {/* <CloseModal onClose={props.onClose} /> */}
      </div>
      <div className={`${styles.modalBody} mb-15`}>
        <img src={ingredientInfo.image} alt={ingredientInfo.name}></img>
        <h3 className="mt-4 mb-8">{ingredientInfo.name}</h3>
        <div className={`${styles.infoIngredient} ${styles.flex}`}>
          {Object.keys(ingredientInfo.energy).map((key, index) => (
            <InfoBlock key={index} {...ingredientInfo.energy[key]} />
          ))}
        </div>
      </div>
    </>
  );
};

IngridientDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export { IngridientDetails };
