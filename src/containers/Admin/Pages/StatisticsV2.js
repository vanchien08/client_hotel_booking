// Dashboard.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import Chart from "chart.js/auto";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faWallet, faUsers, faEye, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import "./Dashboard.scss";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: null,
    };
  }

  async componentDidMount() {
    // Initialize charts when component mounts
    this.initializeCharts();
  }

  initializeCharts = () => {
    // Website Views Chart
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
    const dailySalesCtx = document
      .getElementById("dailySalesChart")
      ?.getContext("2d");
    if (dailySalesCtx) {
      new Chart(dailySalesCtx, {
        type: "line",
        data: {
          labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          datasets: [
            {
              label: "Daily Sales",
              data: [
                200, 300, 400, 500, 400, 300, 200, 300, 400, 500, 400, 300,
              ],
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

    // Completed Tasks Chart
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

  redirectToSystemPage = (url) => {
    const { navigate } = this.props;
    const redirectPath = url;
    navigate(`${redirectPath}`);
  };

  render() {
    const { isLoggedIn } = this.props;
    const { data } = this.state;

    console.log("state login >>", isLoggedIn);
    console.log("data >>", data);

    return (
      <div className="dashboard-container">
        <div className="container">
          <h1 className="header">Dashboard</h1>
          <p className="subheader">
            Check the sales, value and bounce rate by country.
          </p>

          <div className="grid grid-4">
            <div className="card">
              <div className="card-header">
                <div>
                  <p className="text-gray">Today's Money</p>
                  <p className="header">$53k</p>
                  <p className="text-green">+55% than last week</p>
                </div>
                <div className="icon">
                  {/* <FontAwesomeIcon icon={faWallet} /> */}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div>
                  <p className="text-gray">Today's Users</p>
                  <p className="header">2300</p>
                  <p className="text-green">+3% than last month</p>
                </div>
                <div className="icon">
                  {/* <FontAwesomeIcon icon={faUsers} /> */}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div>
                  <p className="text-gray">Ads Views</p>
                  <p className="header">3,462</p>
                  <p className="text-red">-2% than yesterday</p>
                </div>
                <div className="icon">
                  {/* <FontAwesomeIcon icon={faEye} /> */}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div>
                  <p className="text-gray">Sales</p>
                  <p className="header">$103,430</p>
                  <p className="text-green">+5% than yesterday</p>
                </div>
                <div className="icon">
                  {/* <FontAwesomeIcon icon={faDollarSign} /> */}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-3">
            <div className="card">
              <p className="text-gray">Website Views</p>
              <p className="text-sm text-gray">Last Campaign Performance</p>
              <div className="chart">
                <canvas id="websiteViewsChart"></canvas>
              </div>
              <p className="text-sm text-gray">campaign sent 2 days ago</p>
            </div>

            <div className="card">
              <p className="text-gray">Daily Sales</p>
              <p className="text-sm text-gray">
                (+15%) increase in today sales.
              </p>
              <div className="chart">
                <canvas id="dailySalesChart"></canvas>
              </div>
              <p className="text-sm text-gray">updated 4 min ago</p>
            </div>

            <div className="card">
              <p className="text-gray">Completed Tasks</p>
              <p className="text-sm text-gray">Last Campaign Performance</p>
              <div className="chart">
                <canvas id="completedTasksChart"></canvas>
              </div>
              <p className="text-sm text-gray">just updated</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
