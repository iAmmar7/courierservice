import React from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { removePackage, setPackage, getPackages } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import axios from 'axios';

class AllPackages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Customer Name', field: 'customername' },
        { title: 'Customer Phone', field: 'customerphone' },
        { title: 'Address', field: 'address' },
        { title: 'Arrival Date', field: 'arrivaldate', type: 'date' },
        {
          title: 'Vendor Name',
          field: 'vendorname',
          // lookup: { 1: 'ABC', 2: 'XYZ', 3: 'HIJ' },
        },
        { title: 'COD', field: 'cod', type: 'numeric' },
        { title: 'DC', field: 'dc', type: 'numeric' },
        { title: 'Delivery Date', field: 'deliverdate', type: 'date' },
        {
          title: 'Rider Name',
          field: 'ridername',
          // lookup: { 1: 'ABC', 2: 'XYZ', 3: 'HIJ' }
        },
        {
          title: 'Status',
          field: 'status',
          // lookup: { 34: 'Delivered', 63: 'Pending', 98: 'Returned' }
          lookup: { true: 'true', false: 'false' }
        }
      ],
      data: props.data
    };

    this.deletePackage = this.deletePackage.bind(this);
    this.getPackage = this.getPackage.bind(this);
  }

  deletePackage(packageId) {
    console.log(packageId);

    // Call Action
    // this.props.removePackage(packageId);

    axios.delete(`/api/profile/all-packages/${packageId}`)
      .then(res =>
        console.log(res)
      )
      .catch(err =>
        console.log(err)
      );
  }

  getPackage(obj) {
    console.log(obj);

    // this.props.history.push("/add-package");
    // Call Action
    this.props.setPackage(obj, this.props.history);
  }

  formatDate = date => {
    let formattedDate = date.toString().split('T')[0];
    formattedDate = new Date(formattedDate);
    formattedDate = `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`;
    return formattedDate;
  }

  render() {
    const { loading, packageEdit } = this.props.profile;
    const { data } = this.state;
    let packageContent;

    console.log(packageEdit)
    if (loading) {
      packageContent = <Spinner />
    } else if (Object.entries(data).length === 0 && data.constructor === Object) {
      packageContent = <Spinner />
    } else {

      for (let i in data) {
        if (data[i].arrivaldate) {
          data[i].arrivaldate = this.formatDate(data[i].arrivaldate);
        }
        if (data[i].deliverdate) {
          data[i].deliverdate = this.formatDate(data[i].deliverdate);
        }
      }

      packageContent =
        <MaterialTable
          title="Recent Packages"
          columns={this.state.columns}
          data={this.state.data}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.data];
                  data.push(newData);
                  this.setState({ ...this.state.data, data });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.getPackage(newData);
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
      <div>
        {packageContent}
      </div>
    );
  }
}

AllPackages.propTypes = {
  removePackage: PropTypes.func.isRequired,
  setPackage: PropTypes.func.isRequired,
  getPackages: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  error: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, { removePackage, setPackage, getPackages })(withRouter(AllPackages));
