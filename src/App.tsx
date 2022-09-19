import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurrencyConverterState from "./service/actions";

import { Header, Footer } from "./components/layout";
import { CurrencyCalculator, NotFound } from "./components/pages";

const App = () => {
  return (
    <CurrencyConverterState>
      <Router>
        <Header title="Currency Converter" />
        <Routes>
          <Route path="/" element={<CurrencyCalculator />} />
          <Route element={<NotFound />} />
        </Routes>
      </Router>
      <Footer title="Currency Converter" />
    </CurrencyConverterState>
  );
};

export default App;
