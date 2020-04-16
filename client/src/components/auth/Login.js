import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

const Login = ({ auth: { isAuthenticated }, login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  const onFocus = (e) => {
    e.target.placeholder = "";
  };
  const onBlur = (e, text) => {
    e.target.placeholder = text;
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      {isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <section className="contact-section blog_padding">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="contact-title">Sign in</h2>
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
                            onBlur(e, "Enter Your Password");
                          }}
                          placeholder="Enter Your Password"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <input
                          className="form-control"
                          name="password"
                          type="password"
                          value={password}
                          onChange={(e) => {
                            onChange(e);
                          }}
                          onFocus={(e) => onFocus(e)}
                          onBlur={(e) => {
                            onBlur(e, "Enter Your Password");
                          }}
                          placeholder="Enter Your Password"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <button
                      type="submit"
                      className="button button-contactForm btn_4"
                    >
                      login
                    </button>
                  </div>
                  <p className="pb-5">
                    Forgot your password <Link to="/reset">Reset</Link>
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

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
