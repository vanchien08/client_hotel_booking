import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./SearchButton.scss";

import * as actions from "../store/actions";
import { handleSearchRoom } from "../services/searchResultService";
import { Button, Modal } from "antd";

class SearchButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      checkOut: this.getCurrentDate(),
      checkIn: this.getCurrentDate(),
      address: "",
    };
  }
  getCurrentDate() {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format YYYY-MM-DD
  }
  // Lấy dữ liệu khi component mount
  async componentDidMount() {}
  handleClickSearch = () => {
    let { address, checkIn, checkOut } = this.state;

    if (checkIn > checkOut) {
      this.setState({ isModalOpen: true });
    } else if (this.props.onSearch) {
      this.props.onSearch(address, checkIn, checkOut);
    }
  };

  handleGetAddress = (event) => {
    this.setState({
      address: event.target.value,
    });
  };
  handleGetDate = (event) => {
    if (event.target.id == "checkin") {
      this.setState({
        checkIn: event.target.value,
      });
    } else {
      this.setState({
        checkOut: event.target.value,
      });
    }
  };
  handleOkModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };
  handleCancelModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    let isLoggedIn = this.props.isLoggedIn;
    let isModalOpen = this.state.isModalOpen;
    console.log("state login >>", isLoggedIn);
    return (
      <div>
        <Modal
          title="Thông báo"
          open={isModalOpen}
          onOk={this.handleOkModal}
          onCancel={this.handleCancelModal}
        >
          Ngày bắt đầu phải nhỏ hơn ngày kết thúc !
        </Modal>

        <div className="button-search-container">
          <div className="search-container">
            <div className="input-group">
              <input
                type="text"
                placeholder="Bạn muốn đi đâu?"
                id="address"
                value={this.state.address}
                onChange={(event) => this.handleGetAddress(event)}
              />
              <input
                type="date"
                id="checkin"
                value={this.state.checkIn}
                onChange={(event) => this.handleGetDate(event)}
              />
              <input
                type="date"
                id="checkout"
                value={this.state.checkOut}
                onChange={(event) => this.handleGetDate(event)}
              />
              <button onClick={() => this.handleClickSearch()}>Tìm</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // lang: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    errCode: state.user.errCode,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // adminLoginSuccess: (adminInfo) =>
    //   dispatch(actions.adminLoginSuccess(adminInfo)),
    // adminLoginFail: () => dispatch(actions.adminLoginFail()),
    // fetchLoginStart: (username, password) =>
    //   dispatch(actions.fetchLoginStart(username, password)),
    fetchLoginSuccess: (userInfo) =>
      dispatch(actions.fetchLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchButton);

//export default SearchButton;
