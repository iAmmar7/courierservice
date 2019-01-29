import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';    //connects REACT with REDUX
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {                        //REDUX state errors
      this.setState({errors: nextProps.errors})
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value}); 
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    // Call the ACTION
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;  //const errors = this.state.errors

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup 
                  placeholder="Name"
                  name="name"
                  // type="text"    No need that, we set it default
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup 
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup 
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup 
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Making these properties from REDUX for REACT Component Usable
Register.propTypes = {                      //This is REACT
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

// Map redux state into react component
const mapStateToProps = (state) => ({
  auth: state.auth,                   //This auth comes from a Reducer (index.js)
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));


/*1-A container is a REACT COMPONENT which works with REDUX.

  2-componentWillTakeProps(nextProps) means when component take props it will
    render again, so what we are doing, we are setting the REDUX STATE ERRORS
    to COMPONENT STATE ERRORS, so that we don't need to change our whole
    component properties everywhere. 

  3-withRouter() is used because we are pushing to login when register is
    successful using authReducer. Since we are checking our axios respone in
    REDUX ACTION so we need this "withRouter from react-router-dom" so that
    we can use 'history.push(./login)' in our action.
    Otherwise to redirect in a component, simply, if we applied axios response in this
    component then we can easily use 'this.props.history.push(./login)'. This could
    do the same.

  4-componentDidMount() checks if the user is logged in, so there is no sense in going
  to Resister, Login and Landing if the user is logged in. In all three components
  we sent the user to Dashboard everytime he tries to go to these 3 pages using URL.
*/