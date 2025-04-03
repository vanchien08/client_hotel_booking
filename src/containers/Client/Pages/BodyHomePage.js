import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./BodyHomePage.scss";
import * as actions from "../../../store/actions";
import imageroom1 from "../../../assets/images/imageroom1.jpg";
import imageroom2 from "../../../assets/images/imageroom2.jpg";
import imageroom3 from "../../../assets/images/imageroom3.jpg";
import imageroom4 from "../../../assets/images/imageroom4.jpg";
import imageroom5 from "../../../assets/images/imageroom5.jpg";
import imageroom6 from "../../../assets/images/imageroom6.jpg";
import travel1 from "../../../assets/images/travel1.jpg";
import travel2 from "../../../assets/images/travel2.jpg";

class BodyHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogin = () => {
    console.log("login");
    this.redirectToSystemPage();
  };

  redirectToSystemPage = () => {
    const { navigate } = this.props;
    const redirectPath = "/login";
    navigate(`${redirectPath}`);
  };

  render() {
    return (
      <div className="BodyHomePage_container">
        {/* Destinations Section */}
        <div className="fh5co-listing">
          <div className="container">
            <div className="section-title">
              <h2>Popular Destinations</h2>
              <p>Discover the most beautiful places around the world</p>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-6 mb-4">
                <a className="fh5co-listing-item">
                  <img src={imageroom1} alt="Paris" className="img-fluid" />
                  <div className="fh5co-listing-copy">
                    <h2>Paris</h2>
                    <span className="icon">
                      <i className="bi bi-chevron-right"></i>
                    </span>
                  </div>
                </a>
              </div>
              <div className="col-md-4 col-sm-6 mb-4">
                <a className="fh5co-listing-item">
                  <img src={imageroom2} alt="New York" className="img-fluid" />
                  <div className="fh5co-listing-copy">
                    <h2>New York</h2>
                    <span className="icon">
                      <i className="bi bi-chevron-right"></i>
                    </span>
                  </div>
                </a>
              </div>
              <div className="col-md-4 col-sm-6 mb-4">
                <a className="fh5co-listing-item">
                  <img src={imageroom3} alt="London" className="img-fluid" />
                  <div className="fh5co-listing-copy">
                    <h2>London</h2>
                    <span className="icon">
                      <i className="bi bi-chevron-right"></i>
                    </span>
                  </div>
                </a>
              </div>

              <div className="col-md-4 col-sm-6 mb-4">
                <a className="fh5co-listing-item">
                  <img src={imageroom4} alt="Amsterdam" className="img-fluid" />
                  <div className="fh5co-listing-copy">
                    <h2>Amsterdam</h2>
                    <span className="icon">
                      <i className="bi bi-chevron-right"></i>
                    </span>
                  </div>
                </a>
              </div>
              <div className="col-md-4 col-sm-6 mb-4">
                <a className="fh5co-listing-item">
                  <img src={imageroom5} alt="Australia" className="img-fluid" />
                  <div className="fh5co-listing-copy">
                    <h2>Australia</h2>
                    <span className="icon">
                      <i className="bi bi-chevron-right"></i>
                    </span>
                  </div>
                </a>
              </div>
              <div className="col-md-4 col-sm-6 mb-4">
                <a className="fh5co-listing-item">
                  <img src={imageroom6} alt="Japan" className="img-fluid" />
                  <div className="fh5co-listing-copy">
                    <h2>Japan</h2>
                    <span className="icon">
                      <i className="bi bi-chevron-right"></i>
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* News Section */}
        <div className="fh5co-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h3>Latest Travel News</h3>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <a href="#">
                      <span className="text-muted">Sep. 10, 2024</span>
                      <h3 className="mb-1">Newly Renovated Bridge of London</h3>
                      <p>
                        The historic London Bridge has been renovated with
                        modern architecture while preserving its cultural
                        heritage. Visitors can now enjoy panoramic views of the
                        city.
                      </p>
                    </a>
                  </li>
                  <li className="mb-3">
                    <a href="#">
                      <span className="text-muted">Sep. 5, 2024</span>
                      <h3 className="mb-1">Top 10 Hidden Beaches in Greece</h3>
                      <p>
                        Discover the secret paradises of Greece that most
                        tourists never find. These pristine beaches offer
                        crystal clear waters and amazing sunsets.
                      </p>
                    </a>
                  </li>
                  <li className="mb-3">
                    <a href="#">
                      <span className="text-muted">Aug. 28, 2024</span>
                      <h3 className="mb-1">
                        New Eco-Tourism Destination in Costa Rica
                      </h3>
                      <p>
                        Costa Rica has opened a new sustainable tourism zone
                        that offers immersive experiences in the rainforest
                        while maintaining ecological balance.
                      </p>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <img
                  src={travel1}
                  alt="Tropical beach destination"
                  className="img-fluid mb-4"
                />
                <img
                  src={travel2}
                  alt="Mountain landscape view"
                  className="img-fluid"
                />
              </div>
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
    // isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BodyHomePage);
