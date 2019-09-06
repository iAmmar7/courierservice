import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CountUp from 'react-countup';

import { getPackages } from '../../actions/packageActions';

import Spinner from '../common/Spinner';
import isEmpty from '../../validation/is-empty';

class Statistics extends Component {
  componentWillMount() {
    this.props.getPackages();
  }

  render() {
    const { packages } = this.props.profile;

    let delivered = 0, returned = 0, pending = 0, income = 0;

    if (isEmpty(packages)) {
      delivered = 0; returned = 0; pending = 0; income = 0;

    } else {
      for (let i in packages) {
        if (packages[i].status === "delivered") {
          delivered++;
          income += packages[i].cod;
        } else if (packages[i].status === "returned") {
          returned++;
        } else if (packages[i].status === "pending") {
          pending++;
        }
      };
    }

    console.log(delivered, returned, pending, income)

    return (
      <section className="statistic statistic2">
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <div className="statistic__item statistic__item--green">
              <h2 className="number">
                <CountUp start={50000} end={delivered} delay={1} duration={3} />
              </h2>
              <span className="desc">Delivered</span>
              <div className="icon">
                <i className="zmdi zmdi-cloud-done"></i>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="statistic__item statistic__item--orange">
              <h2 className="number">
                <CountUp start={50000} end={pending} delay={1} duration={3} />
              </h2>
              <span className="desc">Pending</span>
              <div className="icon">
                <i className="zmdi zmdi-network-warning"></i>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="statistic__item statistic__item--red">
              <h2 className="number">
                <CountUp start={50000} end={returned} delay={1} duration={3} />
              </h2>
              <span className="desc">Returned</span>
              <div className="icon">
                <i className="zmdi zmdi-minus-circle-outline"></i>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="statistic__item statistic__item--blue">
              <h2 className="number">
                <CountUp start={500000} end={income} prefix="PKR " delay={1} duration={3} />
              </h2>
              <span className="desc">total earnings</span>
              <div className="icon">
                <i className="zmdi zmdi-money"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

Statistics.propTypes = {
  getPackages: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getPackages })(Statistics);