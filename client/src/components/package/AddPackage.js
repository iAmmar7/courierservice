import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { addPackage, getVendors, getRiders, removePackageForEdit } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import isEmpty from '../../validation/is-empty';

class AddPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: props.packageData,
      vendorname: '',
      customername: '',
      customerphone: '',
      address: '',
      arrivaldate: '',
      ridername: '',
      deliverdate: '',
      cod: '',
      dc: '',
      status: 'pending',
      errors: {},
      hashValue: 'Add Package'
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getVendors();
    this.props.getRiders();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }

    const { packageEdit } = this.props.profile;

    if (Object.entries(packageEdit).length === 0 && packageEdit.constructor === Object) {
      this.setState({
        hashValue: 'Add Package'
      })
    } else {
      this.setState({
        vendorname: packageEdit.vendorname,
        customername: packageEdit.customername,
        customerphone: packageEdit.customerphone.toString(),
        address: packageEdit.address,
        arrivaldate: packageEdit.arrivaldate,
        ridername: packageEdit.ridername,
        deliverdate: packageEdit.deliverdate,
        cod: isEmpty(packageEdit.cod) ? packageEdit.cod : packageEdit.cod.toString(),
        dc: isEmpty(packageEdit.dc) ? packageEdit.dc : packageEdit.dc.toString(),
        status: packageEdit.status,
        hashValue: 'Edit Package'
      })
    }
  }

  componentWillUnmount() {
    this.props.removePackageForEdit();
  }

  onSubmit(e) {
    e.preventDefault();

    let packageData;

    const { packageEdit } = this.props.profile;

    if (Object.entries(packageEdit).length > 0 && packageEdit.constructor === Object) {
      // packageData.customerphone = packageData.customerphone.toString();
      // packageData.dc = packageData.dc.toString();
      // packageData.cod = packageData.cod.toString();

      console.log(packageEdit._id);
      packageData = {
        vendorname: this.state.vendorname,
        customername: this.state.customername,
        customerphone: this.state.customerphone,
        address: this.state.address,
        arrivaldate: this.state.arrivaldate,
        ridername: this.state.ridername,
        deliverdate: this.state.deliverdate,
        cod: this.state.cod,
        dc: this.state.dc,
        status: this.state.status,
        _id: packageEdit._id
      };

    } else {
      packageData = {
        vendorname: this.state.vendorname,
        customername: this.state.customername,
        customerphone: this.state.customerphone,
        address: this.state.address,
        arrivaldate: this.state.arrivaldate,
        ridername: this.state.ridername,
        deliverdate: this.state.deliverdate,
        cod: this.state.cod,
        dc: this.state.dc,
        status: this.state.status
      };
    }

    console.log(packageData)

    // Call an action
    this.props.addPackage(packageData, this.props.history);

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  getDropdownList(arr) {
    var list = [{ label: "* Choose...", value: '' }]

    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        list = [...list, { label: arr[i].name, value: arr[i].name }];
      }
    } else {
      list = []
    }
    console.log(list);
    return list;
  }

  render() {
    const { errors } = this.props;
    const { vendors, riders, loading } = this.props.profile;
    console.log(this.props.profile);

    let vendorSelection = this.getDropdownList(vendors);
    let riderSelection = this.getDropdownList(riders);
    let allVendors, allRiders;

    if (vendors === {} || loading) {
      allVendors = <Spinner />
    } else {
      allVendors = (
        <SelectListGroup
          name="vendorname"
          options={vendorSelection}
          value={this.state.vendorname}
          onChange={this.onChange}
          error={errors.vendorname}
          info="Select a vendor from whom this package is recieved"
        />
      );
    }

    if (riders === {} || loading) {
      allRiders = <Spinner />
    } else {
      allRiders = (
        <SelectListGroup
          name="ridername"
          options={riderSelection}
          value={this.state.ridername}
          onChange={this.onChange}
          error={errors.ridername}
          info="Select a rider who delivered this package"
        />
      );
    }

    return (
      <div>
        <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">{this.state.hashValue}</h1>
                <p className="lead text-center">
                  Let's get some information to add new package to our database
                </p>
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>
                  {allVendors}
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
                    type="number"
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
                  {allRiders}
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
                  <SelectListGroup
                    name="status"
                    options={[{ label: "Pending", value: "pending" }, { label: "Delivered", value: "delivered" }, { label: "Returned", value: "returned" }]}
                    value={this.state.status}
                    onChange={this.onChange}
                    error={errors.status}
                    info="Progress of this Package"
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
  addPackage: PropTypes.func.isRequired,
  getRiders: PropTypes.func.isRequired,
  getVendors: PropTypes.func.isRequired,
  removePackageForEdit: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {
  addPackage,
  getRiders,
  getVendors,
  removePackageForEdit
})(withRouter(AddPackage));