import React from "react";
import PropTypes from "prop-types";

const Paginate = (props) => {
  return (
    <nav className="blog-pagination justify-content-center d-flex">
      <ul className="pagination">
        <li className="page-item">
          <a href="#" className="page-link" aria-label="Previous">
            <i className="ti-angle-left"></i>
          </a>
        </li>
        <li className="page-item">
          <a href="#" className="page-link">
            1
          </a>
        </li>
        <li className="page-item active">
          <a href="#" className="page-link">
            2
          </a>
        </li>
        <li className="page-item">
          <a href="#" className="page-link" aria-label="Next">
            <i className="ti-angle-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

Paginate.propTypes = {};

export default Paginate;
