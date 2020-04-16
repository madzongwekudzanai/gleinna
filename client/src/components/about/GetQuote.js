import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { Link } from "react-router-dom";
import axios from "axios";

const GetQuote = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    departure: "",
    arrival: "",
    description: "",
    method: "",
  });
  const { name, email, departure, arrival, description, method } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/contact/quote", {
        name,
        email,
        departure,
        arrival,
        description,
        method,
      });
      setAlert("Thank you, a quote will be emailed to you.", "success", 10000);
      setFormData({
        name: "",
        email: "",
        departure: "",
        arrival: "",
        description: "",
        method: "",
      });
    } catch (error) {
      setAlert("Sorry, something went wrong", "danger");
    }
  };
  const onFocus = (e) => {
    e.target.placeholder = "";
  };
  const onBlur = (e, text) => {
    e.target.placeholder = text;
  };
  return (
    <section className="regervation_part section_padding">
      <div className="container">
        <div className="row d-flex align-items-center justify-content-between">
          <div className="col-lg-5 col-md-6">
            <div className="regervation_part_iner">
              <h2>Get A Quote</h2>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      onChange={(e) => {
                        onChange(e);
                      }}
                      required
                      name="name"
                      value={name}
                      type="text"
                      className="form-control"
                      onFocus={(e) => onFocus(e)}
                      onBlur={(e) => {
                        onBlur(e, "Name");
                      }}
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      onChange={(e) => {
                        onChange(e);
                      }}
                      required
                      name="email"
                      value={email}
                      type="text"
                      className="form-control"
                      onFocus={(e) => onFocus(e)}
                      onBlur={(e) => {
                        onBlur(e, "Email or phone");
                      }}
                      placeholder="Email or phone"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      onChange={(e) => {
                        onChange(e);
                      }}
                      required
                      type="text"
                      name="departure"
                      value={departure}
                      className="form-control"
                      onFocus={(e) => onFocus(e)}
                      onBlur={(e) => {
                        onBlur(e, "Departure");
                      }}
                      placeholder="Departure"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      onChange={(e) => {
                        onChange(e);
                      }}
                      required
                      name="arrival"
                      value={arrival}
                      type="text"
                      className="form-control"
                      onFocus={(e) => onFocus(e)}
                      onBlur={(e) => {
                        onBlur(e, "Arrival");
                      }}
                      placeholder="Arrival"
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <div className="input-group date">
                      <input
                        onChange={(e) => {
                          onChange(e);
                        }}
                        required
                        name="description"
                        value={description}
                        type="text"
                        className="form-control"
                        onFocus={(e) => onFocus(e)}
                        onBlur={(e) => {
                          onBlur(e, "Cargo Description");
                        }}
                        placeholder="Cargo Description"
                      />
                    </div>
                  </div>
                  <div className="form-group time_icon col-md-12">
                    <input
                      onChange={(e) => {
                        onChange(e);
                      }}
                      required
                      name="method"
                      value={method}
                      type="text"
                      className="form-control"
                      onFocus={(e) => onFocus(e)}
                      onBlur={(e) => {
                        onBlur(e, "Transportation Method");
                      }}
                      placeholder="Transportation Method"
                    />
                  </div>
                </div>
                <div className="regerv_btn">
                  <button type="submit" className="btn_1">
                    GET A QUOTE
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="reservation_text">
              <h2>Do You Need Help?</h2>
              <p>
                Our operations team consists of a dedicated and qualified team
                of Operation Managers, Driver Controllers and Operations Clerks.
              </p>
              <Link to="/contact" className="btn_1">
                contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

GetQuote.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(GetQuote);
