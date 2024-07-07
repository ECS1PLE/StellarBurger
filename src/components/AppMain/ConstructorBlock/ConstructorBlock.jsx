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

const ConstuctorBlock = ({ item }) => {
  const dispatcher = useDispatch();
  const orderItems = useSelector((state) => state.OrderSlice.orderItems);

  const moveOrderItem = (newItem) => {
    //console.log(orderItems);
    dispatcher(
      moveItem({
        //items: orderItems,
        from: newItem,
        to: item,
      })
    );
  };

  const [{ isOver }, dropRef] = useDrop(
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

  const [, dragSource] = useDrag(
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
    []
  );

  return (
    <div
      ref={dropRef}
      className={`${isOver && !item.isLocked ? styles.OnDragHover : ""}`}
    >
      <div
        ref={dragSource}
        className={item.isLocked ? styles.r27 : styles.drgagNdropBlock}
        draggable={true}
      >
        {!item.isLocked && <DragIcon type="primary" />}
        <ConstructorElement
          key={1}
          {...item}
          handleClose={() => dispatcher(removeFromOrder(item.orderItemId))}
        />
      </div>
    </div>
  );
};

ConstuctorBlock.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.string,
    orderItemNo: PropTypes.number,
    ingridientType: PropTypes.string,
    text: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    type: PropTypes.string,
    orderItemId: PropTypes.string.isRequired,
    isLocked: PropTypes.bool.isRequired,
  }),
};

export default ConstuctorBlock;
