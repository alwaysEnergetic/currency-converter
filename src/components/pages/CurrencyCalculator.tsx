import React, { useContext } from "react";
import CurrencyConverterContext from "../../service/context";

export const CurrencyCalculator = () => {
  const CurrencyConverterCont = useContext(CurrencyConverterContext);
  return (
    <>
      <div>Home</div>
    </>
  );
};
export default CurrencyCalculator;
