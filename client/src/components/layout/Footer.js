import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { getCategories } from "../../actions/post";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../layout/Spinner";
import footer_img_1 from "../../img/footer_img/footer_img_1.jpg";
import footer_img_2 from "../../img/footer_img/footer_img_2.jpg";
import footer_img_3 from "../../img/footer_img/footer_img_3.jpg";
import footer_img_4 from "../../img/footer_img/footer_img_4.jpg";
import footer_img_5 from "../../img/footer_img/footer_img_5.jpg";
import footer_img_6 from "../../img/footer_img/footer_img_6.jpg";

const Footer = ({
  setAlert,
  getCategories,
  post: { categories, categoriesLoading },
}) => {
  useEffect(() => {
    getCategories(5);
  }, [getCategories]);
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
    <footer className="footer-area">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-sm-6 ">
            <div className="single-footer-widget footer_1">
              <h4>GLEINNA</h4>
              <p>
                To this end, Gleinna has set out to become the trusted business
                partner to all our valued clients.
              </p>
              <div className="working_hours">
                <p>Working Hours: </p>
                <p>
                  Monday-Friday: <span>8AM - 6PM</span>{" "}
                </p>
                <p>
                  Saturday-Sunday: <span>8AM - 12PM</span>{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6">
            <div className="single-footer-widget">
              <h4>CATEGORIES</h4>
              {categoriesLoading ? (
                <Spinner />
              ) : (
                <ul>
                  {categories.map(({ _id, category }) => (
                    <li key={_id}>
                      <Link to={`/blog/categories/${category}`}>
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="col-xl-3 col-sm-6">
            <div className="single-footer-widget footer_3">
              <h4>Our Gallery</h4>
              <div className="footer_img">
                <div className="single_footer_img">
                  <img src={footer_img_1} alt="" />
                </div>
                <div className="single_footer_img">
                  <img src={footer_img_2} alt="" />
                </div>
                <div className="single_footer_img">
                  <img src={footer_img_3} alt="" />
                </div>
                <div className="single_footer_img">
                  <img src={footer_img_4} alt="" />
                </div>
                <div className="single_footer_img">
                  <img src={footer_img_5} alt="" />
                </div>
                <div className="single_footer_img">
                  <img src={footer_img_6} alt="" />
                </div>
                <div className="single_footer_img">
                  <img src={footer_img_1} alt="" />
                </div>
                <div className="single_footer_img">
                  <img src={footer_img_2} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6">
            <div className="single-footer-widget footer_3 mt_30">
              <h4>Newsletter</h4>
              <p>
                To this end, Gleinna has set out to become the trusted business
                partner to all our valued clients.{" "}
              </p>
              <div className="form-wrap" id="mc_embed_signup">
                <form onSubmit={(e) => onSubmit(e)} className="form-inline">
                  <input
                    className="form-control"
                    name="email"
                    disabled={loading ? true : false}
                    value={email}
                    onChange={(e) => onChange(e)}
                    placeholder="Your Email Address"
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
                    className="btn btn-default text-uppercase"
                  >
                    {!loading ? (
                      <i className="far fa-paper-plane"></i>
                    ) : (
                      <Fragment>
                        <span class="spinner-border" role="status"></span>{" "}
                      </Fragment>
                    )}
                  </button>
                  <div style={{ position: "absolute", left: "-5000px" }}>
                    <input
                      name="b_36c4fd991d266f23781ded980_aefe40901a"
                      tabIndex="-1"
                      value=""
                      type="text"
                    />
                  </div>

                  <div className="info"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="copyright_part_text">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <p className="footer-text m-0">
                      Copyright &copy;{getYear()} All rights reserved | This
                      website was made{" "}
                      <i className="fa fa-heart" aria-hidden="true"></i> by{" "}
                      <a
                        target="_blank"
                        rel="external nofollow noopener noreferrer"
                        href="https://kudzanaimadzongwe.com"
                      >
                        Madzongwe Kudzanai
                      </a>
                    </p>
                  </div>
                  <div className="col-lg-4">
                    <div className="social_icon">
                      <Link to="#">
                        {" "}
                        <i className="ti-facebook"></i>{" "}
                      </Link>
                      <Link to="#">
                        {" "}
                        <i className="ti-twitter-alt"></i>{" "}
                      </Link>
                      <Link to="#">
                        {" "}
                        <i className="ti-instagram"></i>{" "}
                      </Link>
                      <Link to="#">
                        {" "}
                        <i className="ti-skype"></i>{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

Footer.propTypes = {
  setAlert: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { setAlert, getCategories })(Footer);
