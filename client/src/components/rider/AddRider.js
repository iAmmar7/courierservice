import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { addRider } from '../../actions/riderActions';

class AddRider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      contact: '',
      chargesperdelivery: '',
      hiredate: Date.now(),
      errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const riderData = {
      name: this.state.name,
      contact: this.state.contact,
      chargesperdelivery: this.state.chargesperdelivery,
      hiredate: this.state.hiredate
    };

    // Call an action
    this.props.addRider(riderData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Add Rider</h1>
                <p className="lead text-center">
                  Let's add some information to hire a new rider
                </p>
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="* Rider Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                    info="A name of your new rider"
                  />
                  <TextFieldGroup
                    placeholder="* Contact"
                    name="contact"
                    type="number"
                    value={this.state.contact}
                    onChange={this.onChange}
                    error={errors.contact}
                    info="Phone number of new rider"
                  />
                  <TextFieldGroup
                    placeholder="Charges Per Delivery"
                    name="chargesperdelivery"
                    type="number"
                    value={this.state.chargesperdelivery}
                    onChange={this.onChange}
                    error={errors.chargesperdelivery}
                    info="An amount that a rider will charge per delivery"
                  />
                  <TextFieldGroup
                    name="hiredate"
                    type="date"
                    value={this.state.hiredate}
                    onChange={this.onChange}
                    error={errors.hiredate}
                    info="When did you hire this rider?"
                  />
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.riders,
  errors: state.errors
})

AddRider.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { addRider })(withRouter(AddRider));