import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import AddRider from './components/rider/AddRider';
import AllRiders from './components/rider/AllRiders';
import RiderProfile from './components/rider/RiderProfile';
import AddVendor from './components/vendor/AddVendor';
import AllVendors from './components/vendor/AllVendors';
import VendorProfile from './components/vendor/VendorProfile';
import AddPackage from './components/package/AddPackage';

import './css/App.css';
import './css/theme.css';

// Check for Token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expression
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to Login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-rider" component={AddRider} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-vendor" component={AddVendor} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-package" component={AddPackage} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/all-riders" component={AllRiders} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/all-vendors" component={AllVendors} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/all-riders/rider" component={RiderProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/all-vendors/vendor" component={VendorProfile} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;


/*
  Why do we need authentication, jwt-decoder etc in App.js??
  The reason is if we set our user here then every time he reload or comes from
  another or go to another page, the App.js will have access to token which is
  stored in localStorage. So the user will always be logged in if the token is
  there.
  And then we the token of a user expires that if condition checks it and
  redirect it to ./login page if token is expired.

  Switch is used to redirect in protected route. That's how user it takes us
  ./login page when user.isAuthenticated is false.
 */