import React, { useReducer } from "react";
import axios from "axios";
import CCcontext from "./context";
import CCreducer from "./reducer";
import {
  SET_CURRENCY_INFO,
  SET_LOADING,
  SET_CONVERTING,
  SET_CONVERTED_VALUE,
} from "./Types";
import { currencyCountryList, AUDrates } from "../constants";

const apiKey = "2i2k88YXhmiknOb1jgNxHQZX7mmqSQb3";

const CCaction = (props: { children: React.ReactNode }) => {
  const initialState = {
    currencyInfo: {},
    loading: false,
    currencyCountryList,
    isConverting: false,
    convertedValue: null,
  };
  const [state, dispatch] = useReducer(CCreducer, initialState);

  const setLoading = (value: boolean) =>
    dispatch({ type: SET_LOADING, payload: value });
  const setCurrencyInfo = (value: {}) =>
    dispatch({ type: SET_CURRENCY_INFO, payload: value });
  const setConverting = (value: boolean) =>
    dispatch({ type: SET_CONVERTING, payload: value });
  const setConvetedValueFn = (value: number) =>
    dispatch({ type: SET_CONVERTED_VALUE, payload: value });

  async function fethCurrencyInfoFn(
    amount: number,
    from: string | number,
    to: string | number
  ) {
    setLoading(true);

    let res = null;
    let rateObj = null;

    try {
      res = await axios.get(
        `https://api.apilayer.com/exchangerates_data/latest?base=${from}&apikey=${apiKey}`
      );
      rateObj = res?.data?.rates;
    } catch (error) {
      rateObj = AUDrates;
      console.log("Free API limit exceeded");
    }

    setCurrencyInfo(rateObj);
    setConvetedValueFn(rateObj[to] * amount);
  }

  async function fetchConvertValueFn(
    amount: number,
    from: string | number,
    to: string | number
  ) {
    setConverting(true);
    try {
      let res = await axios.get(
        `https://api.apilayer.com/exchangerates_data/convert?apikey=${apiKey}&to=${to}&from=${from}&amount=${amount}`
      );
      setConvetedValueFn(res.data.result);
    } catch (error) {
      console.log("Free API limit exceeded");
    }
  }

  return (
    <CCcontext.Provider
      value={{
        currencyCountryList,
        loading: state.loading,
        currencyInfo: state.currencyInfo,
        fethCurrencyInfoFn,
        isConverting: state.isConverting,
        convertedValue: state.convertedValue,
        fetchConvertValueFn,
        setConvetedValueFn,
      }}
    >
      {props.children}
    </CCcontext.Provider>
  );
};

export default CCaction;
