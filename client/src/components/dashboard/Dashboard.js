import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import { getPackages } from '../../actions/packageActions';
import { getRiders } from '../../actions/riderActions';
import { getVendors } from '../../actions/vendorActions';

import Spinner from '../common/Spinner';
import AllPackages from '../package/AllPackages';
import SimpleBarChart from '../charts/BarChart';

import CountUp from 'react-countup';

class Dashboard extends Component {
  // componentDidMount() {
  //   this.props.getCurrentProfile();
  //   this.props.getRiders();
  //   this.props.getVendors();
  //   this.props.getPackages();
  // }

  componentWillMount() {
    this.props.getCurrentProfile();
    this.props.getPackages();
    this.props.getRiders();
    this.props.getVendors();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { loading, packages, vendors, riders } = this.props.profile;

    let dashboardContent, packageContent;

    // if (loading) {
    //   dashboardContent = <Spinner />;
    // } else {
    dashboardContent = (
      <div>
        <p className="lead text-muted">Welcome back <span className="font-weight-bold">{user.name}!</span></p>

        {/* STATISTIC */}
        <section className="statistic statistic2">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-3">
                <div className="statistic__item statistic__item--green">
                  <h2 className="number">
                    <CountUp end={10368} delay={1} duration={3} />
                  </h2>
                  <span className="desc">Delivered</span>
                  <div className="icon">
                    <i className="zmdi zmdi-cloud-done"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="statistic__item statistic__item--orange">
                  <h2 className="number">
                    <CountUp end={388688} delay={1} duration={3} />
                  </h2>
                  <span className="desc">Pending</span>
                  <div className="icon">
                    <i className="zmdi zmdi-network-warning"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="statistic__item statistic__item--red">
                  <h2 className="number">
                    <CountUp end={1086} delay={1} duration={3} />
                  </h2>
                  <span className="desc">Returned</span>
                  <div className="icon">
                    <i className="zmdi zmdi-minus-circle-outline"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="statistic__item statistic__item--blue">
                  <h2 className="number">
                    <CountUp end={1060386} prefix="$" delay={1} duration={3} />
                  </h2>
                  <span className="desc">total earnings</span>
                  <div className="icon">
                    <i className="zmdi zmdi-money"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* END STATISTIC */}

        {/* <!-- STATISTIC CHART--> */}
        <section className="statistic-chart">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3 className="title-5 m-b-35">statistics</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-8">
                {/* <!-- CHART--> */}
                <div className="statistic-chart-1">
                  <h3 className="title-3">chart</h3>
                  <div className="chart-wrap bar-chart">
                    <SimpleBarChart />
                  </div>
                </div>
                {/* <!-- END CHART--> */}
              </div>
              <div className="col-md-12 col-lg-4">
                {/* <!-- TOP CAMPAIGN--> */}
                <div className="top-campaign">
                  <h3 className="title-3">top vendors</h3>
                  <div className="table-responsive">
                    <table className="table table-top-campaign">
                      <tbody>
                        <tr>
                          <td>1. John Doe</td>
                          <td>$70,261.65</td>
                        </tr>
                        <tr>
                          <td>2. Usman</td>
                          <td>$46,399.22</td>
                        </tr>
                        <tr>
                          <td>3. Abraham</td>
                          <td>$35,364.90</td>
                        </tr>
                        <tr>
                          <td>4. Germany</td>
                          <td>$20,366.96</td>
                        </tr>
                        <tr>
                          <td>5. France</td>
                          <td>$10,366.96</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* <!-- END TOP CAMPAIGN--> */}
              </div>
            </div>
          </div>
        </section>
        {/* <!-- END STATISTIC CHART--> */}
      </div >
    );

    if (packages !== undefined) {

      if (Object.entries(packages).length === 0 && packages.constructor === Object) {
        packageContent = <Spinner />
      } else {

        //Extract Vendor Name from Vendor ID
        for (let i in packages) {
          for (let j in vendors) {
            if (packages[i].vendor === vendors[j]._id) {
              packages[i].vendorname = vendors[j].name;
            }
          }
        }

        //Extract Rider Name from Rider ID
        for (let i in packages) {
          for (let j in riders) {
            if (packages[i].rider === riders[j]._id) {
              packages[i].ridername = riders[j].name;
            }
          }
        }

        packageContent = (
          <div className="m-t-30" id="all-packages">
            <h3 className="title-5 m-b-0">Recent Packages</h3>
            <AllPackages data={packages} />
          </div>
        )
        // }
      }
    }

    return (
      <div>
        <div className="dashboard">
          <div className="conatainer">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4">Dashboard</h1>
                {dashboardContent}
              </div>
            </div>
          </div>
        </div>
        <br />
        {packageContent}
      </div >
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
})

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getPackages: PropTypes.func.isRequired,
  getRiders: PropTypes.func.isRequired,
  getVendors: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {
  getCurrentProfile,
  getPackages,
  getRiders,
  getVendors,
  deleteAccount,
})(Dashboard);