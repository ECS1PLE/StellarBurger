import { describe, expect, test } from "@jest/globals";
import UserOrdersReducer, { clearOrder } from "../reducers/UserOrders";
import { fetchOrderDetails } from "../actions/UserOrders";

// Создаем фиктивные данные для тестов
const mockOrderDetails = {
  id: "123",
  items: [{ name: "Item 1", quantity: 1 }],
  total: 100,
  status: "completed",
};

// Создаем начальное состояние
const initialState = {
  details: null,
  loading: false,
  error: null,
};

describe("UserOrders slice", () => {
  test("should handle initial state", () => {
    expect(UserOrdersReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  test("should handle fetchOrderDetails.pending", () => {
    const action = { type: fetchOrderDetails.pending.type };
    const expectedState = {
      ...initialState,
      loading: true,
      error: null,
    };
    expect(UserOrdersReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle fetchOrderDetails.fulfilled", () => {
    const action = {
      type: fetchOrderDetails.fulfilled.type,
      payload: mockOrderDetails,
    };
    const expectedState = {
      loading: false,
      details: mockOrderDetails,
      error: null,
    };
    expect(UserOrdersReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle fetchOrderDetails.rejected", () => {
    const action = {
      type: fetchOrderDetails.rejected.type,
      payload: "Error fetching order details",
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: "Error fetching order details",
    };
    expect(UserOrdersReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle clearOrder", () => {
    const previousState = {
      details: mockOrderDetails,
      loading: true,
      error: "Some error",
    };
    const action = clearOrder();
    const expectedState = initialState;
    expect(UserOrdersReducer(previousState, action)).toEqual(expectedState);
  });
});
