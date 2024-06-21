import styles from "./BurgerIngredients.module.scss";
import CustomTab from "../CustomTab/CustomTab";
import Ingredient from "../Ingredient/Ingridient";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { IngridientDetails } from "../../Dialogs/IngridientDetails/IngridientDetails";

const detailKeys = {
  calories: "Калории,ккал",
  proteins: "Белки, г",
  fat: "Жиры, г",
  carbohydrates: "Углеводы, г",
};

const ingridientTypes = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

const BuildBurger = () => {
  const [showModal, setShowModaL] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState({});

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // fetch("https://norma.nomoreparties.space/api/ingredients")
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setIngredients(data.data);
      //   })
      //   .catch((error) => console.error("Ошибка: ", error));
      fetch("https://norma.nomoreparties.space/api/ingredients")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Ошибка сервера");
          }
          return response.json();
        })
        .then((data) => {
          setIngredients(data.data);
        })
        .catch((error) => {
          console.error("Ошибка: ", error);
        });
    };
    fetchData();
  }, []);

  return (
    <>
      {showModal && (
        <IngridientDetails
          open={showModal}
          onClose={() => setShowModaL(false)}
          {...selectedDetail}
        />
      )}
      <div className={styles.BuildBurger}>
        <div className={styles.topContentBuild}>
          <h2>Соберите бургер</h2>
          <CustomTab />
        </div>
        <div className={styles.mainIngridientsBlock}>
          {Object.keys(ingridientTypes).map((key) => (
            <div className={styles.bottomContentBuild} id={key} key={key}>
              <h2>{ingridientTypes[key]}</h2>
              <div className={`${styles.Bread} pl-4 pr-4 pb-10`}>
                {ingredients
                  .filter((item) => item.type == key)
                  .map((item) => (
                    <div
                      className={styles.IngredientBlock}
                      key={item._id}
                      onClick={() => {
                        setShowModaL(true);
                        setSelectedDetail({
                          image: item.image,
                          name: item.name,
                          info: Object.keys(detailKeys).reduce((prev, cur) => {
                            if (!prev) {
                              prev = {};
                            }
                            prev[cur] = {
                              name: detailKeys[cur],
                              value: item?.[cur] || 0,
                            };
                            return { ...prev };
                          }, {}),
                        });
                      }}
                    >
                      {"price" in item && (
                        <Counter
                          count={item.price}
                          size="default"
                          extraClass="m-1"
                        />
                      )}
                      <Ingredient {...item} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BuildBurger;
