import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import logo from "../../img/logo.jpg";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Header = ({ history, logout, auth: { isAuthenticated, loading } }) => {
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setSearching(true);
  };
  const [expandNav, setExpandNav] = useState(false);
  const [showDrop, setShowDrop] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const toggleNavbar = () => {
    setExpandNav(!expandNav);
  };
  const toggleDrop = () => {
    setShowDrop(!showDrop);
  };
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setExpandNav(false);
  };
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  useEffect(() => {
    history.listen((location, action) => {
      // location is an object like window.location

      setActiveLink(`${location.pathname}`);
    });
  }, [activeLink, history]);
  if (searching) {
    return <Redirect to={`/blog/searchResults/${search}`} />;
  }
  return (
    <header id="back-to-top" className="main_menu home_menu">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <nav className="navbar navbar-expand-lg navbar-light">
              <Link className="navbar-brand" to="/">
                {" "}
                <img src={logo} alt="logo" />{" "}
              </Link>
              <button
                onClick={toggleNavbar}
                className="navbar-toggler"
                type="button"
              >
                <span className="menu_icon"></span>
              </button>

              <div
                className={`navbar-collapse main-menu-item collapse ${
                  expandNav ? "show" : null
                }`}
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      onClick={toggleNavbar}
                      className={`nav-link ${
                        activeLink === "/" ? "active_color" : null
                      }`}
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      onClick={toggleNavbar}
                      className={`nav-link ${
                        activeLink === "/about" ? "active_color" : null
                      }`}
                      to="/about"
                    >
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      onClick={toggleNavbar}
                      className={`nav-link ${
                        activeLink === "/services" ? "active_color" : null
                      }`}
                      to="/services"
                    >
                      Services
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      onClick={toggleNavbar}
                      className={`nav-link ${
                        activeLink === "/blog" ? "active_color" : null
                      }`}
                      to="/blog"
                    >
                      blog
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      onClick={toggleNavbar}
                      className={`nav-link ${
                        activeLink === "/contact" ? "active_color" : null
                      }`}
                      to="/contact"
                    >
                      Contact
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      onClick={toggleDrop}
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                    >
                      Account
                    </a>
                    {!loading && (
                      <div
                        style={{ display: showDrop ? "block" : "none" }}
                        className="dropdown-menu"
                      >
                        {isAuthenticated ? (
                          <a
                            onClick={() => {
                              logout();
                            }}
                            className="dropdown-item"
                          >
                            {" "}
                            logout
                          </a>
                        ) : (
                          <Fragment>
                            <Link
                              to="/register"
                              onClick={toggleNavbar}
                              className="dropdown-item"
                            >
                              {" "}
                              register
                            </Link>
                            <Link
                              to="/login"
                              onClick={toggleNavbar}
                              className="dropdown-item"
                            >
                              Login
                            </Link>
                          </Fragment>
                        )}
                      </div>
                    )}
                  </li>
                </ul>
              </div>
              <a id="search_1" onClick={toggleSearch}>
                <i className="ti-search"></i>
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div
        className="search_input"
        style={{ display: showSearch ? "block" : "none" }}
        id="search_input_box"
      >
        <div className="container ">
          <form
            onSubmit={(e) => onSubmit(e)}
            className="d-flex justify-content-between search-inner"
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search Here"
              required
              name="search"
              value={search}
              onChange={(e) => {
                onChange(e);
              }}
            />
            <button type="submit" className="btn"></button>
            <span
              onClick={toggleSearch}
              className="ti-close"
              id="close_search"
              title="Close Search"
            ></span>
          </form>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logout })(withRouter(Header));
