import {
  SET_CURRENCY_INFO,
  SET_LOADING,
  SET_CONVERTING,
  SET_CONVERTED_VALUE,
} from "./Types";
export default (state: any, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case SET_CURRENCY_INFO:
      return { ...state, currencyInfo: action.payload, loading: false };
    case SET_LOADING:
      return { ...state, loading: true };
    case SET_CONVERTING:
      return { ...state, isConverting: true };
    case SET_CONVERTED_VALUE:
      return { ...state, convertedValue: action.payload, isConverting: false };
    default:
      return state;
  }
};
