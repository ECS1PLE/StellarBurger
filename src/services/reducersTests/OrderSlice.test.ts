import reducer, {
  addToOrder,
  removeFromOrder,
  moveItem,
  makeOrder,
  addInfo,
  clearOrder,
  resetOrderError,
  initialState,
} from "../reducers/OrderSlice"; // Убедитесь, что путь правильный

describe("OrderSlice reducer", () => {
  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle addToOrder", () => {
    const newOrderItem = { orderItemId: "1", orderItemNo: 1 };
    const action = addToOrder(newOrderItem);
    const state = reducer(initialState, action);
    expect(state.orderItems).toEqual([newOrderItem]);
  });

  it("should handle removeFromOrder", () => {
    const initialStateWithItem = {
      ...initialState,
      orderItems: [{ orderItemId: "1", orderItemNo: 1 }],
    };
    const action = removeFromOrder("1");
    const state = reducer(initialStateWithItem, action);
    expect(state.orderItems).toEqual([]);
  });

  it("should handle moveItem", () => {
    const initialStateWithItems = {
      ...initialState,
      orderItems: [
        { orderItemId: "1", orderItemNo: 1 },
        { orderItemId: "2", orderItemNo: 2 },
      ],
    };
    const action = moveItem({
      from: { orderItemId: "1", orderItemNo: 1 },
      to: { orderItemId: "2", orderItemNo: 2 }, // нет изменений здесь
    });
    const state = reducer(initialStateWithItems, action);
    expect(state.orderItems).toEqual([
      { orderItemId: "1", orderItemNo: 1 }, // Не меняется
      { orderItemId: "2", orderItemNo: 2 }, // Здесь также остается прежнее значение
    ]);
  });

  it("should handle makeOrder", () => {
    const payload = { id: "12345", total: 200 };
    const action = makeOrder(payload);
    const state = reducer(initialState, action);
    expect(state.order).toEqual(payload);
  });

  it("should handle addInfo", () => {
    const payload = { key: "value" };
    const action = addInfo(payload);
    const state = reducer(initialState, action);
    expect(state.info).toEqual(payload);
  });

  it("should handle clearOrder", () => {
    const currentState = {
      orderItems: [{ orderItemId: "1", orderItemNo: 1 }],
      order: { id: "123" },
      orderLoading: false,
      orderError: "",
    };
    const action = clearOrder();
    const state = reducer(currentState, action);
    expect(state.orderItems).toEqual([]);
    expect(state.order).toEqual({});
  });

  it("should reset order error", () => {
    const currentState = { ...initialState, orderError: "Some error" };
    const action = resetOrderError();
    const state = reducer(currentState, action);
    expect(state.orderError).toEqual("");
  });
});
