import axios from 'axios';

import {
  GET_PROFILE,
  GET_ERRORS,
  GET_VENDORS,
  GET_VENDOR_PROFILES
} from './types';

import { setProfileLoading } from './profileActions';

// Get all vendor profiles
export const getVendorProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all-vendors')
    .then(res =>
      dispatch({
        type: GET_VENDOR_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_VENDOR_PROFILES,
        payload: null
      })
    );
};

// Get Vendors
export const getVendors = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile/all-vendors')
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
  axios.post('/api/profile/add-vendor', vendorData)
    .then(res => history.goBack())
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}