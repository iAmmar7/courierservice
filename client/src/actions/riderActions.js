import axios from 'axios';

import {
  GET_PROFILE,
  GET_ERRORS,
  GET_RIDERS,
  GET_RIDER_PROFILES
} from './types';

import { setProfileLoading } from './profileActions';

// Get Riders
export const getRiders = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile/all-riders')
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
  axios.post('/api/profile/add-rider', riderData)
    .then(res => history.goBack())
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Get all rider profiles
export const getRiderProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all-riders')
    .then(res =>
      dispatch({
        type: GET_RIDER_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RIDER_PROFILES,
        payload: null
      })
    );
};
