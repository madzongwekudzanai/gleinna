import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";

const Register = ({ setAlert, auth }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger", 10000);
    } else {
      try {
        await axios.post("/api/users", {
          name,
          email,
          password,
        });
        setAlert("Account created, please verify your email", "success", 10000);
        setFormData({
          ...formData,
          name: "",
          email: "",
          password: "",
          password2: "",
        });
      } catch (err) {
        setAlert("Invalid credentials", "danger");
      }
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
                <h2 className="contact-title">Create an Account</h2>
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
                          name="name"
                          type="text"
                          value={name}
                          onChange={(e) => {
                            onChange(e);
                          }}
                          onFocus={(e) => onFocus(e)}
                          onBlur={(e) => {
                            onBlur(e, "Enter Your Name");
                          }}
                          placeholder="Enter Your Name"
                        />
                      </div>
                    </div>
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
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          name="password"
                          type="password"
                          value={password}
                          onChange={(e) => {
                            onChange(e);
                          }}
                          required
                          onFocus={(e) => onFocus(e)}
                          onBlur={(e) => {
                            onBlur(e, "Enter your password");
                          }}
                          placeholder="Enter your password"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <input
                          required
                          className="form-control"
                          name="password2"
                          type="password"
                          value={password2}
                          onChange={(e) => {
                            onChange(e);
                          }}
                          onFocus={(e) => onFocus(e)}
                          onBlur={(e) => {
                            onBlur(e, "Confirm your password");
                          }}
                          placeholder="Confirm your password"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <button
                      type="submit"
                      className="button button-contactForm btn_4"
                    >
                      Sign Up
                    </button>
                  </div>
                  <p className="pb-5">
                    Already have an account <Link to="/reset">Login</Link>
                  </p>
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(Register);
