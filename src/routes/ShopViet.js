import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "../containers/Client/Pages/HomePages";
import ShopCart from "../containers/Client/Pages/ShopCart";
import Profile from "../containers/Client/Pages/Profile";
class System extends Component {
  render() {
    //  const { systemMenuPath } = this.props;
    return (
      <div className="shopviet-container">
        <div className="shopviet-list">
          <Switch>
            <Route path="/shopviet/home" component={HomePage} />
            <Route path="/shopviet/shopcart" component={ShopCart} />
            <Route path="/shopviet/profile" component={Profile} />
            <Route
              component={() => {
                return <Redirect to="/shopviet/home" />;
              }}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //    systemMenuPath: state.app.systemMenuPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
