import store, { RootState } from "../reducers/store";
import { addToOrder, clearOrder } from "../reducers/OrderSlice";
import { setValue } from "../reducers/ResetPassword";
import { clearOrder as clearUserOrder } from "../reducers/UserOrders";

describe("Redux Store", () => {
  test("should return the initial state", () => {
    const state: RootState = store.getState();

    expect(state.burgerIngredients.ingredients).toEqual([]);
    expect(state.OrderSlice.orderItems).toEqual([]);
    expect(state.resetPasswordSlice.error).toBeNull();
    expect(state.UserOrders.details).toBeNull();
  });

  test("order slice", () => {
    const orderItem = { orderItemId: "1", orderItemNo: 1 };

    store.dispatch(addToOrder(orderItem));
    let state = store.getState().OrderSlice;
    expect(state.orderItems).toHaveLength(1);

    store.dispatch(clearOrder());
    state = store.getState().OrderSlice;
    expect(state.orderItems).toHaveLength(0);
  });

  test("reset password slice", () => {
    const updates = { email: "example@test.com", password: "12345" };

    store.dispatch(setValue(updates));
    const state = store.getState().resetPasswordSlice;
    expect(state.email).toBe(updates.email);
    expect(state.password).toBe(updates.password);
  });

  test("user orders slice", () => {
    // Assuming you have a mock order response here
    const mockOrder = { id: "1", items: [], total: 100, status: "done" };

    store.dispatch(clearUserOrder());
    const state = store.getState().UserOrders;
    expect(state.details).toBeNull();
  });
});
