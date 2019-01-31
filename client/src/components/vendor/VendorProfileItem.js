import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VendorProfileItem extends Component {
  render() {
    const { vendor, user } = this.props;

    return (
      <div className="card text-white bg-dark mb-3" >
        <div className="row">
          <div className="col-2">
            <img src={user.avatar} alt="" className="rounded-circle" />
          </div>
          <div className="card-body">
            <h5 className="card-title">{vendor.name}</h5>
            <p className="card-text">Address: {vendor.address}</p>
            <p className="card-text">Contact: {vendor.contact}</p>
            <p className="card-text">Hire Date: {vendor.hiredate}</p>
          </div>
        </div>
      </div>
    );
  }
}

VendorProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  vendor: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default VendorProfileItem;
