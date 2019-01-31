import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import RiderProfileItem from './RiderProfileItem';
import { getRiderProfiles, getRiders } from '../../actions/profileActions';

class RiderProfiles extends Component {
  componentDidMount() {
    this.props.getRiderProfiles();
    this.props.getRiders();
  }

  render() {
    const { riders, loading } = this.props.profile;
    const { user } = this.props.auth;
    let riderItems;

    if (riders === null || loading) {
      riderItems = <Spinner />;
    } else {
      if (riders.length > 0) {
        riderItems = riders.map(rider => (
          <RiderProfileItem key={rider._id} rider={rider} user={user} />
        ));
      } else {
        riderItems = <h4>No rider profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Riders Profiles</h1>
              <p className="lead text-center">
                See Your All Riders Here
              </p>
              {riderItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RiderProfiles.propTypes = {
  getRiderProfiles: PropTypes.func.isRequired,
  getRiders: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getRiderProfiles, getRiders })(RiderProfiles);
