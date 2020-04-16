import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getNumberedPost } from "../../actions/post";
import Moment from "react-moment";

const Bottom = ({
  getNumberedPost,
  post: { numberedPosts, numberedLoading },
  auth,
}) => {
  useEffect(() => {
    getNumberedPost(3);
  }, [getNumberedPost]);
  return (
    <section class="blog_part padding_bottom pt-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="blog_tittle">
              <h2>Latest Blog</h2>
            </div>
          </div>
          {numberedLoading ? (
            <Spinner />
          ) : (
            <Fragment>
              {numberedPosts.map(
                ({ _id, mediumImage, title, text, comments, likes, date }) => (
                  <div class="col-lg-4 col-sm-6">
                    <div class="single_blog">
                      <div class="single_blog_img">
                        <img src={`/blog/${mediumImage}`} alt={title} />
                        <div class="date">
                          <h1>
                            <Moment format="MMM">{date}</Moment>
                          </h1>
                          <span>
                            {" "}
                            <br /> <Moment format="YYYY">{date}</Moment>{" "}
                          </span>
                        </div>
                      </div>
                      <div class="single_blog_text">
                        <h3>
                          <a className="trunk-1">{title}</a>
                        </h3>
                        <p className="trunk-3">{text}</p>
                        {auth.isAuthenticated ? (
                          <Fragment>
                            {!auth.loading && auth.user !== null && (
                              <Fragment>
                                {likes.filter(
                                  (like) => like.user === auth.user._id
                                ).length >= 1 ? (
                                  <a>
                                    {" "}
                                    <i
                                      style={{ color: "red" }}
                                      class="ti-heart"
                                    ></i>{" "}
                                    {likes.length}{" "}
                                    {likes.length === 1
                                      ? "Like"
                                      : likes.length === 0
                                      ? "Likes"
                                      : "Likes"}
                                  </a>
                                ) : (
                                  <a>
                                    {" "}
                                    <i class="ti-heart"></i> {likes.length}{" "}
                                    {likes.length === 1
                                      ? "Like"
                                      : likes.length === 0
                                      ? "Likes"
                                      : "Likes"}
                                  </a>
                                )}
                              </Fragment>
                            )}
                          </Fragment>
                        ) : (
                          <a title={`${likes.length} Likes`}>
                            {" "}
                            <i class="ti-heart"></i> {likes.length}{" "}
                            {likes.length === 1
                              ? "Like"
                              : likes.length === 0
                              ? "Likes"
                              : "Likes"}
                          </a>
                        )}
                        <a title={`${comments.length} Comments`}>
                          {" "}
                          <i class="ti-comments-smiley"></i> {comments.length}{" "}
                          {comments.length === 1
                            ? "Comment"
                            : comments.length === 0
                            ? "Comments"
                            : "Comments"}
                        </a>
                      </div>
                      <Link to={`/blog/${_id}`} class="btn_3" href="blog.html">
                        read more <i class="ti-arrow-right"></i>{" "}
                      </Link>
                    </div>
                  </div>
                )
              )}
            </Fragment>
          )}
        </div>
      </div>
    </section>
  );
};

Bottom.propTypes = {
  getNumberedPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getNumberedPost,
})(Bottom);
