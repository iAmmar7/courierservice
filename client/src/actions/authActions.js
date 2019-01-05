import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
  .then(res => history.push('/login'))      // 1-Details
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios.post('/api/users/login',userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);          // 2-Details
      //  Decode Token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in User
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded  
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future request
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
}

//dispatch function inside the registerUser function

//  1- to go from one route to anohter route is easy in React Component:
//  this.props.history.push('/login');
//  but we cant really do that here because we are in ACTIONS (REDUX)
//  we will pass registerUser another variable in Register.js so that
//  we can catch that over here with 'react-route-dom' "withRouter"

//  2- Token is in Bearer form (Remember POSTMAN header Authorization) it means it is
//  is in long string form, so to extract a user from that string we need to
//  install jwt-decoder. Which decoded that long string bearer token.