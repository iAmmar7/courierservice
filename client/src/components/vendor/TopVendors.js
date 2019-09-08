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
      for (var i in packages) {
        for (var j in vendors) {
          if (packages[i].vendor === vendors[j]._id) {
            packages[i].vendorname = vendors[j].name;
          }
        }
      }

      //Extract Rider Name from Rider ID
      for (var k in packages) {
        for (var l in riders) {
          if (packages[k].rider === riders[l]._id) {
            packages[k].ridername = riders[l].name;
          }
        }
      }

      // Count Vendors packages
      for (var m in packages) {
        if (!vendorTable[packages[m].vendorname]) {
          vendorTable[packages[m].vendorname] = 1;
        } else {
          vendorTable[packages[m].vendorname]++;
        }
      }
      topVendors = Object.keys(vendorTable).map((item, key) => {
        return (
          <tr key={key}>
            <td style={{ fontSize: '16px' }}><strong>{item}</strong></td>
            <td style={{ color: "#00B26F", fontSize: '16px' }}>{vendorTable[item]} pckgs</td>
          </tr>
        )
      })
    }

    return (
      <div className="col-md-12 col-lg-4" style={{ height: 'auto' }}>
        <div className="px-4 py-3 bg-stats">
          <h3 className="h5 text-white">Top Vendors</h3>
          <div className="table-responsive" style={{ height: '300px' }}>
            <table className="table table-top-campaign" style={{ height: 'auto' }
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