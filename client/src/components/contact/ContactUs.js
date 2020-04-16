import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import axios from "axios";

const ContactUs = ({ setAlert }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { name, email, subject, message } = formData;
  const onFocus = (e) => {
    e.target.placeholder = "";
  };
  const onBlur = (e, text) => {
    e.target.placeholder = text;
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/contact", {
        name,
        email,
        subject,
        message,
      });
      setLoading(false);
      setAlert("Thank you, your email has been sent", "success", 10000);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setLoading(false);
      setAlert("Sorry, something went wrong", "danger");
    }
  };
  return (
    <section className="contact-section blog_padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="contact-title">Get in Touch</h2>
          </div>
          <div className="col-lg-8">
            <form
              className="form-contact contact_form"
              onSubmit={(e) => {
                onSubmit(e);
              }}
            >
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      onChange={(e) => {
                        onChange(e);
                      }}
                      required
                      disabled={loading ? true : false}
                      value={name}
                      className="form-control"
                      name="name"
                      type="text"
                      onFocus={(e) => {
                        onFocus(e);
                      }}
                      onBlur={(e) => {
                        onBlur(e, "Enter your name");
                      }}
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      onChange={(e) => {
                        onChange(e);
                      }}
                      required
                      disabled={loading ? true : false}
                      value={email}
                      className="form-control"
                      name="email"
                      type="email"
                      onFocus={(e) => {
                        onFocus(e);
                      }}
                      onBlur={(e) => {
                        onBlur(e, "Enter email address");
                      }}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <input
                      onChange={(e) => {
                        onChange(e);
                      }}
                      required
                      disabled={loading ? true : false}
                      value={subject}
                      className="form-control"
                      name="subject"
                      type="text"
                      onFocus={(e) => {
                        onFocus(e);
                      }}
                      onBlur={(e) => {
                        onBlur(e, "Enter Subject");
                      }}
                      placeholder="Enter Subject"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <textarea
                      onChange={(e) => {
                        onChange(e);
                      }}
                      value={message}
                      className="form-control w-100"
                      name="message"
                      cols="30"
                      rows="9"
                      onFocus={(e) => {
                        onFocus(e);
                      }}
                      onBlur={(e) => {
                        onBlur(e, "Enter Message");
                      }}
                      placeholder="Enter Message"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="form-group mt-3">
                <button
                  disabled={loading ? true : false}
                  type={loading ? "button" : "submit"}
                  className="button button-contactForm btn_4"
                >
                  {!loading ? (
                    <Fragment>Send Message</Fragment>
                  ) : (
                    <Fragment>
                      <span class="spinner-border" role="status"></span>{" "}
                      Sending...
                    </Fragment>
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-4">
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
  );
};

ContactUs.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(ContactUs);
