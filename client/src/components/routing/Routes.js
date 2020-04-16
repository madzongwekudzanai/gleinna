import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import About from "../about/About";
import Service from "../service/Service";
import Contact from "../contact/Contact";
import Blog from "../blog/Blog";
import BlogDetail from "../blog/BlogDetail";
import Category from "../blog/Category";
import Search from "../blog/Search";

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact component={About} path="/about" />
        <Route exact component={Service} path="/services" />
        <Route exact component={Contact} path="/contact" />
        <Route exact component={Blog} path="/blog" />
        <Route exact component={BlogDetail} path="/blog/:id" />
        <Route exact component={Category} path="/blog/categories/:category" />
        <Route exact component={Search} path="/blog/searchResults/:term" />
      </Switch>
    </Fragment>
  );
};

export default Routes;
