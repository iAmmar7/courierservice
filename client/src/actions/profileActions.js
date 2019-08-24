import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_DATA_FOR_EDIT,
  REMOVE_DATA_FOR_EDIT
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
        type: GET_ERRORS,
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

// Delete Account & Profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can not be undone!')) {
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

// Set Data for Edit
export const setDataForEdit = (obj, history, id) => dispatch => {
  dispatch(setProfileLoading());
  dispatch({
    type: SET_DATA_FOR_EDIT,
    payload: obj
  })
  if (id === "package") {
    history.push('/add-package');
  } else if (id === "rider") {
    history.push('/add-rider');
  } else if (id === "vendor") {
    history.push('/add-vendor');
  }
  dispatch(setProfileLoading());
}

// Remove Package for Edit
export const removeDataForEdit = () => dispatch => {
  dispatch({
    type: REMOVE_DATA_FOR_EDIT
  })
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