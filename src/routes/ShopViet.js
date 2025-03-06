import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import ShopCart from "../containers/Client/Pages/ShopCart";

class System extends Component {
  render() {
    //  const { systemMenuPath } = this.props;
    return (
      <div className="shopviet-container">
        <div className="shopviet-list">
          <Switch>
            <Route path="/shopviet/shopcart" component={ShopCart} />

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
