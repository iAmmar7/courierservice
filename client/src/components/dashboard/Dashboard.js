import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
import Statistics from './Statistics';

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

    let userName, dashboardChart, packageContent, monthlyData = {};

    // Dashboard Welcome
    if (!loading && user) {
      userName = <p className="lead text-muted">Welcome back <span className="font-weight-bold">{user.name}!</span></p>
    } else {
      userName = <Spinner />
    }

    // Dashboard Stats, Charts, Recent Packages
    if (loading) {
      packageContent = <Spinner />;

      dashboardChart = <div style={{ marginTop: '20px' }}><Spinner /></div>;;

    } else if (isEmpty(packages)) {
      packageContent = <AllPackages data={packages} />;

    } else {

      // Dashboard Chart Contents
      dashboardChart = <SimpleBarChart />;

      // Dashboard Recent Packages
      for (var j in packages) {
        var arrivalMonth = new Date(packages[j].arrivaldate).getMonth();

        if (monthlyData[arrivalMonth]) {
          monthlyData[arrivalMonth].push(packages[j]);
        } else {
          monthlyData[arrivalMonth] = [];
          monthlyData[arrivalMonth].push(packages[j]);
        }
      }

      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      //Extract Vendor Name from Vendor ID
      for (var k in packages) {
        for (var l in vendors) {
          if (packages[k].vendor === vendors[l]._id) {
            packages[k].vendorname = vendors[l].name;
          }
        }
      }

      //Extract Rider Name from Rider ID
      for (var m in packages) {
        for (var n in riders) {
          if (packages[m].rider === riders[n]._id) {
            packages[m].ridername = riders[n].name;
          }
        }
      }

      packageContent = (
        Object.keys(monthlyData).reverse().map(item => {
          let delivered = 0, returned = 0, pending = 0, income = 0;
          for (var i of monthlyData[item]) {
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
      <div className="dashboard">
        <div className="col-md-12">
          <h1 className="display-4">Dashboard</h1>

          <div>
            {userName}
            <Statistics />
          </div>

          <section style={{ height: '100%' }} >
            <h3 className="h4 text-dark">Statistics</h3>
            <div className="row" style={{ height: 'auto' }} >
              <div className="col-md-12 col-lg-8 mb-5" style={{ height: '100%' }}>
                <div className="px-4 py-3 bg-stats">
                  <h3 className="h5 text-white">Chart</h3>
                  <div className="bar-chart col-lg-12 text-white" style={{ height: '300px' }}>
                    {dashboardChart}
                  </div>
                </div>
              </div>
              <TopVendors />
            </div>
          </section>

          <div className="mt-5 col-profile" id="all-packages">
            <h3 className="h4 text-dark">Recent Packages</h3>
            <ul className="expansion-list">
              {packageContent}
            </ul>
          </div>

        </div>
      </div>
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