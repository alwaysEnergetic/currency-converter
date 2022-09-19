import { createContext } from "react";

type props = {
  loading: boolean;
  currencyInfo: object;
  currencyCountryList: { [key: string]: any };
  isConverting: boolean;
  convertedValue: number;
  fethCurrencyInfoFn: (
    amount: number,
    from: string | number,
    to: string | number
  ) => void;
  fetchConvertValueFn: (
    amount: number,
    from: string | number,
    to: string | number
  ) => void;
  setConvetedValueFn: (value: number | any) => void;
};

const context = createContext({} as props);
export default context;
