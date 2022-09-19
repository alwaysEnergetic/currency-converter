/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Loader } from "../layout";
import CurrencyConverterContext from "../../service/context";

export const CurrencyCalculator = () => {
  const {
    loading,
    fethCurrencyInfoFn,
    currencyCountryList = {},
    isConverting,
    convertedValue,
    fetchConvertValueFn,
    setConvetedValueFn,
  } = useContext(CurrencyConverterContext);

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("AUD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [searchTxt, setSearchTxt] = useState("");

  useEffect(() => {
    if (fethCurrencyInfoFn)
      fethCurrencyInfoFn(amount, fromCurrency, toCurrency);
  }, []);

  const setAmountFn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAmount(parseInt(value));
    // @ts-ignore
    setConvetedValueFn(0);
  };

  const setToCurrencyFn = (toCurrency: string) => {
    setToCurrency(toCurrency);
    // @ts-ignore
    setConvetedValueFn(0);
  };

  const setFromCurrencyFn = (fromCurrency: string) => {
    setFromCurrency(fromCurrency);
    fetchConvertValueFn(amount, fromCurrency, toCurrency);
  };

  const swapCurrencyFn = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    fetchConvertValueFn(amount, fromCurrency, toCurrency);
  };

  const renderCurrencyDropdown = (
    value: string,
    setValue: {
      (fromCurrency: any): void;
      (toCurrency: any): void;
      (arg0: string): void;
    },
    id: string | undefined
  ) => {
    const options = [
      <input
        key="currency-input"
        type="text"
        className="form-control m-2 dropdown-search"
        placeholder="Search"
        value={searchTxt}
        onChange={(e) => {
          let { value } = e.target;
          setSearchTxt(value);
        }}
      ></input>,
    ];

    for (const [key, value] of Object?.entries(currencyCountryList)) {
      if (key.toLowerCase().includes(searchTxt.toLowerCase())) {
        options.push(
          <span
            className="dropdown-item"
            onClick={(e) => {
              e.preventDefault();
              setValue(key);
            }}
            key={key}
          >
            <img
              src={`https://flagcdn.com/48x36/${value.toLowerCase()}.png`}
              alt="flag"
            />
            &nbsp; &nbsp; &nbsp;
            {key}
          </span>
        );
      }
    }

    let imgSrc = "";
    if (Object.keys(currencyCountryList).length) {
      imgSrc = `https://flagcdn.com/48x36/${currencyCountryList[
        value
      ].toLowerCase()}.png`;
    }

    return (
      <div className="dropdown show select-box">
        <span
          className="btn dropdown-toggle"
          id="currency-dropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img src={imgSrc} alt="flag" />
          &nbsp; &nbsp; &nbsp;
          {value}
        </span>
        <div
          data-testid="currency-dropdown-menu"
          className="dropdown-menu"
          aria-labelledby={id}
        >
          {options}
        </div>
      </div>
    );
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <div
        data-testid="currency-calculator"
        className="card p-4 mx-2 CurrencyCalculator-wrapper"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setSearchTxt("");
        }}
      >
        <div className="card-header header">Currency Converter</div>
        <form action="#">
          <div className="amount">
            <p>Enter Amount</p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmountFn(e)}
            />
          </div>
          <div className="drop-list">
            <div className="from">
              <p>From</p>
              <div className="dropdown show select-box">
                {renderCurrencyDropdown(
                  fromCurrency,
                  setFromCurrencyFn,
                  "fromCurrency"
                )}
              </div>
            </div>
            <div className="icon px-4">
              <i
                className="fas fa-exchange-alt"
                onClick={() => swapCurrencyFn()}
              ></i>
            </div>
            <div className="to">
              <p>To</p>
              <div className="dropdown show select-box">
                {renderCurrencyDropdown(
                  toCurrency,
                  setToCurrencyFn,
                  "toCurrency"
                )}
              </div>
            </div>
          </div>
          <div className="exchange-rate" key={convertedValue}>
            Value : &nbsp;
            <span className={isConverting ? "fs-10" : ""}>
              {isConverting
                ? "Getting exchange rate..."
                : convertedValue?.toFixed(5)}
            </span>
          </div>
          <button
            className={amount === 0 ? "disabled" : ""}
            title={amount === 0 ? "Please enter amount greater than 0" : ""}
            disabled={amount === 0}
            onClick={() =>
              amount !== 0
                ? fetchConvertValueFn(amount, fromCurrency, toCurrency)
                : ""
            }
          >
            Convert
          </button>
        </form>
      </div>
    </>
  );
};
export default CurrencyCalculator;
