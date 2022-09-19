/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";
import { isMobile } from "react-device-detect";
import CurrencyConverterContext from "../../service/context";

type Props = {
  title: string;
};

const Footer = ({ title }: Props) => {
  const CurrencyConverterCont = useContext(CurrencyConverterContext);

  return (
    <div className="footer text-navy p-1 mt-3 fixed-bottom shadow text-center bg-whitesmoke ">
      <div className={isMobile ? "" : ""}>
        <span>{title}</span> &nbsp;
        <i className="fas fa-copyright"></i> &nbsp;
        <span>{new Date().getFullYear()}</span>
      </div>
    </div>
  );
};

export default Footer;
