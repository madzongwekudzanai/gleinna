import React from "react";
import { Link } from "react-router-dom";

const CtaArea = () => {
  return (
    <section className="cta_area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-8">
            <div className="cta_text">
              <h2>International Truck Freight</h2>
              <p>
                We are strong subscribers to the notion of steady fleet growth
                while ensuring the small fleet is always kept in perfect order.{" "}
              </p>
              <Link to="/services" className="cta_btn btn_1">
                view all
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaArea;
