import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import VendorProfileItem from './VendorProfileItem';
import { getVendorProfiles, getVendors } from '../../actions/profileActions';

class VendorProfiles extends Component {
  componentDidMount() {
    this.props.getVendorProfiles();
    this.props.getVendors();
  }

  render() {
    const { vendors, loading } = this.props.profile;
    const { user } = this.props.auth;
    let vendorItems;

    if (vendors === null || loading) {
      vendorItems = <Spinner />;
    } else {
      if (vendors.length > 0) {
        vendorItems = vendors.map(vendor => (
          <VendorProfileItem key={vendor._id} vendor={vendor} user={user} />
        ));
      } else {
        vendorItems = <h4>No vendor profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Vendors Profiles</h1>
              <p className="lead text-center">
                See Your All Vendors Here
              </p>
              {vendorItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VendorProfiles.propTypes = {
  getVendorProfiles: PropTypes.func.isRequired,
  getVendors: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getVendorProfiles, getVendors })(VendorProfiles);
