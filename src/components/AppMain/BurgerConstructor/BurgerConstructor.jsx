import styles from "./BurgerConstrucor.module.scss";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BlueTopBread from "/src/images/blueBread.png";
import OrangeSauce from "/src/images/orangeSauce.png";
import undeathMeat from "/src/images/undeathMeat.png";
import falelianPlod from "/src/images/falelianPlod.png";
import mineralRings from "/src/images/mineralRings.png";
import Ingredient from "../Ingredient/Ingridient";

const ingredients = [
  {
    type: "top",
    text: "Краторная булка N-200i (верх)",
    price: 20,
    thumbnail: BlueTopBread,
    isLocked: true,
  },
  {
    text: "Соус традиционный галактический",
    price: 30,
    thumbnail: OrangeSauce,
    isLocked: false,
  },
  {
    text: "Мясо бессмертных моллюсков Protostomia",
    price: 300,
    thumbnail: undeathMeat,
    isLocked: false,
  },
  {
    text: "Плоды Фалленианского дерева",
    price: 80,
    thumbnail: falelianPlod,
    isLocked: false,
  },
  {
    text: "Хрустящие минеральные кольца",
    price: 80,
    thumbnail: mineralRings,
    isLocked: false,
  },
  {
    text: "Хрустящие минеральные кольца",
    price: 80,
    thumbnail: mineralRings,
    isLocked: false,
  },
  {
    text: "Плоды Фалленианского дерева",
    price: 80,
    thumbnail: falelianPlod,
    isLocked: false,
  },
  {
    type: "bottom",
    text: "Краторная булка N-200i (низ)",
    price: 20,
    thumbnail: BlueTopBread,
    isLocked: true,
  },
];

const constructorStructure = [
  { type: "top", isLocked: true, useParent: false },
  { type: "", isLocked: false, useParent: true },
  { type: "bottom", isLocked: true, useParent: false },
];

const BurgerConstructor = () => {
  return (
    <div className={styles.BurgerConstructorBlock}>
      {constructorStructure.map((structureItem, index) => (
        <div
          key={`structure-${structureItem.type}-${index}`}
          className={
            structureItem.useParent ? styles.BurgerMainComponens : styles.r27
          }
        >
          {ingredients
            .filter(
              (item) =>
                item.isLocked == structureItem.isLocked &&
                (!structureItem.type || item.type == structureItem.type)
            )
            .map((item, index) => (
              <div
                className={item.isLocked ? styles.r27 : styles.drgagNdropBlock}
                key={`${structureItem.type}${index}`}
              >
                {!item.isLocked && <DragIcon type="primary" />}
                <ConstructorElement {...item} />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default BurgerConstructor;
