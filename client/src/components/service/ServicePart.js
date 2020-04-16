import React, { useState, useEffect } from "react";
import service_1 from "../../img/icon/service_1.svg";
import service_2 from "../../img/icon/service_2.svg";
import service_3 from "../../img/icon/service_3.svg";
import service_4 from "../../img/icon/service_4.svg";
import { withRouter, Link } from "react-router-dom";

const ServicePart = ({ history }) => {
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  useEffect(() => {
    history.listen((location, action) => {
      // location is an object like window.location

      setActiveLink(`${location.pathname}`);
    });
  }, [activeLink, history]);
  return (
    <section
      className={`service_part ${
        activeLink === "/services" ? "single_page_service" : null
      }`}
    >
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="service_text">
              <h2>
                Gleinna Investments <br />
                <span> Services Offerings </span>
              </h2>
              <p>
                Gleinna offers experienced and comprehensive help for a range of
                trucking and logistics management needs and seeks to help our
                clients achieve their goals. Quality of service is at the heart
                of what we passionately do!
              </p>
              <p>
                Our service offerings can be categorised into three broad
                categories namely; Freight clearing, road transport service and
                logistics management. We have summarised the various services
                under each category below. Our business development team is
                happy to discuss with you each service and what entails. Our
                service offering includes;
              </p>
              <Link to="/services" className="btn_1">
                learn more
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="single_service_text">
              <img src={service_1} alt="Service Image 1" />
              <h4 className="trunk-1">Container Clearing</h4>
              <p>
                We specialise in the providing container & general haulage
                services in Jersey, Zimbabwe, Zambia, and South Africa.{" "}
              </p>
            </div>
            <div className="single_service_text">
              <img src={service_2} alt="Service Image 2" />
              <h4 className="trunk-1">Freight Clearing</h4>
              <p>
                With the support of reputable clearing agents we are able to
                assist with arranging of all border documents between different
                countries.{" "}
              </p>
            </div>
            <div className="single_service_text">
              <img src={service_3} alt="Service Image 3" />
              <h4 className="trunk-1">Container Transport</h4>
              <p>
                We have an ever-expanding fleet trucks. These trucks are of
                various sized heavy duty trucks and different configurations of
                trailers.{" "}
              </p>
            </div>
            <div className="single_service_text">
              <img src={service_4} alt="Service Image 3" />
              <h4 className="trunk-1">Cargo Transport</h4>
              <p>
                We operate a range of flat-deck, bulk sided super links aand
                tri-axle trailers. The fleet is kept in good condition at all
                times.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withRouter(ServicePart);
