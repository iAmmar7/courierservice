import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_RIDERS,
  GET_RIDER_PROFILES,
  GET_VENDORS,
  GET_VENDOR_PROFILES,
  GET_PACKAGES,
  SET_PACKAGE
} from '../actions/types';

const initialState = {
  profile: null,
  riders: {},
  vendors: {},
  packages: {},
  // profiles: null,
  packageEdit: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      }
    case GET_RIDERS:
      return {
        ...state,
        riders: action.payload,
        loading: false
      }
    case GET_RIDER_PROFILES:
      return {
        ...state,
        riders: action.payload,
        loading: false
      };
    case GET_VENDORS:
      return {
        ...state,
        vendors: action.payload,
        loading: false
      }
    case GET_VENDOR_PROFILES:
      return {
        ...state,
        vendors: action.payload,
        loading: false
      };
    case GET_PACKAGES:
      return {
        ...state,
        packages: action.payload,
        loading: false
      };
    case SET_PACKAGE:
      return {
        ...state,
        packageEdit: action.payload,
        loading: false
      }
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
        riders: null
      }
    default:
      return state;
  }
}