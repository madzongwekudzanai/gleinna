import React, { Fragment } from "react";
import Breadcrumb from "../layout/Breadcrumb";
import AboutPart from "./AboutPart";
import GetQuote from "./GetQuote";
import Bottom from "../blog/Bottom";

const About = () => {
  return (
    <Fragment>
      <Breadcrumb title="about" />
      <AboutPart />
      <GetQuote />
      <Bottom />
    </Fragment>
  );
};

export default About;
