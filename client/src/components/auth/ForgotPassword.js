import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";

const ForgotPassword = ({ setAlert, auth }) => {
  const [email, setEmail] = useState("");
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth/forgot", {
        email,
      });
      setAlert(
        "Account reset link has been sent to your email",
        "success",
        10000
      );
      setEmail("");
    } catch (err) {
      setAlert("Invalid credentials", "danger");
    }
  };
  const onFocus = (e) => {
    e.target.placeholder = "";
  };
  const onBlur = (e, text) => {
    e.target.placeholder = text;
  };
  return (
    <Fragment>
      {auth.isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <section className="contact-section blog_padding">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="contact-title">Forgot Your Password</h2>
              </div>
              <div className="col-lg-6">
                <form
                  onSubmit={(e) => onSubmit(e)}
                  className="form-contact contact_form"
                  id="contactForm"
                >
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <input
                          className="form-control"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            onChange(e);
                          }}
                          onFocus={(e) => onFocus(e)}
                          onBlur={(e) => {
                            onBlur(e, "Enter Your Email");
                          }}
                          placeholder="Enter Your Email"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <button
                      type="submit"
                      className="button button-contactForm btn_4"
                    >
                      reset
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-lg-6">
                <div className="media contact-info">
                  <span className="contact-info__icon">
                    <i className="ti-home"></i>
                  </span>
                  <div className="media-body">
                    <h3>Harare, Zimbabwe.</h3>
                    <p>5 Routledge St, MiltonPark</p>
                  </div>
                </div>
                <div className="media contact-info">
                  <span className="contact-info__icon">
                    <i className="ti-tablet"></i>
                  </span>
                  <div className="media-body">
                    <h3>+263 (0) 772 268 008</h3>
                    <p>Mon to Fri 9am to 6pm</p>
                  </div>
                </div>
                <div className="media contact-info">
                  <span className="contact-info__icon">
                    <i className="ti-email"></i>
                  </span>
                  <div className="media-body">
                    <h3>info@gleinna.co.zw</h3>
                    <p>Send us your query anytime!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

ForgotPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(ForgotPassword);
