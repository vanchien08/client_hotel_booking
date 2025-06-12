import React, { useState } from "react";
import { Button, Input, Select, InputNumber } from "antd";

const { Option } = Select;

const FilterButton = ({ onClose, onSubmit }) => {
  const [filterData, setFilterData] = useState({
    id: "",
    hotelName: "",
    roomType: "",
    isAvailable: undefined,
    minPrice: "",
    maxPrice: "",
    minCapacity: "",
    maxCapacity: "",
    amenityName: "",
  });

  const handleSubmit = () => {
    const formattedData = {
      id: filterData.id ? parseInt(filterData.id) : undefined,
      hotelName: filterData.hotelName || undefined,
      roomType: filterData.roomType || undefined,
      isAvailable: filterData.isAvailable,
      minPrice: filterData.minPrice
        ? parseFloat(filterData.minPrice)
        : undefined,
      maxPrice: filterData.maxPrice
        ? parseFloat(filterData.maxPrice)
        : undefined,
      minCapacity: filterData.minCapacity
        ? parseInt(filterData.minCapacity)
        : undefined,
      maxCapacity: filterData.maxCapacity
        ? parseInt(filterData.maxCapacity)
        : undefined,
      amenityName: filterData.amenityName || undefined,
    };
    onSubmit(formattedData);
    onClose();
  };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="id">Room ID</label>
        <InputNumber
          id="id"
          style={{ width: "100%" }}
          value={filterData.id}
          onChange={(value) => setFilterData({ ...filterData, id: value })}
          placeholder="Nhập ID phòng"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="hotelName">Tên khách sạn</label>
        <Input
          id="hotelName"
          value={filterData.hotelName}
          onChange={(e) =>
            setFilterData({ ...filterData, hotelName: e.target.value })
          }
          placeholder="Nhập tên khách sạn"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="roomType">Loại phòng</label>
        <Input
          id="roomType"
          value={filterData.roomType}
          onChange={(e) =>
            setFilterData({ ...filterData, roomType: e.target.value })
          }
          placeholder="Nhập loại phòng"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="isAvailable">Trạng thái</label>
        <Select
          id="isAvailable"
          style={{ width: "100%" }}
          value={filterData.isAvailable}
          onChange={(value) =>
            setFilterData({ ...filterData, isAvailable: value })
          }
          placeholder="Chọn trạng thái"
        >
          <Option value={undefined}>Tất cả</Option>
          <Option value={true}>Còn phòng</Option>
          <Option value={false}>Hết phòng</Option>
        </Select>
      </div>
      <div className="mb-3">
        <label htmlFor="minPrice">Giá tối thiểu</label>
        <InputNumber
          id="minPrice"
          style={{ width: "100%" }}
          value={filterData.minPrice}
          onChange={(value) =>
            setFilterData({ ...filterData, minPrice: value })
          }
          placeholder="Nhập giá tối thiểu"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="maxPrice">Giá tối đa</label>
        <InputNumber
          id="maxPrice"
          style={{ width: "100%" }}
          value={filterData.maxPrice}
          onChange={(value) =>
            setFilterData({ ...filterData, maxPrice: value })
          }
          placeholder="Nhập giá tối đa"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="minCapacity">Sức chứa tối thiểu</label>
        <InputNumber
          id="minCapacity"
          style={{ width: "100%" }}
          value={filterData.minCapacity}
          onChange={(value) =>
            setFilterData({ ...filterData, minCapacity: value })
          }
          placeholder="Nhập sức chứa tối thiểu"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="maxCapacity">Sức chứa tối đa</label>
        <InputNumber
          id="maxCapacity"
          style={{ width: "100%" }}
          value={filterData.maxCapacity}
          onChange={(value) =>
            setFilterData({ ...filterData, maxCapacity: value })
          }
          placeholder="Nhập sức chứa tối đa"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="amenityName">Tiện ích</label>
        <Input
          id="amenityName"
          value={filterData.amenityName}
          onChange={(e) =>
            setFilterData({ ...filterData, amenityName: e.target.value })
          }
          placeholder="Nhập tên tiện ích"
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
