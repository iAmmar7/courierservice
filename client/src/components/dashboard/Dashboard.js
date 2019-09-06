import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CountUp from 'react-countup';

import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import { getPackages } from '../../actions/packageActions';
import { getRiders } from '../../actions/riderActions';
import { getVendors } from '../../actions/vendorActions';

import Spinner from '../common/Spinner';
import AllPackages from '../package/AllPackages';
import SimpleExpansionPanel from '../package/ExpansionPanel';
import SimpleBarChart from '../charts/BarChart';
import TopVendors from '../vendor/TopVendors';

import isEmpty from '../../validation/is-empty';

class Dashboard extends Component {

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

    let dashboardStats, dashboardChart, packageContent, monthlyData = {};

    // if (loading) {
    //   dashboardStats = <Spinner />;
    // } else {
    dashboardStats = (
      <div>
        <p className="lead text-muted">Welcome back <span className="font-weight-bold">{user.name}!</span></p>

        <section className="statistic statistic2">
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <div className="statistic__item statistic__item--green">
                <h2 className="number">
                  <CountUp start={50000} end={10368} delay={1} duration={3} />
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
        </section>
      </div>
    );

    // Dashboard Chart Contents
    dashboardChart = (
      <div className="col-md-12 col-lg-8 mb-5" style={{ height: '100%' }
      }>
        <div className="px-4 py-3 bg-stats">
          <h3 className="h5 text-white">Chart</h3>
          <div className="bar-chart col-lg-12 text-white">
            <SimpleBarChart />
          </div>
        </div>
      </div>
    );


    // Dashboard Recent Packages
    if (loading) {
      packageContent = <Spinner />

    } else if (isEmpty(packages)) {
      packageContent = <AllPackages data={packages} />

    } else {

      for (let j in packages) {
        var arrivalMonth = new Date(packages[j].arrivaldate).getMonth();

        if (monthlyData[arrivalMonth]) {
          monthlyData[arrivalMonth].push(packages[j]);
        } else {
          monthlyData[arrivalMonth] = [];
          monthlyData[arrivalMonth].push(packages[j]);
        }
      }

      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      console.log(monthlyData);

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
        Object.keys(monthlyData).reverse().map(item => {
          let delivered = 0, returned = 0, pending = 0, income = 0;
          for (let i of monthlyData[item]) {
            if (i.status === "delivered") {
              delivered++;
              income += i.cod;
            } else if (i.status === "returned") {
              returned++;
            } else if (i.status === "pending") {
              pending++;
            }
          }

          return (
            <li key={item}>
              <SimpleExpansionPanel data={monthlyData[item]} heading={months[item]} delivered={delivered} returned={returned} pending={pending} income={income} />
            </li>
          )
        })
      )
    }

    return (
      <div>
        <div className="dashboard">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {dashboardStats}

            <section style={{ height: 'auto' }
            }>
              <h3 className="h4 text-dark">Statistics</h3>
              <div className="row" style={{ height: '100%' }
              }>
                {dashboardChart}

                <TopVendors />

              </div>
            </section>

          </div>
        </div>
        <div className="mt-5 col-profile" id="all-packages">
          <h3 className="h4 text-dark">Recent Packages</h3>
          <ul className="expansion-list">
            {packageContent}
          </ul>
        </div>
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