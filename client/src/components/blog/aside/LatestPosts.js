import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Spinner from "../../layout/Spinner";
import { getNumberedPost } from "../../../actions/post";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const LatestPosts = ({
  post: { numberedPosts, numberedLoading },
  getNumberedPost,
}) => {
  useEffect(() => {
    getNumberedPost(5);
  }, [getNumberedPost]);
  return (
    <aside className="single_sidebar_widget popular_post_widget">
      <h3 className="widget_title">Recent Post</h3>
      {numberedLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          {numberedPosts.map(({ smallImage, title, _id, date }) => (
            <div className="media post_item">
              <img src={`/blog/${smallImage}`} alt={title} />
              <div className="media-body">
                <Link to={`/blog/${_id}`}>
                  <h3 className="trunk-1">{title}</h3>
                </Link>
                <p>
                  <Moment format="MMMM DD, YYYY">{date}</Moment>
                </p>
              </div>
            </div>
          ))}
        </Fragment>
      )}
    </aside>
  );
};

LatestPosts.propTypes = {
  post: PropTypes.object.isRequired,
  getNumberedPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getNumberedPost })(LatestPosts);
