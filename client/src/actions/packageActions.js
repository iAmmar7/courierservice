import axios from 'axios';

import {
  GET_ERRORS,
  GET_PACKAGES,
  SET_PACKAGE_FOR_EDIT,
  REMOVE_PACKAGE_FOR_EDIT
} from './types';

import { setProfileLoading } from './profileActions';

// Get Packages
export const getPackages = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile/all-packages')
    .then(res =>
      dispatch({
        type: GET_PACKAGES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    );
}

// Set Package for Edit
export const setPackageForEdit = (obj, history) => dispatch => {
  dispatch(setProfileLoading());
  dispatch({
    type: SET_PACKAGE_FOR_EDIT,
    payload: obj
  })
  history.push('/add-package');
  dispatch(setProfileLoading());
}

// Remove Package for Edit
export const removePackageForEdit = () => dispatch => {
  dispatch({
    type: REMOVE_PACKAGE_FOR_EDIT
  })
}

// Add Package
export const addPackage = (packageData, history) => dispatch => {
  axios.post('/api/profile/add-package', packageData)
    .then(res => history.goBack())
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Edit Package
export const editPackage = packageData => dispatch => {
  axios.post('/api/profile/add-package', packageData)
    .then(res => console.log("Succeed", res))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Delete Package
export const removePackage = (packageID) => dispatch => {
  axios.delete(`/api/profile/all-packages/${packageID}`)
    .then(res =>
      dispatch({
        type: GET_PACKAGES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}