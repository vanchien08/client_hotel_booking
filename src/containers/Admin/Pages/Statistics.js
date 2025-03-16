import React, { Component } from "react";
import { connect } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { push } from "connected-react-router";
import "./Statistics.scss";

import { handleStatisticApi } from "../../../services/statisticsService";

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revenueData: [
        { month: "Jan", revenue: 12000000 },
        { month: "Feb", revenue: 15000000 },
        { month: "Mar", revenue: 18000000 },
        { month: "Apr", revenue: 20000000 },
        { month: "May", revenue: 25000000 },
        { month: "Jun", revenue: 0 },
        { month: "Jul", revenue: 28000000 },
        { month: "Aug", revenue: 32000000 },
        { month: "Sep", revenue: 31000000 },
        { month: "Oct", revenue: 35000000 },
        { month: "Nov", revenue: 40000000 },
        { month: "Dec", revenue: 45000000 },
      ],
      dataRevenue: "",
    };
  }
  async componentDidMount() {
    let respon = await handleStatisticApi();
    if (respon && respon.dataStatistic) {
      let data = this.convertObjectStatiticMonth(respon.dataStatistic);

      this.setState({
        dataRevenue: data, // Đúng định dạng mà LineChart cần
      });
    }
  }

  convertObjectStatiticMonth = (data) => {
    let formattedData = [];

    for (let i = 1; i <= 12; i++) {
      // Tìm kiếm dữ liệu của tháng i
      let monthData = data.find((item) => item.month === i);

      let obj = {
        month: i,
        revenue: monthData ? monthData.revenue : 0, // Nếu không có, gán 0
      };

      formattedData.push(obj);
    }

    return formattedData;
  };

  convertObjectStatiticYear = (data) => {
    let formattedData = [];

    for (let i = 1; i <= 12; i++) {
      // Tìm kiếm dữ liệu của tháng i
      let yearData = data.find((item) => item.year === i);

      let obj = {
        month: i,
        revenue: yearData ? yearData.revenue : 0, // Nếu không có, gán 0
      };

      formattedData.push(obj);
    }

    return formattedData;
  };

  render() {
    return (
      <div className="statistics-container">
        <h2>Doanh Thu Theo Tháng</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={this.state.dataRevenue}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat("vi-VN").format(value) + " VNĐ"
              }
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
