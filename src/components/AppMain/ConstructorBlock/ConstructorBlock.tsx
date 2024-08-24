import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ConstuctorBlock.module.scss";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  moveItem,
  removeFromOrder,
} from "../../../services/reducers/OrderSlice";
import { useDrag, useDrop } from "react-dnd";
import { RootState } from "../../../services/reducers/store";
import React from "react";

// Define the types for the item prop
interface OrderItem {
  id: string;
  orderItemNo: number;
  ingridientType: string;
  text: string;
  thumbnail: string;
  price: number;
  type: string;
  orderItemId: string;
  isLocked: boolean;
  count?: number;
}

interface ConstuctorBlockProps {
  item: OrderItem;
}

const ConstuctorBlock: React.FC<ConstuctorBlockProps> = ({ item }) => {
  const dispatcher = useDispatch();
  const orderItems = useSelector(
    (state: RootState) => state.OrderSlice.orderItems
  );

  const moveOrderItem = (newItem: OrderItem) => {
    dispatcher(
      moveItem({
        from: newItem,
        to: item,
      })
    );
  };

  const [{ isOver }, dropRef] = useDrop<
    OrderItem,
    OrderItem,
    { isOver: boolean }
  >(
    () => ({
      accept: "ConstructorElement",
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
      drop: (newItem) => moveOrderItem(newItem),
      canDrop: (item) => !item.isLocked,
    }),
    [orderItems, moveOrderItem]
  );

  const [, dragSource] = useDrag<OrderItem, OrderItem, { isDragging: boolean }>(
    () => ({
      type: "ConstructorElement",
      item: item,
      options: {
        dropEffect: "move",
      },
      canDrag: !item.isLocked,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [item]
  );

  const handleClose = (): void => {
    dispatcher(removeFromOrder(item.orderItemId));
  };

  return (
    <div
      ref={dropRef}
      className={`${isOver && !item.isLocked ? styles.OnDragHover : ""}`}
    >
      <div
        ref={dragSource}
        className={item.isLocked ? styles.r27 : styles.drgagNdropBlock}
        draggable={!item.isLocked}
      >
        {!item.isLocked && <DragIcon type="primary" />}
        <ConstructorElement
          key={item.orderItemId}
          {...item}
          handleClose={handleClose} // use the typed handleClose function
        />
      </div>
    </div>
  );
};

export default ConstuctorBlock;
