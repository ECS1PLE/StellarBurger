import styles from "./BurgerConstrucor.module.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToOrder,
  removeFromOrder,
} from "../../../services/reducers/OrderSlice";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import ModalDialog from "../../Dialogs/ModalDialog/ModalDialog";
import ConstuctorBlock from "../ConstructorBlock/ConstructorBlock";

interface OrderItem {
  orderItemId: string;
  orderItemNo: number;
  id: string;
  ingridientType: string;
  text: string;
  thumbnail: string;
  price: number;
  type: string;
  isLocked: boolean;
}

interface BurgerConstructorProps {
  onClose?: () => void;
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = () => {
  const orderItems: OrderItem[] = useSelector(
    (state: any) => state.OrderSlice.orderItems
  );
  const dispatch = useDispatch();

  const constructorStructure = [
    { type: "top", isLocked: true, useParent: false, ingridientType: "bun" },
    { type: "", isLocked: false, useParent: true },
    { type: "bottom", isLocked: true, useParent: false, ingridientType: "bun" },
  ];

  const [bunError, setBunError] = useState("");

  const handleRemoveBun = (type: string) => {
    const bunToRemove = orderItems.find(
      (item) => item.type === type && item.ingridientType === "bun"
    );
    if (bunToRemove) {
      dispatch(removeFromOrder(bunToRemove.orderItemId));
    }
  };

  const onDropNewIngridient = (item: any) => {
    // Update 'any' with a more specific type if needed
    console.log("DROP fired");
    if (item.type === "bun") {
      handleRemoveBun("top");
      handleRemoveBun("bottom");

      if (
        item.balance -
          orderItems.filter((orderItem) => orderItem.id === item._id).length <=
        0
      ) {
        setBunError("Ингридиент закончился");
        return;
      }

      dispatch(
        addToOrder({
          orderItemId: uuidv4(),
          orderItemNo: (orderItems.length + 1) * 1000,
          id: item._id,
          ingridientType: "bun",
          text: `${item.name} (верх)`,
          thumbnail: item.image,
          price: item.price,
          type: "top",
          isLocked: true,
        })
      );

      dispatch(
        addToOrder({
          orderItemId: uuidv4(),
          orderItemNo: (orderItems.length + 1) * 1000,
          id: item._id,
          ingridientType: "bun",
          text: `${item.name} (низ)`,
          thumbnail: item.image,
          price: item.price,
          type: "bottom",
          isLocked: true,
        })
      );
    } else {
      if (
        item.balance -
          orderItems.filter((orderItem) => orderItem.id === item._id).length <=
        0
      ) {
        setBunError("Ингридиент закончился");
        return;
      }

      dispatch(
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
        })
      );
    }
  };

  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: "Ingridient",
      drop: (item: any, monitor) => {
        if (monitor.getItemType() === "Ingridient") {
          onDropNewIngridient(item);
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
      {bunError.length > 0 && (
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
