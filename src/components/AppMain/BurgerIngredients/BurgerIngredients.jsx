import styles from "./BurgerIngredients.module.scss";
import CustomTab from "../CustomTab/CustomTab";
import Ingredient from "../Ingredient/Ingridient";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { IngridientDetails } from "../../Dialogs/IngridientDetails/IngridientDetails";
import ModalDialog from "../../Dialogs/ModalDialog/ModalDialog";
import { useDispatch, useSelector } from "react-redux";
import { loadIngridients } from "../../../services/reducers/BurgerIngredientsSlice";
import { useInView } from "react-intersection-observer";

const ingridientTypes = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

const BuildBurger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("one");
  const [selectedDetail, setSelectedDetail] = useState("");

  const { ref: refBun, inView: inViewBun } = useInView({
    threshold: 0.2,
  });
  const { ref: refSauce, inView: inVuewSauce } = useInView({
    threshold: 0.2,
  });
  const { ref: refMain, inView: inViewMain } = useInView({
    threshold: 0.2,
  });

  const refs = {
    bun: refBun,
    sauce: refSauce,
    main: refMain,
  };

  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );

  const orderItems = useSelector((state) => state.OrderSlice.orderItems);

  const dispatcher = useDispatch();

  useEffect(() => {
    if (inViewBun) {
      setActiveTab("bun");
    } else if (inVuewSauce) {
      setActiveTab("sauce");
    } else if (inViewMain) {
      setActiveTab("main");
    }
  }, [inViewBun, inVuewSauce, inViewMain]);

  //const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      fetch(`${import.meta.env.VITE_API_URL}/ingredients`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Ошибка сервера");
          }
          return response.json();
        })
        .then((data) => {
          dispatcher(
            loadIngridients(
              data?.data?.map((item) => ({ ...item, balance: item.price }))
            )
          );
        })
        .catch((error) => {
          console.error("Ошибка: ", error);
        });
    };
    if (!ingredients?.length) {
      //console.log(state);

      fetchData();
    }
  }, [dispatcher, ingredients]);

  return (
    <>
      {isOpen && (
        <ModalDialog open={isOpen} onClose={() => setIsOpen(false)}>
          <IngridientDetails id={selectedDetail} />
        </ModalDialog>
      )}
      <div className={styles.BuildBurger}>
        <div className={styles.topContentBuild}>
          <h2>Соберите бургер</h2>
          <CustomTab active={activeTab} setActive={setActiveTab} />
        </div>
        <div className={styles.mainIngridientsBlock}>
          {Object.keys(ingridientTypes).map((key) => (
            <div
              className={styles.bottomContentBuild}
              id={key}
              key={key}
              ref={refs[key]}
            >
              <h2>{ingridientTypes[key]}</h2>
              <div className={`${styles.Bread} pl-4 pr-4 pb-10`}>
                {ingredients
                  .filter((item) => item.type == key)
                  .map((item) => (
                    <div
                      className={styles.IngredientBlock}
                      key={item._id}
                      onClick={() => {
                        setSelectedDetail(item._id);
                        setIsOpen(true);
                      }}
                    >
                      <Counter
                        count={
                          item.balance -
                          orderItems.filter(
                            (orderItem) => orderItem.id == item._id
                          ).length
                        }
                        size="default"
                        extraClass="m-1"
                      />
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
