import React, { Fragment } from "react";
import Breadcrumb from "../layout/Breadcrumb";
import ContactUs from "./ContactUs";

const Contact = () => {
  return (
    <Fragment>
      <Breadcrumb title="contact" />
      <ContactUs />
    </Fragment>
  );
};

export default Contact;
