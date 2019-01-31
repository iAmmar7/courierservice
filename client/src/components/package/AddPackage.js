import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { addPackage, getVendors, getRiders } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

class AddPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendorname: '',
      customername: '',
      customerphone: '',
      address: '',
      arrivaldate: '',
      ridername: '',
      deliverdate: '',
      cod: '',
      dc: '',
      errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getRiders();
    this.props.getVendors();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const packageData = {
      vendorname: this.state.vendorname,
      customername: this.state.customername,
      customerphone: this.state.customerphone,
      address: this.state.address,
      arrivaldate: this.state.arrivaldate,
      ridername: this.state.ridername,
      deliverdate: this.state.deliverdate,
      cod: this.state.cod,
      dc: this.state.dc
    };

    // Call an action
    this.props.addPackage(packageData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name] : e.target.value })
  }

  render() {
    const { errors } = this.state;
    const { vendors, loading } = this.props.profile;

    let vendorSelection = [ 
      {label: vendors[0].name, value: 1},
      {label: vendors[1].name, value: 2},
    ];

    // for(var i = 0; i < vendors.lenght; i++) {
    //   vendorSelection.push({ 
    //     label: vendors[i].name, 
    //     value: i
    //   });
    // }

    // Select options for vendors
    // if(vendors === {} || loading) {
    //   vendorSelection = <Spinner />
    // } else {
    //   if(vendors > 0 ) {
    //     vendorSelection = vendors.name;
    //   } else {
    //     vendorSelection = "No Vendor  found";
    //   }
    // }

    return (
      <div>
        <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Add Package</h1>
                <p className="lead text-center">
                  Let's get some information to add new package to our database
                </p>
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>
                  <SelectListGroup
                    placeholder="* Vendor Name"
                    name="vendorname"
                    value={this.state.vendorname}
                    onChange={this.onChange}
                    options={vendorSelection}
                    error={errors.vendorname}
                    info="Select a vendor from whom this package is recieved"
                  />
                  <TextFieldGroup
                    placeholder="* Customer Name"
                    name="customername"
                    value={this.state.customername}
                    onChange={this.onChange}
                    error={errors.customername}
                    info="Name of the customer"
                  />
                  <TextFieldGroup
                    placeholder="* Customer Phone"
                    name="customerphone"
                    value={this.state.customerphone}
                    onChange={this.onChange}
                    error={errors.customerphone}
                    info="Phone number of the customer"
                  />
                  <TextFieldGroup
                    placeholder="* Address"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChange}
                    error={errors.address}
                    info="Where to deliver this package?"
                  />
                  <TextFieldGroup
                    placeholder="Arrival Date"
                    name="arrivaldate"
                    type="date"
                    value={this.state.arrivaldate}
                    onChange={this.onChange}
                    error={errors.arrivaldate}
                    info="Date at which vendor gives you the package"
                  />
                  <SelectListGroup
                    placeholder="Rider Name"
                    name="ridername"
                    value={this.state.ridername}
                    onChange={this.onChange}
                    options={vendorSelection}
                    error={errors.ridername}
                    info="Select a rider who delivered this package"
                  />
                  <TextFieldGroup
                    placeholder="Deliver Date"
                    name="deliverdate"
                    type="date"
                    value={this.state.deliverdate}
                    onChange={this.onChange}
                    error={errors.deliverdate}
                    info="Date at which this package is delivered to the customer"
                  />
                  <TextFieldGroup
                    placeholder="Cash On Delivery"
                    name="cod"
                    type="number"
                    value={this.state.cod}
                    onChange={this.onChange}
                    error={errors.cod}
                    info="An amount that coustomer gives on delivery"
                  />
                  <TextFieldGroup
                    placeholder="Delivery Charges"
                    name="dc"
                    type="number"
                    value={this.state.dc}
                    onChange={this.onChange}
                    error={errors.dc}
                    info="Delivery charges on this package"
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

AddPackage.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getRiders: PropTypes.func.isRequired,
  getVendors: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {
  addPackage,
  getRiders,
  getVendors
})(withRouter(AddPackage));