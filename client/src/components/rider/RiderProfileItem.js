import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import LetterAvatars from '../common/Avatar';

class RiderProfileItem extends Component {
  render() {
    const { rider, handleClick } = this.props;

    return (
      <Link className="col-lg-3 col-md-4" to='/all-riders/rider' onClick={handleClick}>
        <div className="card text-white bg-dark m-3 p-2 card-item" >
          <div className="card-header"><LetterAvatars name={rider.name.charAt(0) + rider.name.charAt(1)} /></div>
          <div className="card-body text-center">
            <h5 className="card-title h4">{rider.name}</h5>
            <p className="card-text">{rider.contact}</p>
            <p className="card-text">{rider.chargesperdelivery}</p>
            <p className="card-text">{rider.hiredate.toString().split('T')[0]}</p>
          </div>
        </div>
      </Link>
    );
  }
}

RiderProfileItem.propTypes = {
  rider: PropTypes.object.isRequired
};

export default RiderProfileItem;
