import React from "react";
import PropTypes from "prop-types";

const Breadcrumb = (props) => {
  return (
    <section className="breadcrumb breadcrumb_bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb_iner text-center">
              <div className="breadcrumb_iner_item">
                <h2 className={props.class}>{props.title}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Breadcrumb.propTypes = {
  title: PropTypes.string.isRequired,
  class: PropTypes.string,
};

export default Breadcrumb;
