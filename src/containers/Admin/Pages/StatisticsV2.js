// StatisticsV2.js
import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import Chart from "chart.js/auto";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faWallet, faUsers, faEye, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import "./StatisticsV2.scss";
import { handleStatOvTimeApi } from "../../../services/statisticsService";
import {
  PlusOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import {
  Table,
  Button,
  Tag,
  Modal,
  Card,
  Col,
  Row,
  Statistic,
  Segmented,
} from "antd";
import { handleStatisticApi } from "../../../services/statisticsService";
class StatisticsV2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: null,
      dataRevenue: null,
      alignValue: "Hôm nay",
      valueOrder: 0,
      valuePrice: 0,
    };
    this.dailySalesRef = createRef();
  }

  async componentDidMount() {
    // Initialize charts when component mounts
    let getStatOverTime = await handleStatOvTimeApi("today");
    this.setState({
      valuePrice: getStatOverTime.orderNRevenue.revenue,
      valueOrder: getStatOverTime.orderNRevenue.orders,
    });
    let respon = await handleStatisticApi();
    if (respon && respon.dataStatistic) {
      let data = this.processChartData(respon.dataStatistic, 2025);
      this.setState({
        dataRevenue: data, // Đúng định dạng mà LineChart cần
      });
      // console.log("show respon", this.getRevenue(dat));
    }

    this.initializeCharts();
  }

  initializeCharts = () => {
    // Website Views Chart
    const dataRevenue = this.state.dataRevenue;
    const websiteViewsCtx = document
      .getElementById("websiteViewsChart")
      ?.getContext("2d");
    if (websiteViewsCtx) {
      new Chart(websiteViewsCtx, {
        type: "bar",
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          datasets: [
            {
              label: "Website Views",
              data: [50, 20, 30, 40, 60, 80, 100],
              backgroundColor: "#22c55e",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    }

    // Daily Sales Chart
    if (this.dailySalesRef.current) {
      new Chart(this.dailySalesRef.current, {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Doanh thu theo tháng",
              data: this.getRevenue(),
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: true } },
        },
      });
    }

    const completedTasksCtx = document
      .getElementById("completedTasksChart")
      ?.getContext("2d");
    if (completedTasksCtx) {
      new Chart(completedTasksCtx, {
        type: "line",
        data: {
          labels: ["Apr", "Jun", "Aug", "Oct", "Dec"],
          datasets: [
            {
              label: "Completed Tasks",
              data: [100, 200, 300, 400, 500],
              borderColor: "#22c55e",
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    }
  };
  getRevenue = () => {
    const dataRevenue = this.state.dataRevenue;
    return dataRevenue.map((item) => item.revenue);
  };
  processChartData = (data, year) => {
    const fullYearData = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      revenue: 0,
      quantity: 0,
      year: year,
    }));

    data.forEach((item) => {
      if (item.year === year) {
        const index = item.month - 1;
        fullYearData[index] = { ...fullYearData[index], ...item };
      }
    });

    return fullYearData;
  };
  redirectToSystemPage = (url) => {
    const { navigate } = this.props;
    const redirectPath = url;
    navigate(`${redirectPath}`);
  };
  onChangeAlign = async (val) => {
    this.setState({ alignValue: val });
    let respon = null;
    switch (val) {
      case "Hôm nay":
        respon = await handleStatOvTimeApi("today");
        break;
      case "Tháng này":
        respon = await handleStatOvTimeApi("thismonth");
        break;
      case "Năm này":
        respon = await handleStatOvTimeApi("thisyear");
        break;
    }
    if (respon != null) {
      this.setState({
        valuePrice: respon.orderNRevenue.revenue,
        valueOrder: respon.orderNRevenue.orders,
      });
    }
  };

  render() {
    const { isLoggedIn } = this.props;
    const { data, alignValue, valueOrder, valuePrice } = this.state;

    console.log("state login >>", isLoggedIn);
    console.log("data >>", data);
    const cardstatictis = (
      <Row gutter={16}>
        <Col span={12}>
          <Card variant="borderless">
            <Statistic
              title="Số đơn hàng"
              value={valueOrder}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card variant="borderless">
            <Statistic
              title="Doanh thu"
              value={valuePrice}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
      </Row>
    );

    return (
      <div className="StatisticsV2-container">
        <div className="container">
          <h1 className="header">Thống kê</h1>
          <p className="subheader">
            Check the sales, value and bounce rate by country.
          </p>

          <div className="segmented-container">
            <Segmented
              value={alignValue}
              onChange={this.onChangeAlign}
              options={["Hôm nay", "Tháng này", "Năm này"]}
            />
          </div>

          {cardstatictis}

          <div className="grid grid-11">
            <div className="card graph-container">
              <p className="text-gray">Doanh thu</p>

              <div className="chart">
                <canvas
                  className="canvas-graph"
                  ref={this.dailySalesRef}
                ></canvas>
              </div>
              <p className="text-sm text-gray">updated 4 min ago</p>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsV2);
