import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import Aside from "./Aside";
import Spinner from "../layout/Spinner";
import Breadcrumb from "../layout/Breadcrumb";
import SingleComment from "./SingleComment";
import { Link } from "react-router-dom";
import { getPost, addComment, addLike, removeLike } from "../../actions/post";
import { connect } from "react-redux";

const BlogDetail = ({
  addComment,
  addLike,
  auth,
  match,
  getPost,
  singlePost,
  loading,
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [match.params.id]);
  const [body, setBody] = useState("");
  const onChange = (e) => {
    setBody(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addComment(match.params.id, { text: body });
    setBody("");
  };
  return singlePost === null || loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Breadcrumb title={singlePost.title} class="trunk-1" />
      <section className="blog_area single-post-area blog_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 posts-list">
              <div className="single-post">
                <div className="feature-img">
                  <img
                    className="img-fluid"
                    src={`/blog/${singlePost.largeImage}`}
                    alt={singlePost.title}
                  />
                </div>
                <div className="blog_details">
                  <h2>{singlePost.title}</h2>
                  <ul className="blog-info-link mt-3 mb-4">
                    <li>
                      <Link to={`/categories/${singlePost.category}`}>
                        <i className="far fa-user"></i> {singlePost.category}
                      </Link>
                    </li>
                    <li>
                      <a href="#">
                        <i className="far fa-comments"></i>{" "}
                        {singlePost.comments.length}{" "}
                        {singlePost.comments.length === 1
                          ? "Comment"
                          : singlePost.comments.length === 0
                          ? "Comments"
                          : "Comments"}
                      </a>
                    </li>
                  </ul>
                  <p className="excert">{singlePost.text}</p>
                </div>
              </div>
              <div className="navigation-top">
                <div className="d-sm-flex justify-content-between text-center">
                  <p className="like-info">
                    <span className="align-middle">
                      {auth.isAuthenticated ? (
                        <i
                          onClick={() => {
                            if (
                              singlePost.likes.filter(
                                ({ user }) => user === auth.user._id
                              ).length > 0
                            ) {
                              removeLike(singlePost._id);
                            } else {
                              addLike(singlePost._id);
                            }
                          }}
                          className="far fa-heart"
                        ></i>
                      ) : (
                        <i className="far fa-heart"></i>
                      )}
                    </span>{" "}
                    {singlePost.likes.length}{" "}
                    {singlePost.likes.length === 1
                      ? "Person"
                      : singlePost.likes.length === 0
                      ? "People"
                      : "People"}{" "}
                    liked this post
                  </p>
                  <div className="col-sm-4 text-center my-2 my-sm-0">
                    <p className="comment-count">
                      <span className="align-middle">
                        <i className="far fa-comment"></i>
                      </span>{" "}
                      {singlePost.comments.length}{" "}
                      {singlePost.comments.length === 1
                        ? "Comment"
                        : singlePost.comments.length === 0
                        ? "Comments"
                        : "Comments"}
                    </p>{" "}
                  </div>
                  <ul className="social-icons">
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-dribbble"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-behance"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="blog-author">
                <div className="media align-items-center">
                  <img src={singlePost.avatar} alt="" />
                  <div className="media-body">
                    <a href="#">
                      <h4>{singlePost.name}</h4>
                    </a>
                    <p>
                      Second divided from form fish beast made. Every of seas
                      all gathered use saying you're, he our dominion twon
                      Second divided from
                    </p>
                  </div>
                </div>
              </div>
              <div className="comments-area">
                <h4>
                  {singlePost.comments.length}{" "}
                  {singlePost.comments.length === 1
                    ? "Comment"
                    : singlePost.comments.length === 0
                    ? "Comments"
                    : "Comments"}
                </h4>
                {singlePost.comments.map((comment) => (
                  <SingleComment comment={comment} id={match.params.id} />
                ))}
              </div>
              <div className="comment-form">
                <h4>Leave a Comment</h4>
                {auth.isAuthenticated ? (
                  <form
                    className="form-contact comment_form"
                    onSubmit={(e) => {
                      onSubmit(e);
                    }}
                  >
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <textarea
                            className="form-control w-100"
                            name="body"
                            cols="30"
                            rows="9"
                            required
                            value={body}
                            onChange={(e) => {
                              onChange(e);
                            }}
                            placeholder="Write Comment"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input
                            className="form-control"
                            name="name"
                            value={auth.user.name}
                            disabled
                            type="text"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input
                            className="form-control"
                            name="email"
                            value={auth.user.email}
                            disabled
                            type="email"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="button button-contactForm btn_4 mt-3"
                      >
                        Send Comment
                      </button>
                    </div>
                  </form>
                ) : (
                  <p>
                    Please{" "}
                    <Link className="authLink" to="/register">
                      Register
                    </Link>{" "}
                    or{" "}
                    <Link className="authLink" to="/login">
                      Login
                    </Link>{" "}
                    to start commenting
                  </p>
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

BlogDetail.propTypes = {
  getPost: PropTypes.func.isRequired,
  singlePost: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  singlePost: state.post.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPost, addComment, addLike })(
  BlogDetail
);
