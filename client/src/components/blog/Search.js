import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchPosts } from "../../actions/post";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Aside from "./Aside";
import Breadcrumb from "../layout/Breadcrumb";
import Moment from "react-moment";

const Category = ({
  match,
  searchPosts,
  post: { searchedPosts, searchLoading },
}) => {
  useEffect(() => {
    searchPosts(match.params.term);
  }, [searchPosts]);
  return (
    <Fragment>
      <Breadcrumb title="search results" />
      <section className="blog_area blog_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="blog_left_sidebar">
                {searchLoading && searchedPosts.length <= 0 ? (
                  <Spinner />
                ) : !searchLoading && searchedPosts.length === 0 ? (
                  <h2>Sorry results for {`"${match.params.term}"`}</h2>
                ) : (
                  searchedPosts.map(
                    ({
                      _id,
                      largeImage,
                      title,
                      text,
                      category,
                      comments,
                      date,
                    }) => (
                      <article key={_id} className="blog_item">
                        <div className="blog_item_img">
                          <img
                            className="card-img rounded-0"
                            src={`/blog/${largeImage}`}
                            alt={title}
                          />
                          <Link to={`/blog/${_id}`} className="blog_item_date">
                            <h3>
                              <Moment format="DD">{date}</Moment>
                            </h3>
                            <p>
                              <Moment format="MMM">{date}</Moment>
                            </p>
                          </Link>
                        </div>

                        <div className="blog_details">
                          <Link to={`/blog/${_id}`} className="d-inline-block">
                            <h2 className="trunk-1">{title}</h2>
                          </Link>
                          <p className="trunk-2">{text}</p>
                          <ul className="blog-info-link">
                            <li>
                              <Link to={`/categories/${category}`}>
                                <i className="far fa-user"></i> {category}
                              </Link>
                            </li>
                            <li>
                              <Link to={`/blog/${_id}`}>
                                <i className="far fa-comments"></i>{" "}
                                {comments.length}{" "}
                                {comments.length === 1 ? (
                                  <Fragment>Comment</Fragment>
                                ) : comments.length === 0 ? (
                                  <Fragment>Comments</Fragment>
                                ) : (
                                  <Fragment>Comments</Fragment>
                                )}
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </article>
                    )
                  )
                )}
              </div>
            </div>
            <Aside />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Category.propTypes = {
  post: PropTypes.object.isRequired,
  searchPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { searchPosts })(Category);
