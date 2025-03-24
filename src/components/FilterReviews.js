import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { PlusOutlined } from "@ant-design/icons";
import * as actions from "../store/actions";

import {
  Modal,
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Space,
} from "antd";

const { TextArea } = Input;

class FilterReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      checkOut: this.getCurrentDate(),
      checkIn: this.getCurrentDate(),

      id: null,
      name: "",
      rating: "",
      comment: "",
      hotelname: "",
      dateFrom: "",
      dateTo: "",
    };
  }
  getCurrentDate() {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format YYYY-MM-DD
  }
  // Lấy dữ liệu khi component mount
  async componentDidMount() {}

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  handleSubmit = () => {
    let { id, name, rating, comment, hotelname, dateFrom, dateTo } = this.state;
    this.props.onSubmit({
      id,
      name,
      rating,
      comment,
      hotelname,
      dateFrom,
      dateTo,
    });
    console.log("thiss date fil", this.state);
    this.props.onClose();
  };
  handleDataFilter = (event, id) => {
    this.setState({
      [id]: event.target.value,
    });
  };
  handleDataFilterTimme = (dates, dateStrings) => {
    //console.log("Selected dates:", dates[0].$d.toISOString()); // Mảng chứa các đối tượng moment
    this.setState({
      dateFrom: dateStrings[0],
      dateTo: dateStrings[1],
    });
  };
  FormDisabledDemo = () => {
    const { RangePicker } = DatePicker;
    return (
      <>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={this.handleSubmit} // Gọi hàm handleSubmit khi bấm Submit
          initialValues={{
            id: this.state.id, // Đặt giá trị mặc định cho ID
          }}
        >
          <Form.Item label="ID" name="id">
            <Input
              type="number"
              onChange={(event) =>
                this.handleDataFilter(event, event.target.id)
              }
            />
          </Form.Item>
          <Form.Item label="Tên người dùng" name="name">
            <Input
              onChange={(event) =>
                this.handleDataFilter(event, event.target.id)
              }
            />
          </Form.Item>
          <Form.Item label="Đánh giá" name="rating">
            <Input
              type="number"
              step="0.01"
              onChange={(event) =>
                this.handleDataFilter(event, event.target.id)
              }
            />
          </Form.Item>
          <Form.Item label="Bình luận" name="comment">
            <Input
              onChange={(event) =>
                this.handleDataFilter(event, event.target.id)
              }
            />
          </Form.Item>
          <Form.Item label="Tên khách sạn" name="hotelname">
            <Input
              onChange={(event) =>
                this.handleDataFilter(event, event.target.id)
              }
            />
          </Form.Item>
          <Form.Item label="Thời gian" name="time">
            <RangePicker onChange={this.handleDataFilterTimme} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={this.props.onClose}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </>
    );
  };
  render() {
    let isLoggedIn = this.props.isLoggedIn;
    let isModalOpen = this.state.isModalOpen;

    return <div>{this.FormDisabledDemo()}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterReviews);

//export default FilterReviews;
