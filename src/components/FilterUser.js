import React, { Component } from "react";
import { Form, Input, Select, DatePicker, Button, Row, Col } from "antd";
import moment from "moment";

const { Option } = Select;

class FilterButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      username: "",
      name: "",
      email: "",
      gender: "",
      status: "",
      birthdayFrom: null,
      birthdayTo: null,
      createdAtFrom: null,
      createdAtTo: null,
      updatedAtFrom: null,
      updatedAtTo: null,
    };
  }

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handleSubmit = () => {
    const {
      id,
      username,
      name,
      email,
      gender,
      status,
      birthdayFrom,
      birthdayTo,
      createdAtFrom,
      createdAtTo,
      updatedAtFrom,
      updatedAtTo,
    } = this.state;

    // Validation: Kiểm tra ngày
    if (
      birthdayFrom &&
      birthdayTo &&
      moment(birthdayFrom).isAfter(birthdayTo)
    ) {
      this.props.onClose();
      return;
    }
    if (
      createdAtFrom &&
      createdAtTo &&
      moment(createdAtFrom).isAfter(createdAtTo)
    ) {
      this.props.onClose();
      return;
    }
    if (
      updatedAtFrom &&
      updatedAtTo &&
      moment(updatedAtFrom).isAfter(updatedAtTo)
    ) {
      this.props.onClose();
      return;
    }

    // Chuẩn bị dữ liệu gửi đi
    const filterData = {
      id: id ? parseInt(id) : null,
      username: username.trim() || null,
      name: name.trim() || null,
      email: email.trim() || null,
      gender: gender === "" ? null : gender === "true",
      status: status === "" ? null : status === "true",
      birthdayFrom: birthdayFrom ? birthdayFrom.format("YYYY-MM-DD") : null,
      birthdayTo: birthdayTo ? birthdayTo.format("YYYY-MM-DD") : null,
      createdAtFrom: createdAtFrom ? createdAtFrom.format("YYYY-MM-DD") : null,
      createdAtTo: createdAtTo ? createdAtTo.format("YYYY-MM-DD") : null,
      updatedAtFrom: updatedAtFrom ? updatedAtFrom.format("YYYY-MM-DD") : null,
      updatedAtTo: updatedAtTo ? updatedAtTo.format("YYYY-MM-DD") : null,
    };

    this.props.onSubmit(filterData);
    this.props.onClose();
  };

  handleReset = () => {
    this.setState({
      id: "",
      username: "",
      name: "",
      email: "",
      gender: "",
      status: "",
      birthdayFrom: null,
      birthdayTo: null,
      createdAtFrom: null,
      createdAtTo: null,
      updatedAtFrom: null,
      updatedAtTo: null,
    });
  };

  render() {
    const {
      id,
      username,
      name,
      email,
      gender,
      status,
      birthdayFrom,
      birthdayTo,
      createdAtFrom,
      createdAtTo,
      updatedAtFrom,
      updatedAtTo,
    } = this.state;

    return (
      <Form layout="vertical" style={{ padding: "10px" }}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="ID">
              <Input
                type="number"
                value={id}
                onChange={(e) => this.handleChange("id", e.target.value)}
                placeholder="Nhập ID người dùng"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Username">
              <Input
                value={username}
                onChange={(e) => this.handleChange("username", e.target.value)}
                placeholder="Nhập username"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Tên">
              <Input
                value={name}
                onChange={(e) => this.handleChange("name", e.target.value)}
                placeholder="Nhập tên người dùng"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email">
              <Input
                type="email"
                value={email}
                onChange={(e) => this.handleChange("email", e.target.value)}
                placeholder="Nhập email"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Giới tính">
              <Select
                value={gender}
                onChange={(value) => this.handleChange("gender", value)}
                placeholder="Chọn giới tính"
              >
                <Option value="">Tất cả</Option>
                <Option value="true">Nam</Option>
                <Option value="false">Nữ</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Trạng thái">
              <Select
                value={status}
                onChange={(value) => this.handleChange("status", value)}
                placeholder="Chọn trạng thái"
              >
                <Option value="">Tất cả</Option>
                <Option value="true">Hoạt động</Option>
                <Option value="false">Không hoạt động</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Ngày sinh từ">
              <DatePicker
                format="YYYY-MM-DD"
                value={birthdayFrom}
                onChange={(date) => this.handleChange("birthdayFrom", date)}
                style={{ width: "100%" }}
                placeholder="Chọn ngày"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ngày sinh đến">
              <DatePicker
                format="YYYY-MM-DD"
                value={birthdayTo}
                onChange={(date) => this.handleChange("birthdayTo", date)}
                style={{ width: "100%" }}
                placeholder="Chọn ngày"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Ngày tạo từ">
              <DatePicker
                format="YYYY-MM-DD"
                value={createdAtFrom}
                onChange={(date) => this.handleChange("createdAtFrom", date)}
                style={{ width: "100%" }}
                placeholder="Chọn ngày"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ngày tạo đến">
              <DatePicker
                format="YYYY-MM-DD"
                value={createdAtTo}
                onChange={(date) => this.handleChange("createdAtTo", date)}
                style={{ width: "100%" }}
                placeholder="Chọn ngày"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Ngày cập nhật từ">
              <DatePicker
                format="YYYY-MM-DD"
                value={updatedAtFrom}
                onChange={(date) => this.handleChange("updatedAtFrom", date)}
                style={{ width: "100%" }}
                placeholder="Chọn ngày"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ngày cập nhật đến">
              <DatePicker
                format="YYYY-MM-DD"
                value={updatedAtTo}
                onChange={(date) => this.handleChange("updatedAtTo", date)}
                style={{ width: "100%" }}
                placeholder="Chọn ngày"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Button type="primary" onClick={this.handleSubmit} block>
              Lọc
            </Button>
          </Col>
          <Col span={12}>
            <Button onClick={this.handleReset} block>
              Xóa bộ lọc
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default FilterButton;
