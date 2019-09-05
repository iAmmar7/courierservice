import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import LetterAvatars from '../common/Avatar';

class VendorProfileItem extends Component {
  render() {
    const { vendor, handleClick } = this.props;

    return (
      <Link className="col-lg-3 col-md-4" to='/all-vendors/vendor' onClick={handleClick}>
        <div className="card text-white bg-dark m-3 p-2 card-item" >
          <div className="card-header"><LetterAvatars name={vendor.name.charAt(0) + vendor.name.charAt(1)} /></div>
          <div className="card-body text-center">
            <h5 className="card-title h4">{vendor.name}</h5>
            <p className="card-text">{vendor.contact}</p>
            <p className="card-text">{vendor.address}</p>
            <p className="card-text">{vendor.hiredate.toString().split('T')[0]}</p>
          </div>
        </div>
      </Link>
    );
  }
}

VendorProfileItem.propTypes = {
  vendor: PropTypes.object.isRequired
};

export default VendorProfileItem;
