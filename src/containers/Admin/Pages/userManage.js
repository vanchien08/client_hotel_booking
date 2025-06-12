import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  Button,
  Popover,
  Image,
  Empty,
  Alert,
  Spin,
  Switch,
  Modal,
  Upload,
  Select,
  message,
} from "antd";
import { FilterOutlined, UploadOutlined } from "@ant-design/icons";
import {
  handleGetAllUsers,
  handleFilterUsersApi,
  handleSetStatusUser,
  handleUpdateUserApi,
  handleSetUserRoleApi,
} from "../../../services/userService";
import { push } from "connected-react-router";
import FilterButton from "../../../components/FilterUser";
import { toast } from "react-toastify";
import { uploadImageToCloud } from "../../../config/UploadImageCloud";
import "./userManage.scss";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: null,
      openFormFilter: false,
      error: null,
      loading: false,
      modals: {
        update: false,
        delete: false,
      },
      selectedUser: null,
      idDelete: null,
      fileList: [],
      uploading: false,
      imageUrl: "",
    };
  }

  async componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await handleGetAllUsers();
      if (response.errCode === 1) {
        this.setState({ data: response.dataUsers, error: null });
      } else {
        const errorMessage =
          response.errMessage || "Không thể lấy danh sách người dùng";
        this.setState({ error: errorMessage });
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.status === 404
          ? "Không tìm thấy endpoint API. Vui lòng kiểm tra cấu hình backend."
          : err.response?.data?.errMessage ||
            "Lỗi khi lấy danh sách người dùng";
      this.setState({ error: errorMessage });
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  redirectToSystemPage = (url) => {
    const { navigate } = this.props;
    navigate(url);
  };

  setOpenFormFilter = (open) => {
    this.setState({ openFormFilter: open });
  };

  onSubmitPopover = async (data) => {
    this.setState({ loading: true, error: null });
    try {
      const response = await handleFilterUsersApi(data);
      if (response.errCode === 1) {
        this.setState({ data: response.dataUsers, error: null });
        toast.success("Lọc người dùng thành công!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } else {
        const errorMessage = response.errMessage || "Không thể lọc người dùng";
        this.setState({ error: errorMessage });
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.status === 404
          ? "Không tìm thấy endpoint API. Vui lòng kiểm tra cấu hình backend."
          : err.response?.data?.errMessage || "Lỗi khi lọc người dùng";
      this.setState({ error: errorMessage });
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      this.setState({ loading: false, openFormFilter: false });
    }
  };

  handleToggleStatus = async (userId, newStatus) => {
    this.setState({ loading: true, error: null });
    try {
      const response = await handleSetStatusUser(userId, newStatus);
      if (response.errCode === 1) {
        toast.success("Cập nhật trạng thái người dùng thành công!", {
          position: "bottom-right",
          autoClose: 3000,
        });
        this.fetchUsers();
      } else {
        const errorMessage =
          response.errMessage || "Cập nhật trạng thái thất bại";
        this.setState({ error: errorMessage });
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.errMessage || "Lỗi khi cập nhật trạng thái";
      this.setState({ error: errorMessage });
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleUpdate = (record) => {
    this.setState({
      modals: { ...this.state.modals, update: true },
      selectedUser: record,
      fileList: record.avatar ? [{ url: record.avatar, name: "avatar" }] : [],
      imageUrl: record.avatar || "",
    });
  };

  handleUpdateUser = async () => {
    const { selectedUser } = this.state;
    console.log("sdfsdf", selectedUser);
    // Kiểm tra các trường bắt buộc
    if (
      !selectedUser.username?.trim() ||
      !selectedUser.name?.trim() ||
      !selectedUser.email?.trim()
    ) {
      message.error("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }

    try {
      // Gọi API truyền từng trường cụ thể
      const res = await handleUpdateUserApi(
        selectedUser.id,
        selectedUser.name,
        selectedUser.username,
        selectedUser.email,
        selectedUser.address,
        selectedUser.phonenum,
        selectedUser.avatar
      );

      if (res && res.status === 200) {
        message.success("Cập nhật thành công!");
        this.toggleModal("update", false);
        this.fetchUsers();
      } else {
        message.error("Cập nhật thất bại!");
      }
    } catch (error) {
      console.error(error);
      message.error("Cập nhật thất bại!");
    }
  };

  handleDelete = (id) => {
    this.setState({
      modals: { ...this.state.modals, delete: true },
      idDelete: id,
    });
  };

  handleOkUpdate = async () => {
    const { selectedUser } = this.state;
    if (
      !selectedUser.username?.trim() ||
      !selectedUser.name?.trim() ||
      !selectedUser.email?.trim()
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin bắt buộc!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    this.setState({ loading: true, error: null });
    try {
      const response = await handleUpdateUserApi(
        selectedUser.id,
        selectedUser.name,
        selectedUser.username,
        selectedUser.email,
        selectedUser.address,
        selectedUser.phone,
        selectedUser.avatar
      );
      if (response.errCode === 1 || response.status === 200) {
        toast.success("Cập nhật người dùng thành công!", {
          position: "bottom-right",
          autoClose: 3000,
        });
        this.fetchUsers();
        this.setState({ modals: { ...this.state.modals, update: false } });
      } else {
        const errorMessage =
          response.errMessage || "Cập nhật người dùng thất bại";
        this.setState({ error: errorMessage });
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.errMessage || "Lỗi khi cập nhật người dùng";
      this.setState({ error: errorMessage });
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleOkDelete = async () => {
    const { idDelete } = this.state;
    this.setState({ loading: true, error: null });
    try {
      // const response = await handleDeleteUserApi(idDelete);
      // if (response.errCode === 1) {
      //   toast.success("Xóa người dùng thành công!", {
      //     position: "bottom-right",
      //     autoClose: 3000,
      //   });
      //   this.fetchUsers();
      //   this.setState({ modals: { ...this.state.modals, delete: false } });
      // } else {
      //   const errorMessage = response.errMessage || "Xóa người dùng thất bại";
      //   this.setState({ error: errorMessage });
      //   toast.error(errorMessage, {
      //     position: "bottom-right",
      //     autoClose: 3000,
      //   });
      // }
    } catch (err) {
      const errorMessage =
        err.response?.data?.errMessage || "Lỗi khi xóa người dùng";
      this.setState({ error: errorMessage });
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleonChangeInput = (id, event) => {
    this.setState({
      selectedUser: {
        ...this.state.selectedUser,
        [id]: event.target.value,
      },
    });
  };

  handleUpload = async (file) => {
    this.setState({ uploading: true });
    try {
      const data = await uploadImageToCloud(file);
      if (data.secure_url) {
        this.setState((prevState) => ({
          selectedUser: {
            ...prevState.selectedUser,
            avatar: data.secure_url,
          },
          fileList: [{ url: data.secure_url, name: file.name }],
          imageUrl: data.secure_url,
          uploading: false,
        }));
        toast.success("Upload ảnh thành công!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } else {
        this.setState({ uploading: false });
        toast.error("Upload ảnh thất bại!");
      }
    } catch (err) {
      console.error(err);
      this.setState({ uploading: false });
      toast.error("Lỗi khi upload ảnh!");
    }
  };

  handleChangeRole = async (userId, newRole) => {
    this.setState({ loading: true, error: null });
    try {
      const response = await handleSetUserRoleApi(userId, newRole);
      console.log("responsessss", response);
      if (response && response.errCode === 1) {
        toast.success("Đổi vai trò thành công!", {
          position: "bottom-right",
          autoClose: 3000,
        });
        await this.fetchUsers(); // Reload the user list
      } else {
        const errorMessage = response?.errMessage || "Đổi vai trò thất bại";
        this.setState({ error: errorMessage });
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.errMessage || "Lỗi khi đổi vai trò";
      this.setState({ error: errorMessage });
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  getColumns = () => [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (gender) =>
        gender === true ? "Nam" : gender === false ? "Nữ" : "N/A",
    },
    {
      title: "Vai trò",
      dataIndex: "roles",
      key: "roles",
      render: (roles, record) => {
        const roleMap = {
          0: "Người dùng",
          1: "Nhân viên",
        };

        const currentRole = roles && roles.length > 0 ? roles[0].role : null;

        return (
          <Select
            value={currentRole}
            style={{ width: 140 }}
            onChange={(newRole) => this.handleChangeRole(record.id, newRole)}
          >
            {Object.entries(roleMap).map(([value, label]) => (
              <Select.Option key={value} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },

    {
      title: "Ảnh",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <Image
          src={avatar}
          alt="User Avatar"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) =>
        createdAt ? new Date(createdAt).toLocaleDateString() : "N/A",
    },
    {
      title: "Số lượng đặt phòng",
      dataIndex: "bookings",
      key: "bookings",
      render: (bookings) => (bookings ? bookings.length : 0),
    },
    {
      title: "Số lượng đánh giá",
      dataIndex: "reviews",
      key: "reviews",
      render: (reviews) => (reviews ? reviews.length : 0),
    },

    {
      title: "Trạng thái",
      key: "action",
      render: (_, record) => (
        <Switch
          checked={record.status}
          onChange={(checked) => this.handleToggleStatus(record.id, checked)}
        />
      ),
    },
    {
      title: "Cập nhật",
      key: "action",
      render: (record) => (
        <div>
          <Button
            type="primary"
            ghost
            onClick={() => this.handleUpdate(record)}
            style={{ marginRight: "10px" }}
          >
            Update
          </Button>
        </div>
      ),
    },
  ];

  render() {
    const {
      data,
      openFormFilter,
      error,
      loading,
      modals,
      selectedUser,
      fileList,
      uploading,
    } = this.state;

    const UpdateModal = (
      <form>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="id" className="form-label">
                  ID
                </label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  id="id"
                  value={selectedUser?.id || ""}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={selectedUser?.username || ""}
                  onChange={(event) =>
                    this.handleonChangeInput(event.target.id, event)
                  }
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Tên
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={selectedUser?.name || ""}
                  onChange={(event) =>
                    this.handleonChangeInput(event.target.id, event)
                  }
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={selectedUser?.email || ""}
                  onChange={(event) =>
                    this.handleonChangeInput(event.target.id, event)
                  }
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={selectedUser?.address || ""}
                  onChange={(event) =>
                    this.handleonChangeInput(event.target.id, event)
                  }
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={selectedUser?.phone || ""}
                  onChange={(event) =>
                    this.handleonChangeInput(event.target.id, event)
                  }
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="avatar" className="form-label">
                  Ảnh
                </label>
                <div className="upload-container">
                  <Upload
                    customRequest={({ file }) => this.handleUpload(file)}
                    fileList={fileList}
                    listType="picture"
                    showUploadList={{ showPreviewIcon: false }}
                  >
                    <Button icon={<UploadOutlined />} loading={uploading}>
                      Chọn ảnh mới
                    </Button>
                  </Upload>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="createdAt" className="form-label">
                  Ngày tạo
                </label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  id="createdAt"
                  value={
                    selectedUser?.createdAt
                      ? new Date(selectedUser.createdAt).toLocaleDateString()
                      : "N/A"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    );

    return (
      <div className="user-page">
        <h1>QUẢN LÝ NGƯỜI DÙNG</h1>
        {error && (
          <Alert
            message="Lỗi"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: "20px" }}
          />
        )}
        <Modal
          title="Cập nhật người dùng"
          open={modals.update}
          onOk={this.handleOkUpdate}
          onCancel={() =>
            this.setState({ modals: { ...modals, update: false } })
          }
          width={1000}
        >
          {selectedUser ? UpdateModal : <p>Loading...</p>}
        </Modal>

        <Popover
          placement="bottomRight"
          content={
            <div style={{ width: 400 }}>
              <FilterButton
                onClose={() => this.setOpenFormFilter(false)}
                onSubmit={this.onSubmitPopover}
              />
            </div>
          }
          title="Lọc người dùng"
          trigger="click"
          open={openFormFilter}
          onOpenChange={(open) => this.setOpenFormFilter(open)}
          destroyTooltipOnHide={false}
        >
          <Button className="filter-button" loading={loading}>
            Lọc <FilterOutlined />
          </Button>
        </Popover>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spin size="large" />
          </div>
        ) : data == null ? (
          <Empty description="Không có dữ liệu" />
        ) : (
          <Table
            columns={this.getColumns()}
            dataSource={data}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 5 }}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
