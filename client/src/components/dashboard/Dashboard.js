import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  deleteAccount,
  getRiders,
  getVendors,
  getPackages
} from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import AllPackages from '../package/AllPackages';
// import ProfileActions from './ProfileActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    // this.props.getRiders();
    // this.props.getVendors();
    this.props.getPackages();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <div className="d-flex justify-content-center">
            <Link to='/add-rider' className="btn btn-lg btn-info mx-2">
              Add New Rider
            </Link>
            <Link to='/add-vendor' className="btn btn-lg btn-info mx-2">
              Add New Vendor
            </Link>
          </div>
          <hr />
          <div className="d-flex justify-content-center">
            <Link to='/add-package' className="btn btn-dark btn-lg btn-block w-25 p-2">
              Add New Package
            </Link>
          </div>
          <hr />
          <div className="d-flex justify-content-center">
            <Link to='/all-riders' className="btn btn-lg btn-secondary mx-2 px-5">
              Riders Profile
            </Link>
            <Link to='/all-vendors' className="btn btn-lg btn-secondary mx-2 px-5">
              Vendors Profile
            </Link>
          </div>
        </div>
      );
      // // Check if logged in user has profile data
      // if(Object.keys(profile).length > 0) {
      //   dashboardContent = (
      //     <div>
      //       <p className="lead text-muted">
      //         Welcome <Link to='/dashboard'>{ user.name }</Link>
      //       </p>
      //       <ProfileActions />
      //       {/* TODO: exp and edu */}
      //       <div style={{ marginBottom: '60px' }}>
      //         <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">
      //           Delete My Account  
      //         </button>
      //       </div>
      //     </div>
      //   );
      // } else {
      //   // User is logged in but has no Profile
      //   dashboardContent = (
      //     <div>
      //       <p className="lead text-muted">Welcome { user.name }</p>
      //       <p>You have not yet setup a profile, please add some info</p>
      //       <Link to='/create-profile' className="btn btn-lg btn-info">
      //         Create Profile
      //       </Link>
      //     </div>
      //   );
      // }
    }

    return (
      <div>
        <div className="dashboard">
          <div className="conatainer">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4">Dashborad</h1>
                {dashboardContent}
              </div>
            </div>
          </div>
        </div>
        <br />
        <AllPackages />
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
  getRiders: PropTypes.func.isRequired,
  getVendors: PropTypes.func.isRequired,
  getPackages: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {
  getCurrentProfile,
  getRiders,
  getVendors,
  getPackages,
  deleteAccount,
})(Dashboard);