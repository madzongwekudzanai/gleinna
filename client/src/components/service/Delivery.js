import React from "react";
import process_1 from "../../img/icon/process_1.svg";
import process_2 from "../../img/icon/process_2.svg";
import process_4 from "../../img/icon/process_4.svg";

const Delivery = () => {
  return (
    <section className="deliverie_process section_padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-sm-10">
            <div className="section_tittle">
              <h2>
                World Wide <br />
                <span>Deliveries Process</span>
              </h2>
              <p>
                Effectiveness is the foundation for success.
                <br /> Efficiency is the foundation for survival.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-sm-6">
            <div className="single_deliverie_process">
              <img src={process_1} alt="Services" />
              <h4>Trucks 50%</h4>
              <p>
                Your trusted business partner for Container Logistics and
                General Haulage{" "}
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="single_deliverie_process">
              <img src={process_2} alt="Services" />
              <h4>Air 25%</h4>
              <p>
                Your trusted business partner for Container Logistics and
                General Haulage{" "}
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-12">
            <div className="single_deliverie_process">
              <img src={process_4} alt="Services" />
              <h4>Ship 25%</h4>
              <p>
                Your trusted business partner for Container Logistics and
                General Haulage{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Delivery;
