import React, { Fragment, useEffect } from "react";
import "./css/bootstrap.min.css";
import "./css/animate.css";
import "./css/themify-icons.css";
import "./css/flaticon.css";
import "./css/slick.css";
import "./css/nice-select.css";
import "./css/all.css";
import "./css/intlInputPhone.min.css";
import "./css/style.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";
import Alert from "./components/layout/Alert";
import Landing from "./components/layout/Landing";
import Routes from "./components/routing/Routes";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { setAuthToken } from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <ScrollToTop />
          <Alert />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/reset" component={ForgotPassword} />
            <Route component={Routes} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
