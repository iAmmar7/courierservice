import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import SimplePieChart from '../charts/PieChart';
import AllPackages from '../package/AllPackages';
import { getRiderProfiles, getRiders, getPackages } from '../../actions/profileActions';

class RiderProfile extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    this.props.getRiderProfiles();
    this.props.getRiders();
    this.props.getPackages();
  }

  componentWillMount() {
    this.props.getPackages();
  }

  dateFormat = date => {
    var newDate = new Date(date);
    return newDate.toDateString();
  }

  render() {
    const { riders, loading, packages } = this.props.profile;
    const { user } = this.props.auth;
    let riderCard, riderTable, riderCardData = {}, riderTableData = [];

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
            <div className="d-flex justify-content-between row">
              <div className="col-lg-2">
                <img src={user.avatar} alt="rider pic" className="rounded-circle" />
              </div>
              <div className="card-body col-lg-6">
                <h5 className="card-title h2">{riderCardData.name}</h5>
                <p className="card-text">Charges Per Delivery: <span className="props">{riderCardData.chargesperdelivery}</span></p>
                <p className="card-text">Contact: <span className="props">{riderCardData.contact}</span></p>
                <p className="card-text">Hire Date: <span className="props">{riderCardData.hiredate}</span></p>
              </div>
              <div className="col-lg-4">
                <SimplePieChart />
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
      console.log(this.props.profile);

      if (Object.entries(packages).length === 0 && packages.constructor === Object) {
        riderTable = <Spinner />
      } else {
        console.log(packages);
        for (var i = 0; i < packages.length; i++) {
          if (packages[i].ridername === riderCardData.name) {
            console.log(packages[i]);
            riderTableData.push(packages[i])
          }
        }
        console.log(riderTableData);
        riderTable = (
          <li>
            <AllPackages data={riderTableData} packageDetail={riderCardData.name} />
          </li>

        )
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Rider Profile</h1>
              <p className="lead text-center mb-3">
                See Your Rider Here
              </p>
              {riderCard}
              {riderTable}
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