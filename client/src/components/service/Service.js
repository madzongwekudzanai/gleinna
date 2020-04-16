import React, { Fragment } from "react";
import Breadcrumb from "../layout/Breadcrumb";
import ServicePart from "./ServicePart";
import CtaArea from "./CtaArea";
import Delivery from "./Delivery";

const Service = () => {
  return (
    <Fragment>
      <Breadcrumb title="services" />
      <ServicePart />
      <CtaArea />
      <Delivery />
    </Fragment>
  );
};

export default Service;
