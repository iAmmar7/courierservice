import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPackages } from '../../actions/packageActions';
import { getVendors } from '../../actions/vendorActions';
import { getRiders } from '../../actions/riderActions';

import Spinner from '../common/Spinner';
import isEmpty from '../../validation/is-empty';

class TopVendors extends Component {
  componentWillMount() {
    this.props.getPackages();
    this.props.getVendors();
    this.props.getRiders();
  }

  render() {
    const { loading, packages, vendors, riders } = this.props.profile;
    let topVendors, vendorTable = {};

    if (loading) {
      topVendors = <tr style={{ marginTop: '80px' }}><td><Spinner /></td></tr>;
    } else if (isEmpty(packages)) {
      topVendors = (
        <tr>
          <td>No vendors data added</td>
          <td></td>
        </tr>
      )
    } else {

      //Extract Vendor Name from Vendor ID
      for (let i in packages) {
        for (let j in vendors) {
          if (packages[i].vendor === vendors[j]._id) {
            packages[i].vendorname = vendors[j].name;
          }
        }
      }

      //Extract Rider Name from Rider ID
      for (let i in packages) {
        for (let j in riders) {
          if (packages[i].rider === riders[j]._id) {
            packages[i].ridername = riders[j].name;
          }
        }
      }

      // Count Vendors packages
      for (let i in packages) {
        if (!vendorTable[packages[i].vendorname]) {
          vendorTable[packages[i].vendorname] = 1;
        } else {
          vendorTable[packages[i].vendorname]++;
        }
      }
      topVendors = Object.keys(vendorTable).map((item, key) => {
        return (
          <tr key={key}>
            <td>{item}</td>
            <td className="h2">{vendorTable[item]} pckgs</td>
          </tr>
        )
      })
    }

    return (
      <div className="col-md-12 col-lg-4" style={{ height: '100%' }}>
        <div className="px-4 py-3 bg-stats">
          <h3 className="h5 text-white">Top Vendors</h3>
          <div className="table-responsive" style={{
            height: '300px'
          }}>
            <table className="table table-top-campaign" style={{ height: '100%' }
            } >
              <tbody>
                {topVendors}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

TopVendors.propTypes = {
  getPackages: PropTypes.func.isRequired,
  getVendors: PropTypes.func.isRequired,
  getRiders: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getPackages, getVendors, getRiders })(TopVendors);