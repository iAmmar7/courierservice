import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../common/Spinner';
import SimplePieChart from '../charts/PieChart';
import SimpleExpansionPanel from '../package/ExpansionPanel';

import { setDataForEdit } from '../../actions/profileActions';
import { getRiderProfiles, getRiders } from '../../actions/riderActions';
import { getPackages } from '../../actions/packageActions';
import { getVendors } from '../../actions/vendorActions';

import isEmpty from "../../validation/is-empty";

class RiderProfile extends Component {
  componentWillMount() {
    this.props.getPackages();
    this.props.getRiders();
    this.props.getVendors();
  }

  dateFormat = date => {
    let newDate = new Date(date);
    return newDate.toDateString();
  }

  setData(data) {
    data.hiredate = data.hiredate.toString().split('T')[0];

    // Call Action
    this.props.setDataForEdit(data, this.props.history, "rider")
  }

  render() {
    const { loading, packages, riders, vendors } = this.props.profile;
    const { user } = this.props.auth;
    let riderCard, riderTable, riderCardData = {}, riderTableData = [], monthlyData = {};

    if (riders === null || isEmpty(vendors) || loading || isEmpty(packages)) {
      riderCard = <Spinner />;
      riderTable = <Spinner />;
    } else {

      // Get Rider Top Card
      if (localStorage.getItem("RiderID")) {
        for (let i = 0; i < riders.length; i++) {
          if (riders[i]._id === localStorage.getItem("RiderID")) {
            riderCardData._id = riders[i]._id;
            riderCardData.name = riders[i].name;
            riderCardData.contact = riders[i].contact;
            riderCardData.chargesperdelivery = riders[i].chargesperdelivery;
            riderCardData.hiredate = riders[i].hiredate;
            riderCardData.formatDate = this.dateFormat(riders[i].hiredate);
          }
        }

        // Pie Chart Data
        let allDelivered = 0, allReturned = 0;
        for (var i in packages) {
          if (packages[i].rider === riderCardData._id) {
            if (packages[i].status === "delivered") allDelivered++;
            else if (packages[i].status === "returned") allReturned++;
          }
        }

        // Display top Card
        riderCard = (
          <div className="card text-white bg-dark mb-4 p-2" >
            <div className="d-flex justify-content-between row display-card">
              <div className="col-lg-2">
                <img src={user.avatar} alt="rider pic" className="rounded-circle" />
              </div>
              <div className="card-body col-lg-6">
                <div className="card-heading">
                  <h5 className="card-title h2">{riderCardData.name}</h5>
                  <button type="button" className="btn btn-outline-light py-1" onClick={() => this.setData(riderCardData)}>Edit Profile</button>
                </div>
                <p className="card-text">Charges Per Delivery: <span className="props">{riderCardData.chargesperdelivery}</span></p>
                <p className="card-text">Contact: <span className="props">{riderCardData.contact}</span></p>
                <p className="card-text">Hire Date: <span className="props">{riderCardData.formatDate}</span></p>
              </div>
              <div className="col-lg-4 pie-chart-container">
                <SimplePieChart delivered={allDelivered} return={allReturned} />
              </div>
            </div>
          </div>
        );


        // Get Rider Table
        for (var j = 0; j < packages.length; j++) {
          if (packages[j].rider === riderCardData._id) {
            riderTableData.push(packages[j])
          }
        }

        if (riderTableData.length > 0) {

          for (var k in riderTableData) {
            var arrivalMonth = new Date(riderTableData[k].arrivaldate).getMonth();

            if (monthlyData[arrivalMonth]) {
              monthlyData[arrivalMonth].push(riderTableData[k]);
            } else {
              monthlyData[arrivalMonth] = [];
              monthlyData[arrivalMonth].push(riderTableData[k]);
            }
          }

          var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

          //Extract Vendor Name from Vendor ID
          for (var l in monthlyData) {
            for (var m of monthlyData[l]) {
              for (var n in vendors) {
                if (m.vendor === vendors[n]._id) {
                  m.vendorname = vendors[n].name;
                }
              }
            }
          }

          //Extract Rider Name from Rider ID
          for (var o in monthlyData) {
            for (var p of monthlyData[o]) {
              p.ridername = riderCardData.name;
            }
          }

          // Display bottom Tables
          riderTable = (
            Object.keys(monthlyData).reverse().map(item => {
              let delivered = 0, returned = 0, salary = 0;
              for (var i of monthlyData[item]) {
                if (i.status === "delivered") {
                  delivered++;
                } else if (i.status === "returned") {
                  returned++;
                }
              }
              salary = delivered * riderCardData.chargesperdelivery;

              return (
                <li key={item}>
                  <SimpleExpansionPanel data={monthlyData[item]} heading={months[item]} delivered={delivered} returned={returned} salary={salary} />
                </li>
              )
            })
          )

        } else {
          riderTable = <h4 className="p-4">No rider packages found...</h4>;
        }

      } else {
        riderCard = <h4 className="p-4">No rider profiles found...</h4>;
      }
    }

    return (
      <div className="profiles" >
        <div className="row">
          <div className="col-md-12 col-profile">
            <h1 className="display-4 text-center">Rider Profile</h1>
            <p className="lead text-center mb-3">
              See Your Rider Here
              </p>
            {riderCard}
            <ul className="expansion-list">
              {riderTable}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

RiderProfile.propTypes = {
  getRiderProfiles: PropTypes.func.isRequired,
  getRiders: PropTypes.func.isRequired,
  getVendors: PropTypes.func.isRequired,
  getPackages: PropTypes.func.isRequired,
  setDataForEdit: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getRiderProfiles, getRiders, getVendors, getPackages, setDataForEdit })(RiderProfile);