import React from "react";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/post";
import { connect } from "react-redux";
import Moment from "react-moment";

const SingleComment = ({
  comment: { date, text, name, avatar, user, _id },
  deleteComment,
  auth,
  id,
}) => {
  return (
    <div className="comment-list">
      <div className="single-comment justify-content-between d-flex">
        <div className="user justify-content-between d-flex">
          <div className="thumb">
            <img src={avatar} alt={name} />
          </div>
          <div className="desc">
            <p className="comment">{text}</p>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <h5>
                  <a>{name}</a>
                </h5>
                <p className="date">
                  <Moment format="MMMM D, YYYY">{date}</Moment> at{" "}
                  <Moment format="h:mm A">{date}</Moment>
                </p>
              </div>
              {auth.user && (
                <div className="reply-btn">
                  {!auth.loading && user === auth.user._id && (
                    <a
                      onClick={(e) => {
                        deleteComment(id, _id);
                      }}
                      className="btn text-white btn-danger text-uppercase"
                    >
                      delete
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SingleComment.propTypes = {
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(SingleComment);
