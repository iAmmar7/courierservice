import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { addVendor } from '../../actions/vendorActions';

class AddVendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      contact: '',
      address: '',
      hiredate: Date.now(),
      errors: {},
      loading: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false });

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ loading: true });

    const vendorData = {
      name: this.state.name,
      contact: this.state.contact,
      address: this.state.address,
      hiredate: this.state.hiredate
    };

    // Call an action
    this.props.addVendor(vendorData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { errors } = this.state;

    let button;
    if (this.state.loading) {
      button = <button type="button" className="btn btn-secondary btn-block mt-4 disabled">Loading...</button>
    } else {
      button = <button type="submit" value="Submit" className="btn btn-dark btn-block mt-4">Submit</button>
    }

    return (
      <div>
        <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Add Vendor</h1>
                <p className="lead text-center">
                  Let's add some information of our new vendor
                </p>
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="* Vendor Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                    info="A name of your new vendor"
                  />
                  <TextFieldGroup
                    placeholder="* Contact"
                    name="contact"
                    type="number"
                    value={this.state.contact}
                    onChange={this.onChange}
                    error={errors.contact}
                    info="Phone number of new vendor"
                  />
                  <TextFieldGroup
                    placeholder="* Address"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChange}
                    error={errors.address}
                    info="Address of new vendor"
                  />
                  <TextFieldGroup
                    name="hiredate"
                    type="date"
                    value={this.state.hiredate}
                    onChange={this.onChange}
                    error={errors.hiredate}
                    info="When did this vendor hire you?"
                  />
                  {button}
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
  profile: state.vendors,
  errors: state.errors
})

AddVendor.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { addVendor })(withRouter(AddVendor));