import React from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setDataForEdit } from '../../actions/profileActions';
import { getPackages, editPackage } from '../../actions/packageActions';

import Spinner from '../common/Spinner';
import axios from 'axios';

class AllPackages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Customer Name', field: 'customername' },
        { title: 'Customer Phone', field: 'customerphone', type: 'numeric' },
        { title: 'Address', field: 'address' },
        { title: 'Arrival Date', field: 'arrivaldate' },
        {
          title: 'Vendor Name',
          field: 'vendorname',
          // lookup: { 1: 'ABC', 2: 'XYZ', 3: 'HIJ' },
        },
        { title: 'COD', field: 'cod', type: 'numeric' },
        { title: 'DC', field: 'dc', type: 'numeric' },
        { title: 'Delivery Date', field: 'deliverdate' },
        {
          title: 'Rider Name',
          field: 'ridername',
          // lookup: { 1: 'ABC', 2: 'XYZ', 3: 'HIJ' }
        },
        {
          title: 'Status',
          field: 'status',
          lookup: { delivered: 'Delivered', pending: 'Pending', returned: 'Returned' }
        }
      ],
      data: props.data,
    };

    this.deletePackage = this.deletePackage.bind(this);
    this.editPackage = this.editPackage.bind(this);
    this.setPackage = this.setPackage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data })
  }

  deletePackage(packageId) {

    // Call Action
    axios.delete(`/api/profile/all-packages/${packageId}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  editPackage(data) {
    console.log(data);
    let packageData = {
      _id: data._id,
      vendorname: data.vendorname,
      customername: data.customername,
      customerphone: data.customerphone,
      address: data.address,
      arrivaldate: data.arrivaldate,
      ridername: data.ridername ? data.ridername : "",
      deliverdate: data.deliverdate ? data.deliverdate : "",
      cod: data.cod ? data.cod : "",
      dc: data.dc ? data.dc : ""
    }

    // Call Action
    this.props.editPackage(packageData);

  }

  setPackage(obj) {

    // Call Action
    this.props.setDataForEdit(obj, this.props.history, "package");
  }

  formatDate = date => {
    let formattedDate = date.toString().split('T')[0];
    formattedDate = new Date(formattedDate);
    formattedDate = `${formattedDate.getDate()}.${formattedDate.getMonth() + 1}.${formattedDate.getFullYear()}`;
    return formattedDate;
  }

  render() {
    const { loading } = this.props.profile;
    const { data } = this.state;
    let packageContent;

    if (loading) {
      packageContent = <Spinner />
    } else if (Object.entries(data).length === 0 && data.constructor === Object) {
      packageContent = <Spinner />
    } else {

      for (let i in data) {
        if (data[i].arrivaldate) {
          data[i].arrivaldate = data[i].arrivaldate.toString().split('T')[0];
        }
        if (data[i].deliverdate) {
          data[i].deliverdate = data[i].deliverdate.toString().split('T')[0];
        }
      }

      packageContent =
        <MaterialTable
          title={""}
          columns={this.state.columns}
          data={this.state.data}
          errors={this.props.errors}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.setPackage(newData);
                  // this.editPackage(newData);
                }, 600);
                const data = [...this.state.data];
                data[data.indexOf(oldData)] = newData;
                this.setState({ ...this.state.data, data });
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  console.log(oldData._id);
                  const data = [...this.state.data];
                  data.splice(data.indexOf(oldData), 1);
                  this.setState({ ...this.state.data, data });
                  this.deletePackage(oldData._id);
                }, 600);
              }),
          }}
        />
    }

    return (
      <div style={{ width: '100%' }}>
        {packageContent}
      </div>
    );
  }
}

AllPackages.propTypes = {
  setDataForEdit: PropTypes.func.isRequired,
  editPackage: PropTypes.func.isRequired,
  getPackages: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  error: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, { setDataForEdit, getPackages, editPackage })(withRouter(AllPackages));
