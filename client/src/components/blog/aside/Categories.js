import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getCategories } from "../../../actions/post";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";

const Categories = ({
  getCategories,
  post: { categories, categoriesLoading },
}) => {
  useEffect(() => {
    getCategories(6);
  }, [getCategories]);
  return (
    <aside className="single_sidebar_widget post_category_widget">
      <h4 className="widget_title">Categories</h4>
      {categoriesLoading ? (
        <Spinner />
      ) : (
        <ul className="list cat-list">
          {categories.map(({ _id, category }) => (
            <li>
              <Link to={`/blog/categories/${category}`} className="d-flex">
                <p>{category}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

Categories.propTypes = {
  getCategories: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getCategories })(Categories);
