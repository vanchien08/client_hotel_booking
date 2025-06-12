import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./FilterButton.scss";
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
const { RangePicker } = DatePicker;
const { TextArea } = Input;

class FilterButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      checkOut: this.getCurrentDate(),
      checkIn: this.getCurrentDate(),
      address: "",
      id: null,
      name: "",
      description: "",
      address: "",
      city: "",
      country: "",
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
    let { id, name, description, address, city, country } = this.state;
    this.props.onSubmit({ id, name, description, address, city, country });

    this.props.onClose();
  };
  handleDataFilter = (event, id) => {
    this.setState({
      [id]: event.target.value,
    });
  };
  FormDisabledDemo = () => {
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
              onChange={(event) =>
                this.handleDataFilter(event, event.target.id)
              }
            />
          </Form.Item>
          <Form.Item label="Tên khách sạn" name="name">
            <Input
              onChange={(event) =>
                this.handleDataFilter(event, event.target.id)
              }
            />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input
              onChange={(event) =>
                this.handleDataFilter(event, event.target.id)
              }
            />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input
              onChange={(event) =>
                this.handleDataFilter(event, event.target.id)
              }
            />
          </Form.Item>
          <Form.Item label="Thành phố" name="city">
            <Input
              onChange={(event) =>
                this.handleDataFilter(event, event.target.id)
              }
            />
          </Form.Item>
          <Form.Item label="Đất nước" name="country">
            <Input
              onChange={(event) =>
                this.handleDataFilter(event, event.target.id)
              }
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                style={{ minWidth: 100 }}
              >
                Submit
              </Button>
              <Button
                size="large"
                onClick={this.props.onClose}
                style={{ minWidth: 100 }}
              >
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterButton);

//export default FilterButton;
