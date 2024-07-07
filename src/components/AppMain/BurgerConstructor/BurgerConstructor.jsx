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
      if (bunsInCart?.length > 1) {
        setBunError("В заказ нельзя добавить более двух булок");
        return;
      } else if (
        bunsInCart?.length == 1 &&
        !bunsInCart.find(({ id }) => id == item._id)
      ) {
        setBunError("В заказ нельзя добавить разные булки");
        return;
      }
    }

    if (
      item.balance -
        orderItems.filter((orderItem) => orderItem.id == item._id).length <=
      0
    ) {
      setBunError("Ингридиент закончился");
      return;
    }

    const bunPosition = orderItems.find(
      (orderItem) => orderItem.ingridientType === "bun"
    )
      ? "bottom"
      : "top";

    dispatcher(
      addToOrder({
        orderItemId: uuidv4(),
        orderItemNo: (orderItems.length + 1) * 1000,
        id: item._id,
        ingridientType: item.type,
        text: item.name,
        thumbnail: item.image,
        price: item.price,
        type: item.type === "bun" ? bunPosition : "",
        isLocked: item.type === "bun",
      })
    );
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

  return (
    <>
      {bunError?.length > 0 && (
        <ModalDialog onClose={() => setBunError("")}>
          <div>{bunError}</div>
        </ModalDialog>
      )}
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
                <ConstuctorBlock
                  key={`${structureItem.type} ${item.orderItemId}`}
                  item={item}
                />
                // <div
                //   ref={dragSource}
                //   className={
                //     item.isLocked ? styles.r27 : styles.drgagNdropBlock
                //   }
                //   key={`${structureItem.type} ${item._id} ${index}`}
                //   draggable={true}
                // >
                //   {!item.isLocked && <DragIcon type="primary" />}
                //   <ConstructorElement
                //     key={1}
                //     {...item}
                //     handleClose={() =>
                //       dispatcher(removeFromOrder(item.orderItemId))
                //     }
                //   />
                // </div>
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
