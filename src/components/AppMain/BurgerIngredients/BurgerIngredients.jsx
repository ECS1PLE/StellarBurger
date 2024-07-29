import styles from "./BurgerIngredients.module.scss";
import CustomTab from "../CustomTab/CustomTab";
import Ingredient from "../Ingredient/Ingridient";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import ModalDialog from "../../Dialogs/ModalDialog/ModalDialog";
import { useDispatch, useSelector } from "react-redux";
import { resetError } from "../../../services/reducers/BurgerIngredientsSlice";
import { useInView } from "react-intersection-observer";
import { ingridientsThunk } from "../../../services/actions/IngridientsThunk";
import { useLocation } from "react-router";

const ingridientTypes = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

const BuildBurger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("one");
  const [selectedDetail, setSelectedDetail] = useState("");
  const location = useLocation();

  const { ref: refBun, inView: inViewBun } = useInView({ threshold: 0.2 });
  const { ref: refSauce, inView: inViewSauce } = useInView({ threshold: 0.2 });
  const { ref: refMain, inView: inViewMain } = useInView({ threshold: 0.2 });

  const refs = { bun: refBun, sauce: refSauce, main: refMain };

  const orderItems = useSelector((state) => state.OrderSlice.orderItems);

  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );
  const loadingError = useSelector(
    (state) => state.burgerIngredients.ingredientsError
  );
  const dispatcher = useDispatch();

  useEffect(() => {
    if (inViewBun) {
      setActiveTab("bun");
    } else if (inViewSauce) {
      setActiveTab("sauce");
    } else if (inViewMain) {
      setActiveTab("main");
    }
  }, [inViewBun, inViewSauce, inViewMain]);

  useEffect(() => {
    if (!ingredients?.length) {
      dispatcher(ingridientsThunk());
    }
  }, [ingredients, dispatcher]);

  useEffect(() => {
    if (location.pathname.startsWith("/ingredients/")) {
      setIsOpen(true);
      setSelectedDetail(location.pathname.split("/")[2]);
    }
  }, [location]);

  const handleIngredientClick = (id) => {
    setIsOpen(true);
    setSelectedDetail(id);
  };

  return (
    <>
      {loadingError?.length > 0 && (
        <ModalDialog onClose={() => dispatcher(resetError())}>
          <div>{loadingError}</div>
        </ModalDialog>
      )}
      {/* {isOpen && (
        <ModalDialog open={isOpen} onClose={() => setIsOpen(false)}>
          <IngridientDetails id={selectedDetail} />
        </ModalDialog>
      )} */}
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
              <div className={`${styles.Bread} pl-4 pr-4 pb-10}`}>
                {(ingredients || [])
                  .filter((item) => item.type === key)
                  .map((item) => (
                    <div
                      className={styles.IngredientBlock}
                      key={item._id}
                      onClick={() => handleIngredientClick(item._id)}
                    >
                      <Counter
                        count={orderItems.reduce((acc, orderItem) => {
                          if (orderItem.id === item._id) {
                            acc++;
                          }
                          return acc;
                        }, 0)}
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
