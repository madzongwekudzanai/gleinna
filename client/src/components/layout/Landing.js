import React, { Fragment } from "react";
import Banner from "./Banner";
import AboutPart from "../about/AboutPart";
import ServicePart from "../service/ServicePart";
import CtaArea from "../service/CtaArea";
import Delivery from "../service/Delivery";
import GetQuote from "../about/GetQuote";
import Bottom from "../blog/Bottom";

const Landing = () => {
  return (
    <Fragment>
      <Banner />
      <AboutPart />
      <ServicePart />
      <CtaArea />
      <Delivery />
      <GetQuote />
      <Bottom />
    </Fragment>
  );
};

export default Landing;
