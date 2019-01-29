import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
});

/*  Now when we want to call it from our REACT COMPONENT then we will use 
    this.props.auth
    this.props.errors
    this.props.profile
    always remeber these reducer name to use it in REACT.
    But first we will need to use a function in our react component called
    mapStateToProps, so that it will set the STATE OF REDUX into REACT STATE
    and then we will use these.
*/