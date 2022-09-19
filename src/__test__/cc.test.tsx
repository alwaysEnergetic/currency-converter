import React from "react";
import ReactDOM from "react-dom";
import { act, render, cleanup, fireEvent } from "@testing-library/react";
import { Loader } from "../components/layout";
// import { CurrencyCalculator } from "../components/pages/";
// import App from "../App";

/* Test cases 
1. After load , On updating amount , value should also update
2. On click of convert , Value should update
3. On click of swap , From currency and to currency should update
4. Selection of currency from fromCurrency dropdown
5. Selection of currency from toCurrency dropdown  */

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Loader />, div);
});

// it("is a test definition", async () => {
//   // notice the async
//   await act(async () => {
//     render(<CurrencyCalculator />);
//   });
// });

// test("Simulates selection", () => {
//   const { getByTestId, getAllByTestId } = render(<App />);
//   fireEvent.change(getByTestId("currency-dropdown-menu"), {
//     target: { value: 2 },
//   });
//   let options = getAllByTestId("select-option");
//   expect(options[0].selected).toBeFalsy();
//   expect(options[1].selected).toBeTruthy();
//   expect(options[2].selected).toBeFalsy();
// });
