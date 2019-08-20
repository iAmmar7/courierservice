import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import SimplePieChart from '../charts/PieChart';
import SimpleExpansionPanel from '../package/ExpansionPanel';

import { getRiderProfiles, getRiders, getPackages } from '../../actions/profileActions';

class RiderProfile extends Component {
  constructor() {
    super();
    this.state = {
      allDelivered: 100,
      allReturned: 100,
      rendered: false
    }
  }

  componentDidMount() {
    this.props.getRiderProfiles();
    this.props.getRiders();
    this.props.getPackages();
  }

  componentWillMount() {
    this.props.getPackages();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const { packages, riders } = nextProps.profile;
    let rider, delivered = 0, returned = 0;

    for (let i in riders) {
      if (riders[i]._id === localStorage.getItem("RiderID")) {
        rider = riders[i].name;
      }
    }

    for (let i in packages) {
      if (packages[i].ridername === rider) {
        if (packages[i].status === "delivered") delivered++;
        else if (packages[i].status === "returned") returned++;
      }
    }

    this.setState({
      allDelivered: delivered,
      allReturned: returned
    })
  }

  dateFormat = date => {
    let newDate = new Date(date);
    return newDate.toDateString();
  }

  render() {
    const { riders, loading, packages } = this.props.profile;
    const { user } = this.props.auth;
    let riderCard, riderTable, riderCardData = {}, riderTableData = [], monthlyData = {};

    // Get Rider Top Card
    if (riders === null || loading) {
      riderCard = <Spinner />;
    } else {
      if (localStorage.getItem("RiderID")) {
        for (let i = 0; i < riders.length; i++) {
          if (riders[i]._id === localStorage.getItem("RiderID")) {
            riderCardData.name = riders[i].name;
            riderCardData.contact = riders[i].contact;
            riderCardData.chargesperdelivery = riders[i].chargesperdelivery;
            riderCardData.hiredate = this.dateFormat(riders[i].hiredate);
          }
        }
        riderCard = (
          <div className="card text-white bg-dark mb-4 p-2" >
            <div className="d-flex justify-content-between row display-card">
              <div className="col-lg-2">
                <img src={user.avatar} alt="rider pic" className="rounded-circle" />
              </div>
              <div className="card-body col-lg-6">
                <div className="card-heading">
                  <h5 className="card-title h2">{riderCardData.name}</h5>
                  <button type="button" className="btn btn-outline-light py-1">Edit Profile</button>
                </div>
                <p className="card-text">Charges Per Delivery: <span className="props">{riderCardData.chargesperdelivery}</span></p>
                <p className="card-text">Contact: <span className="props">{riderCardData.contact}</span></p>
                <p className="card-text">Hire Date: <span className="props">{riderCardData.hiredate}</span></p>
              </div>
              <div className="col-lg-4 pie-chart-container">
                <SimplePieChart deliver={this.state.allDelivered} return={this.state.allReturned} />
              </div>
            </div>
          </div>
        )
      } else {
        riderCard = <h4>No rider profiles found...</h4>;
      }
    }

    // Get Rider Table
    if (Object.entries(this.props.profile).length > 0) {

      if (Object.entries(packages).length === 0 && packages.constructor === Object) {
        riderTable = <Spinner />
      } else {
        for (let i = 0; i < packages.length; i++) {
          if (packages[i].ridername === riderCardData.name) {
            riderTableData.push(packages[i])
          }
        }

        for (let j in riderTableData) {
          var arrivalMonth = new Date(riderTableData[j].arrivaldate).getMonth();

          if (monthlyData[arrivalMonth]) {
            monthlyData[arrivalMonth].push(riderTableData[j]);
          } else {
            monthlyData[arrivalMonth] = [];
            monthlyData[arrivalMonth].push(riderTableData[j]);
          }
        }

        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        riderTable = (
          Object.keys(monthlyData).reverse().map(item => {
            let delivered = 0, returned = 0, salary = 0;
            monthlyData[item].map(innerItem => {
              if (innerItem.status === "delivered") {
                delivered++;
              } else if (innerItem.status === "returned") {
                returned++;
              }
            })
            salary = delivered * riderCardData.chargesperdelivery;

            return (
              <li key={item}>
                <SimpleExpansionPanel data={monthlyData[item]} heading={months[item]} delivered={delivered} returned={returned} salary={salary} />
              </li>
            )
          })
        )
      }
    }

    return (
      <div className="profiles" >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
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
      </div>
    );
  }
}

RiderProfile.propTypes = {
  getRiderProfiles: PropTypes.func.isRequired,
  getRiders: PropTypes.func.isRequired,
  getPackages: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getRiderProfiles, getRiders, getPackages })(RiderProfile);