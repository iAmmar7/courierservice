import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';

import { removeDataForEdit } from '../../actions/profileActions';
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
      hashValue: "Add Vendor",
      tagLine: "Let's add some information to add a new vendor",
      loading: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const { editData } = this.props.profile;

    if (editData !== undefined) {
      if (Object.entries(editData).length > 0 && editData.constructor === Object) {
        this.setState({
          name: editData.name,
          contact: editData.contact,
          address: editData.address,
          hiredate: editData.hiredate,
          hashValue: 'Edit Vendor',
          tagLine: "Edit your vendor information here!"
        })
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false });

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  componentWillUnmount() {
    this.props.removeDataForEdit();
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ loading: true });

    let vendorData;

    const { editData } = this.props.profile;

    if (Object.entries(editData).length > 0 && editData.constructor === Object) {
      vendorData = {
        name: this.state.name,
        contact: this.state.contact.toString(),
        address: this.state.address,
        hiredate: this.state.hiredate,
        _id: editData._id
      };
      let newDate = new Date(this.state.hiredate);
      vendorData.hiredate = newDate;

    } else {
      vendorData = {
        name: this.state.name,
        contact: this.state.contact,
        address: this.state.address,
        hiredate: this.state.hiredate
      }
    }

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
                <h1 className="display-4 text-center">{this.state.hashValue}</h1>
                <p className="lead text-center">{this.state.tagLine}</p>
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
                    value={this.state.contact.toString()}
                    onChange={this.onChange}
                    error={errors.contact}
                    info="Phone number of new vendor"
                  />
                  <TextFieldGroup
                    placeholder="Charges Per Delivery"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChange}
                    error={errors.address}
                    info="Address of your new vendor"
                  />
                  <TextFieldGroup
                    name="hiredate"
                    type="date"
                    value={this.state.hiredate.toString()}
                    onChange={this.onChange}
                    error={errors.hiredate}
                    info="When did you add this vendor?"
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
  profile: state.profile,
  errors: state.errors
})

AddVendor.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addVendor: PropTypes.func.isRequired,
  removeDataForEdit: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { addVendor, removeDataForEdit })(withRouter(AddVendor));