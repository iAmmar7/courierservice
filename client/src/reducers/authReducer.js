import { SET_CURRENT_USER } from '../actions/types'
import isEmpty from '../validation/is-empty'

const initialState = {                //Displays in REDUX_DEV_TOOLS Browser
  isAuthenticated: false,
  user: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    default: 
      return state;
  }
}

/*
  1-this "action.payload" means a variable called "payload" exist in "action object"
    and this action comes from the REDUX ACTION when we call "dispatch" in our
    action. So payload is comming from the action and this reducer will update the
    store with updated user state.

  2-Remember, when i call an action and update user in the reducer, then the user
    object will show in the REDUX DEV TOOLS' user variable.
    But how can i access those values?? Since i have send my user into authReducer
    and authReducer is nothing but an object in "auth" (see reducers/index.js) so
    now i can access all the values/states of this reducer in REACT component 
    by using:
        this.props.auth.user
        this.props.auth.isAuthenticated     (used in Login component)
    But remember, first we need to map the state to props.
*/