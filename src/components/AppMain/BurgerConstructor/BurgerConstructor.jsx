import styles from "./BurgerConstrucor.module.scss";
// import { useContext } from "react";
// import { ConstructorContext } from "../../../services/reducers/BurgerConstructor";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addToOrder } from "../../../services/reducers/OrderSlice";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import ModalDialog from "../../Dialogs/ModalDialog/ModalDialog";
// import { useEffect } from "react";
// import { useDrag } from "react-dnd";

import ConstuctorBlock from "../ConstructorBlock/ConstructorBlock";

const BurgerConstructor = () => {
  const orderItems = useSelector((state) => state.OrderSlice.orderItems);
  const dispatcher = useDispatch();

  const constructorStructure = [
    { type: "top", isLocked: true, useParent: false, ingridientType: "bun" },
    { type: "", isLocked: false, useParent: true },
    { type: "bottom", isLocked: true, useParent: false, ingridientType: "bun" },
  ];

  const [bunError, setBunError] = useState("");

  const onDropNewIngridient = (item) => {
    if (item.type === "bun") {
      const bunsInCart = orderItems.filter(
        ({ ingridientType }) => ingridientType == "bun"
      );
      if (bunsInCart?.length > 0) {
        setBunError("В заказ уже добавлена булка");
        return;
      }

      if (
        item.balance -
          orderItems.filter((orderItem) => orderItem.id == item._id).length <=
        0
      ) {
        setBunError("Ингридиент закончился");
        return;
      }

      dispatcher(
        addToOrder({
          orderItemId: uuidv4(),
          orderItemNo: (orderItems.length + 1) * 1000,
          id: item._id,
          ingridientType: "bun",
          text: item.name + (item.type === "top" ? " (низ)" : " (верх)"),
          thumbnail: item.image,
          price: item.price,
          type: "top",
          isLocked: true,
        })
      );

      dispatcher(
        addToOrder({
          orderItemId: uuidv4(),
          orderItemNo: (orderItems.length + 1) * 1000,
          id: item._id,
          ingridientType: "bun",
          text: item.name + (item.type === "top" ? " (верх)" : " (низ)"),
          thumbnail: item.image,
          price: item.price,
          type: "bottom",
          isLocked: true,
        })
      );
    } else {
      if (
        item.balance -
          orderItems.filter((orderItem) => orderItem.id == item._id).length <=
        0
      ) {
        setBunError("Ингридиент закончился");
        return;
      }

      dispatcher(
        addToOrder({
          orderItemId: uuidv4(),
          orderItemNo: (orderItems.length + 1) * 1000,
          id: item._id,
          ingridientType: item.type,
          text: item.name,
          thumbnail: item.image,
          price: item.price,
          type: "",
          isLocked: false,
          count: 1,
        })
      );
    }
  };
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: "Ingridient",
      drop: (item, monitor) => {
        switch (monitor.getItemType()) {
          case "Ingridient":
            onDropNewIngridient(item);
            break;
          case "ConstructorElement":
            //console.log("dsafdsfsdf");
            break;
        }
        return undefined;
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDropNewIngridient, orderItems]
  );

  console.log(orderItems.length);

  return (
    <>
      {bunError?.length > 0 && (
        <ModalDialog onClose={() => setBunError("")}>
          <div>{bunError}</div>
        </ModalDialog>
      )}

      {/* <h2 className={styles.IngredintCounter}>
        Всего в заказе {orderItems.length} ингридиентов
      </h2> */}

      <div
        className={`${styles.BurgerConstructorBlock} ${
          isOver ? styles.BurgerConstructorBlock : ""
        }`}
        ref={dropRef}
      >
        {constructorStructure.map((structureItem, index) => (
          <div
            key={`structure-${structureItem.type}-${index}`}
            className={
              structureItem.useParent ? styles.BurgerMainComponens : styles.r27
            }
          >
            {[...orderItems]
              .sort((prev, curr) => prev.orderItemNo - curr.orderItemNo)
              .filter(
                (item) =>
                  item.type === structureItem.type &&
                  (!structureItem.ingridientType ||
                    item.ingridientType === structureItem.ingridientType)
              )
              .map((item) => (
                <div key={`${item.orderItemId}`}>
                  <ConstuctorBlock item={item} />
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
};
export default BurgerConstructor;

BurgerConstructor.propTypes = {
  onClose: PropTypes.func,
};
