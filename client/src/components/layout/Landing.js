import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4 text-white"> Courier Service
                </h1>
                <p className="lead"> Manage your Courier Service with ease </p>
                <hr />
                <Link to="/login" className="btn btn-lg btn-dark py-2 px-4 mr-2">Login</Link>
                <Link to="/register" className="btn btn-lg btn-light">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { Landing })(Landing);