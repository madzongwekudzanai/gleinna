import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import rightArrow from "../../img/icon/right-arrow.svg";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import axios from "axios";

const Banner = ({ setAlert }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/contact/newsletter", {
        email,
      });
      setLoading(false);
      setAlert("Thank you, your email has been sent", "success", 10000);
      setEmail("");
    } catch (error) {
      setLoading(false);
      setAlert("Sorry, something went wrong", "danger");
    }
  };
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const getYear = () => {
    return new Date().getFullYear();
  };
  return (
    <section className="banner_part">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="banner_text">
              <div className="banner_text_iner">
                <h1>
                  Your Trusted <br />
                  Business Partner
                </h1>
                <p>
                  For Container Logistics <br />
                  and General Haulage{" "}
                </p>
                <div class="form-wrap" id="mc_embed_signup">
                  <form onSubmit={(e) => onSubmit(e)} class="banner-form">
                    <input
                      style={{
                        height: "60px",
                        borderRadius: "0",
                        border: "0",
                        fontSize: "16px",
                      }}
                      class="form-control"
                      disabled={loading ? true : false}
                      value={email}
                      onChange={(e) => onChange(e)}
                      name="email"
                      placeholder="Subscribe To Our Newsletter"
                      onFocus={(e) => {
                        e.target.placeholder = "";
                      }}
                      onBlur={(e) => {
                        e.target.placeholder = "Your Email Address";
                      }}
                      required
                      type="email"
                    />
                    <button
                      disabled={loading ? true : false}
                      type={loading ? "button" : "submit"}
                      class="btn btn-default text-uppercase"
                      style={{
                        height: "60px",
                        width: "60px",
                        borderRadius: "0",
                        border: "0",
                        fontSize: "25px",
                        backgroundColor: "#f6a515",
                        color: "#fff",
                      }}
                    >
                      {!loading ? (
                        <i className="far fa-paper-plane"></i>
                      ) : (
                        <Fragment>
                          <span class="spinner-border" role="status"></span>{" "}
                        </Fragment>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="pick_up_text">
            <div className="pickup_text_iner">
              <p>Gleinna Investments {getYear()}</p>
              <h3>Get in Touch Here</h3>
            </div>
            <Link to="/contact">
              <div className="pickup_text_arrow">
                <img src={rightArrow} alt="right arrow" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Banner.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Banner);
