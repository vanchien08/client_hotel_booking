import React, { useState } from "react";
import { Button, Select, DatePicker, Input } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

const FilterButton = ({ onClose, onSubmit }) => {
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [roomType, setRoomType] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [status, setStatus] = useState("");
  const [checkInRange, setCheckInRange] = useState([]);
  const [checkOutRange, setCheckOutRange] = useState([]);
  const [priceRange, setPriceRange] = useState([null, null]);
  const [createdAtRange, setCreatedAtRange] = useState([]);

  const handleSubmit = () => {
    onSubmit({
      id: id ? parseInt(id) : null,
      username,
      roomType,
      hotelName,
      status,
      checkInFrom: checkInRange[0] ? checkInRange[0].toISOString() : null,
      checkInTo: checkInRange[1] ? checkInRange[1].toISOString() : null,
      checkOutFrom: checkOutRange[0] ? checkOutRange[0].toISOString() : null,
      checkOutTo: checkOutRange[1] ? checkOutRange[1].toISOString() : null,
      minTotalPrice: priceRange[0],
      maxTotalPrice: priceRange[1],
      createdAtFrom: createdAtRange[0] ? createdAtRange[0].toISOString() : null,
      createdAtTo: createdAtRange[1] ? createdAtRange[1].toISOString() : null,
    });
  };

  return (
    <div>
      <div className="mb-3">
        <label>ID</label>
        <Input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Nhập ID đặt phòng"
        />
      </div>
      <div className="mb-3">
        <label>Tên người dùng</label>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nhập tên người dùng"
        />
      </div>
      <div className="mb-3">
        <label>Loại phòng</label>
        <Input
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          placeholder="Nhập loại phòng"
        />
      </div>
      <div className="mb-3">
        <label>Tên khách sạn</label>
        <Input
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
          placeholder="Nhập tên khách sạn"
        />
      </div>
      <div className="mb-3">
        <label>Trạng thái</label>
        <Select
          value={status}
          onChange={setStatus}
          style={{ width: "100%" }}
          placeholder="Chọn trạng thái"
        >
          <Option value="">Tất cả</Option>
          <Option value="pending">Đang chờ xử lý</Option>
          <Option value="confirmed">Đã xác nhận</Option>
          <Option value="success">Thành công</Option>
          <Option value="cancelled">Đã hủy</Option>
          <Option value="failed">Thất bại</Option>
          <Option value="checked-in">Checked-in</Option>
          <Option value="checked-out">Checked-out</Option>
          <Option value="no-show">Không đến</Option>
        </Select>
      </div>
      <div className="mb-3">
        <label>Khoảng Check-in</label>
        <RangePicker
          onChange={(dates) => setCheckInRange(dates || [])}
          style={{ width: "100%" }}
        />
      </div>
      <div className="mb-3">
        <label>Khoảng Check-out</label>
        <RangePicker
          onChange={(dates) => setCheckOutRange(dates || [])}
          style={{ width: "100%" }}
        />
      </div>
      <div className="mb-3">
        <label>Khoảng Tổng giá</label>
        <Input.Group compact>
          <Input
            type="number"
            style={{ width: "50%" }}
            placeholder="Giá tối thiểu"
            value={priceRange[0] || ""}
            onChange={(e) =>
              setPriceRange([parseFloat(e.target.value) || null, priceRange[1]])
            }
          />
          <Input
            type="number"
            style={{ width: "50%" }}
            placeholder="Giá tối đa"
            value={priceRange[1] || ""}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseFloat(e.target.value) || null])
            }
          />
        </Input.Group>
      </div>
      <div className="mb-3">
        <label>Khoảng Ngày tạo</label>
        <RangePicker
          onChange={(dates) => setCreatedAtRange(dates || [])}
          style={{ width: "100%" }}
        />
      </div>
      <Button type="primary" onClick={handleSubmit}>
        Lọc
      </Button>
      <Button onClick={onClose} style={{ marginLeft: 8 }}>
        Đóng
      </Button>
    </div>
  );
};

export default FilterButton;
