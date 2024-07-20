import PropTypes from "prop-types";
import styles from "./IngridientDetails.module.scss";
import InfoBlock from "../InfoBlock/InfoBLock";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useParams } from "react-router";

const detailKeys = {
  calories: "Калории,ккал",
  proteins: "Белки, г",
  fat: "Жиры, г",
  carbohydrates: "Углеводы, г",
};

const requierdFields = ["name", "price", "type", "image"];

const IngridientDetails = () => {
  const { id } = useParams();
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
      console.log("SELF SELECTOR");
      console.log(`ID = ${id}`);
      console.log(ingridient);
      console.log("SELF SELECTOR");
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

  const inf = useSelector((state) =>
    state.burgerIngredients.ingredients.find((item) => item._id === id)
  );
  console.log(inf);

  if (!inf) {
    return <div>Ошибка</div>;
  }

  // console.log(inf);

  // useEffect(() => {
  //   console.log(ingredientInfo);
  //   console.log(id);
  //   console.log();
  // });

  return (
    <>
      <div className={`${styles.modalTitle} mt-10 ml-10 mr-10`}>
        <p>Детали ингредиента</p>
        {/* <CloseModal onClose={props.onClose} /> */}
      </div>
      <div className={`${styles.modalBody} mb-15`}>
        <img src={inf.image} alt={inf.name} />
        <h3 className="mt-4 mb-8">{inf.name}</h3>
        <div className={`${styles.infoIngredient} ${styles.flex}`}>
          {Object.keys(detailKeys)
            .filter((key) => key in inf)
            .map((key, index) => (
              <InfoBlock key={index} name={detailKeys[key]} value={inf[key]} />
            ))}
        </div>
      </div>
    </>
  );
};

IngridientDetails.propTypes = {
  id: PropTypes.string,
};

export { IngridientDetails };
