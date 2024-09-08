import { MakeReducer } from "../reducers/MakeOrder";

describe("MakeReducer", () => {
  it("should return the initial state", () => {
    const initialState = { count: 0 };
    const action = { type: "UNKNOWN_ACTION" };

    const result = MakeReducer(initialState, action);

    expect(result).toEqual(initialState);
  });

  it("should increment the count", () => {
    const initialState = { count: 0 };
    const action = { type: "INCREMENT", payload: 2 }; // increase by 2

    const result = MakeReducer(initialState, action);

    expect(result).toEqual({ count: 2 });
  });

  it("should increment the count by 1 if no payload is provided", () => {
    const initialState = { count: 3 };
    const action = { type: "INCREMENT" }; // increment by 1

    const result = MakeReducer(initialState, action);

    expect(result).toEqual({ count: 4 });
  });
});
