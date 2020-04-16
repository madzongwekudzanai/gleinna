import React from "react";
import Categories from "./aside/Categories";
import LatestPosts from "./aside/LatestPosts";

const Aside = (props) => {
  return (
    <div className="col-lg-4">
      <div className="blog_right_sidebar">
        <Categories />
        <LatestPosts />
      </div>
    </div>
  );
};

export default Aside;
