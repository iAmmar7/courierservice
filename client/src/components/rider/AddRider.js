import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';

import { removeDataForEdit } from '../../actions/profileActions';
import { addRider } from '../../actions/riderActions';

class AddRider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      contact: '',
      chargesperdelivery: '',
      hiredate: Date.now(),
      errors: {},
      hashValue: "Add Rider",
      tagLine: "Let's add some information to hire a new rider"
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    console.log(this.props.profile);
    const { editData } = this.props.profile;

    if (editData !== undefined) {
      if (Object.entries(editData).length > 0 && editData.constructor === Object) {
        this.setState({
          name: editData.name,
          contact: editData.contact,
          chargesperdelivery: editData.chargesperdelivery,
          hiredate: editData.hiredate,
          hashValue: 'Edit Package',
          tagLine: "Edit your rider information here!"
        })
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  componentWillUnmount() {
    this.props.removeDataForEdit();
  }

  onSubmit(e) {
    e.preventDefault();

    let riderData;

    const { editData } = this.props.profile;

    if (Object.entries(editData).length > 0 && editData.constructor === Object) {
      riderData = {
        name: this.state.name,
        contact: this.state.contact.toString(),
        chargesperdelivery: this.state.chargesperdelivery.toString(),
        hiredate: this.state.hiredate,
        _id: editData._id
      };
      let newDate = new Date(this.state.hiredate);
      riderData.hiredate = newDate;

    } else {
      riderData = {
        name: this.state.name,
        contact: this.state.contact,
        chargesperdelivery: this.state.chargesperdelivery,
        hiredate: this.state.hiredate
      }
    }

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
                <h1 className="display-4 text-center">{this.state.hashValue}</h1>
                <p className="lead text-center">{this.state.tagLine}</p>
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
                    value={this.state.contact.toString()}
                    onChange={this.onChange}
                    error={errors.contact}
                    info="Phone number of new rider"
                  />
                  <TextFieldGroup
                    placeholder="Charges Per Delivery"
                    name="chargesperdelivery"
                    type="number"
                    value={this.state.chargesperdelivery.toString()}
                    onChange={this.onChange}
                    error={errors.chargesperdelivery}
                    info="An amount that a rider will charge per delivery"
                  />
                  <TextFieldGroup
                    name="hiredate"
                    type="date"
                    value={this.state.hiredate.toString()}
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
  profile: state.profile,
  errors: state.errors
})

AddRider.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addRider: PropTypes.func.isRequired,
  removeDataForEdit: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { addRider, removeDataForEdit })(withRouter(AddRider));