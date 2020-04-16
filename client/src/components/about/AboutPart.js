import React, { useState, useEffect } from "react";
import about_2 from "../../img/about_2.png";
import { withRouter } from "react-router-dom";

const AboutPart = ({ history }) => {
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  useEffect(() => {
    history.listen((location, action) => {
      // location is an object like window.location

      setActiveLink(`${location.pathname}`);
    });
  }, [activeLink, history]);
  return (
    <section
      className={`about_part ${
        activeLink === "/about" ? "single_about_padding" : "section_padding"
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="about_part_img">
              <h2>about us</h2>
              <img src={about_2} alt="About Image" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="about_part_text">
              <div className="about_text_iner">
                <p>
                  Over the years, we have worked hard to build an efficient and
                  reliable fleet of trucks and develop deep relationships with
                  our staff and service providers to enable us to provide a
                  professional, safe, reliable, efficient and excellent service
                  to our valued clients.
                </p>
                <p>
                  We are proud to have been able to contract with reputable
                  multinational and we currently services various needs locally
                  and internationally within the region but largely on the
                  Beira, Zambia and South Africa routes.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withRouter(AboutPart);
