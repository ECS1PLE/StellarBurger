// constructorReducer.test.ts
import { constructorReducer } from "../reducers/BurgerConstructor";

describe("constructorReducer", () => {
  const initialState = {
    ingredients: [],
    orderItems: [],
    order: null,
  };

  it("should handle 'load_ingridients' action", () => {
    const action = {
      type: "load_ingridients",
      payload: [
        { id: "1", name: "Lettuce", quantity: 5 },
        { id: "2", name: "Tomato", quantity: 10 },
      ],
    };
    const expectedState = {
      ...initialState,
      ingredients: action.payload,
    };
    expect(constructorReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle 'add_order_item' action", () => {
    const action = {
      type: "add_order_item",
      payload: { id: "1", name: "Cheese", quantity: 2 },
    };
    const stateWithIngredients = {
      ...initialState,
      orderItems: [],
    };
    const expectedState = {
      ...stateWithIngredients,
      orderItems: [action.payload],
    };
    expect(constructorReducer(stateWithIngredients, action)).toEqual(
      expectedState
    );
  });

  it("should handle 'remove_order_item' action", () => {
    const action = {
      type: "remove_order_item",
      payload: { id: "1" },
    };
    const stateWithItems = {
      ...initialState,
      orderItems: [{ id: "1", name: "Cheese", quantity: 2 }],
    };
    const expectedState = {
      ...stateWithItems,
      orderItems: [],
    };
    expect(constructorReducer(stateWithItems, action)).toEqual(expectedState);
  });

  it("should handle 'add_order_from_api' action", () => {
    const action = {
      type: "add_order_from_api",
      payload: { id: "order1", status: "completed" },
    };
    const expectedState = {
      ...initialState,
      order: action.payload,
    };
    expect(constructorReducer(initialState, action)).toEqual(expectedState);
  });

  it("should return the current state for an unknown action type", () => {
    const action = {
      type: "unknown_action",
      payload: {},
    };
    expect(constructorReducer(initialState, action)).toEqual(initialState);
  });
});
