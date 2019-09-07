import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { pathname } = window.location;

    const authLinks = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              to="/dashboard"
              className="nav-link"
              activeClassName="active">
              Dashboard
            </NavLink>
          </li>

          {/* Packages Link */}
          <li className="nav-item dropdown">
            <button className={classnames("nav-link dropdown-toggle", {
              "active": pathname === '/add-package'
            })}
              id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Package
            </button>
            <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
              <NavLink
                to="/add-package"
                className="dropdown-item text-secondary"
                activeClassName="bg-white text-dark active">
                Add Package
              </NavLink>
            </div>
          </li>

          {/* Vendors Link */}
          <li className="nav-item dropdown">
            <button className={classnames("nav-link dropdown-toggle", {
              "active": pathname === '/add-vendor' || pathname === '/all-vendors' || pathname === '/all-vendors/vendor'
            })}
              id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Vendor
            </button>
            <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
              <NavLink
                to="/all-vendors"
                className="dropdown-item text-secondary"
                activeClassName="bg-white text-dark active">
                Vendors Profile
              </NavLink>
              <NavLink
                to="/add-vendor"
                className="dropdown-item text-secondary"
                activeClassName="bg-white text-dark active">
                Add Vendor
              </NavLink>
            </div>
          </li>

          {/* Riders Link */}
          <li className="nav-item dropdown">
            <button className={classnames("nav-link dropdown-toggle", {
              "active": pathname === '/add-rider' || pathname === '/all-riders' || pathname === '/all-riders/rider'
            })}
              id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Rider
            </button>
            <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
              <NavLink
                to="/all-riders"
                className="dropdown-item text-secondary"
                activeClassName="bg-white text-dark active">
                Riders Profile
              </NavLink>
              <NavLink
                to="/add-rider"
                className="dropdown-item text-secondary"
                activeClassName="bg-white text-dark active">
                Add Rider
              </NavLink>
            </div>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              href="/login"
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link">
              <img
                className="rounded-circle"
                src={user.avatar}
                alt={user.name}
                style={{ width: '25px', marginRight: '5px' }}
              />
              Logout
          </a>
          </li>
        </ul>
      </div>
    );

    const guestLinks = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink to="/register" className="nav-link" activeClassName="active">Sign Up</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
          </li>
        </ul>
      </div>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <Link className="navbar-brand" to="/">CourierService</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar));