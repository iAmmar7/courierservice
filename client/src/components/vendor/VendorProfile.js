import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../common/Spinner';
import SimplePieChart from '../charts/PieChart';
import SimpleExpansionPanel from '../package/ExpansionPanel';

import { setDataForEdit } from '../../actions/profileActions';
import { getVendorProfiles, getVendors } from '../../actions/vendorActions';
import { getPackages } from '../../actions/packageActions';
import { getRiders } from '../../actions/riderActions';

import isEmpty from "../../validation/is-empty";

class VendorProfile extends Component {
  componentWillMount() {
    this.props.getPackages();
    this.props.getVendors();
    this.props.getRiders();
  }

  dateFormat = date => {
    let newDate = new Date(date);
    return newDate.toDateString();
  }

  setData(data) {
    data.hiredate = data.hiredate.toString().split('T')[0];

    // Call Action
    this.props.setDataForEdit(data, this.props.history, "vendor")
  }

  render() {
    const { loading, packages, vendors, riders } = this.props.profile;
    const { user } = this.props.auth;
    let vendorCard, vendorTable, vendorCardData = {}, vendorTableData = [], monthlyData = {};

    if (vendors === null || isEmpty(riders) || loading || isEmpty(packages)) {
      vendorCard = <Spinner />;
      vendorTable = <Spinner />;
    } else {

      // Get Vendor Top Card
      if (localStorage.getItem("VendorID")) {
        for (let i = 0; i < vendors.length; i++) {
          if (vendors[i]._id === localStorage.getItem("VendorID")) {
            vendorCardData._id = vendors[i]._id;
            vendorCardData.name = vendors[i].name;
            vendorCardData.contact = vendors[i].contact;
            vendorCardData.address = vendors[i].address;
            vendorCardData.hiredate = vendors[i].hiredate;
            vendorCardData.formatDate = this.dateFormat(vendors[i].hiredate);
          }
        }

        // Pie Chart Data
        let allDelivered = 0, allReturned = 0;
        for (var i in packages) {
          if (packages[i].vendor === vendorCardData._id) {
            if (packages[i].status === "delivered") allDelivered++;
            else if (packages[i].status === "returned") allReturned++;
          }
        }

        // Display top Card
        vendorCard = (
          <div className="card text-white bg-dark mb-4 p-2" >
            <div className="d-flex justify-content-between row display-card">
              <div className="col-lg-2">
                <img src={user.avatar} alt="rider pic" className="rounded-circle" />
              </div>
              <div className="card-body col-lg-6">
                <div className="card-heading">
                  <h5 className="card-title h2">{vendorCardData.name}</h5>
                  <button type="button" className="btn btn-outline-light py-1" onClick={() => this.setData(vendorCardData)}>Edit Profile</button>
                </div>
                <p className="card-text">Address: <span className="props">{vendorCardData.address}</span></p>
                <p className="card-text">Contact: <span className="props">{vendorCardData.contact}</span></p>
                <p className="card-text">Hire Date: <span className="props">{vendorCardData.formatDate}</span></p>
              </div>
              <div className="col-lg-4 pie-chart-container">
                <SimplePieChart delivered={allDelivered} return={allReturned} />
              </div>
            </div>
          </div>
        );


        // Get Vendor Table
        for (let i = 0; i < packages.length; i++) {
          if (packages[i].vendor === vendorCardData._id) {
            vendorTableData.push(packages[i])
          }
        }

        if (vendorTableData.length > 0) {

          for (var j in vendorTableData) {
            var arrivalMonth = new Date(vendorTableData[j].arrivaldate).getMonth();

            if (monthlyData[arrivalMonth]) {
              monthlyData[arrivalMonth].push(vendorTableData[j]);
            } else {
              monthlyData[arrivalMonth] = [];
              monthlyData[arrivalMonth].push(vendorTableData[j]);
            }
          }

          let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

          console.log(monthlyData);

          //Extract Rider Name from Rider ID
          for (var k in monthlyData) {
            for (var l of monthlyData[k]) {
              for (var m in riders) {
                if (l.rider === riders[m]._id) {
                  l.ridername = riders[m].name;
                }
              }
            }
          }

          //Extract Vendor Name from Vendor ID
          for (var n in monthlyData) {
            for (var o of monthlyData[n]) {
              o.vendorname = vendorCardData.name;
            }
          }

          // Display bottom Tables
          vendorTable = (
            Object.keys(monthlyData).reverse().map(item => {
              let delivered = 0, returned = 0, pending = 0;
              for (var i of monthlyData[item]) {
                if (i.status === "delivered") {
                  delivered++;
                } else if (i.status === "returned") {
                  returned++;
                } else if (i.status === "pending") {
                  pending++;
                }
              }

              return (
                <li key={item}>
                  <SimpleExpansionPanel data={monthlyData[item]} heading={months[item]} delivered={delivered} returned={returned} pending={pending} />
                </li>
              )
            })
          )

        } else {
          vendorTable = <h4 className="p-4">No vendor packages found...</h4>
        }

      } else {
        vendorCard = <h4 className="p-4">No vendor profiles found...</h4>;
      }
    }

    return (
      <div className="profiles" >
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Vendor Profile</h1>
            <p className="lead text-center mb-3">
              See Your Vendor Here
              </p>
            {vendorCard}
            <ul className="expansion-list">
              {vendorTable}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

VendorProfile.propTypes = {
  getVendorProfiles: PropTypes.func.isRequired,
  getVendors: PropTypes.func.isRequired,
  getRiders: PropTypes.func.isRequired,
  getPackages: PropTypes.func.isRequired,
  setDataForEdit: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getVendorProfiles, getRiders, getVendors, getPackages, setDataForEdit })(VendorProfile);