import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RiderProfileItem extends Component {
  render() {
    const { rider, user } = this.props;

    return (
      <div className="card text-white bg-dark mb-3" >
        <div className="row">
          <div className="col-2">
            <img src={user.avatar} alt="" className="rounded-circle" />
          </div>
          <div className="card-body">
            <h5 className="card-title">{rider.name}</h5>
            <p className="card-text">Contact: {rider.contact}</p>
            <p className="card-text">Charges Per Delivery: {rider.chargesperdelivery}</p>
            <p className="card-text">Hire Date: {rider.hiredate}</p>
          </div>
        </div>
      </div>
      // <div className="card card-body bg-light mb-3">
      //   <div className="row">
      //     <div className="col-2">
      //       <img src={user.avatar} alt="" className="rounded-circle" />
      //     </div>
      //     <div className="col-lg-6 col-md-4 col-8">
      //       <h3>{rider.name}</h3>
      //       <p>CONTACT: {rider.contact}</p>
      //       <p>Charges Per Delivery: {rider.chargesperdelivery}</p>
      //       <p>Hire Date: {rider.hiredate}</p>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

RiderProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  rider: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default RiderProfileItem;
