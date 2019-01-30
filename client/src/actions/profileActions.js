import axios from 'axios';

import { 
  GET_PROFILE, 
  PROFILE_LOADING, 
  CLEAR_CURRENT_PROFILE, 
  GET_ERRORS, 
  SET_CURRENT_USER, 
  GET_RIDERS,
  GET_VENDORS,
  GET_PACKAGES
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile')
    .then(res => 
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
}

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios.post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Get Riders
export const getRiders = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile/all_riders')
    .then(res => 
      dispatch({
        type: GET_RIDERS,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
}

// Add Rider
export const addRider = (riderData, history) => dispatch => {
  axios.post('/api/profile/add_rider', riderData)
    .then(res =>history.push('/dashboard'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Get Vendors
export const getVendors = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile/all_vendors')
    .then(res => 
      dispatch({
        type: GET_VENDORS,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
}

// Add Vendor
export const addVendor = (vendorData, history) => dispatch => {
  axios.post('/api/profile/add_vendor', vendorData)
    .then(res => history.push('/dashboard'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Get Packages
export const getPackages = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile/all_packages')
    .then(res => 
      dispatch({
        type: GET_PACKAGES,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
}

// Add Package
export const addPackage = (packageData, history) => dispatch => {
  axios.post('/api/profile/add_package', packageData)
    .then(res => history.push('/dashboard'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Delete Account & Profile
export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure? This can not be undone!')) {
    axios.delete('/api/profile')
      .then(res => 
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err => 
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }) 
      );
  }
}

// Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

// Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}