import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AllPackages from './AllPackages';
import Spinner from '../common/Spinner';


class SimpleExpansionPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
    this.style = {
      useStyles: makeStyles(theme => ({
        root: {
          width: "100%"
        },
        heading: {
          fontSize: theme.typography.pxToRem(15),
          fontWeight: theme.typography.fontWeightRegular
        }
      }))
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    })
  }

  render() {
    const classes = this.style.useStyles;
    const { data } = this.state;
    const { salary, pending, heading, delivered, returned } = this.props;

    let table, riderOrVendor;
    if (data === undefined) {
      table = <Spinner />
    } else {
      if (data.length > 0) {
        table = <AllPackages data={data} />
        if (salary || salary === 0) {
          riderOrVendor = (
            <button className="btn btn-secondary btn-block">
              Salary <span className="badge badge-light">{salary} PKR</span>
            </button>
          )
        } else if (pending) {
          riderOrVendor = (
            <button type="button" className="btn btn-secondary px-4">
              Pending <span className="badge badge-light">{pending}</span>
            </button>
          )
        }
      } else {
        table = <Spinner />
      }
    }

    return (
      <div className={classes.root} >
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{heading}</Typography>
          </ExpansionPanelSummary>
          <div>
            <ExpansionPanelDetails>
              {table}
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="container">
              <div className="all-btn">
                <div className="col-md-4 col-lg-2">
                  <button className="btn btn-success btn-block">Delivered <span className="badge badge-light">{delivered}</span>
                  </button>
                </div>

                <div className="col-md-4 col-lg-2">
                  <button className="btn btn-danger btn-block">Returned <span className="badge badge-light">{returned}</span>
                  </button>
                </div>

                <div className="col-md-4 col-lg-2 btn-sal">
                  {riderOrVendor}
                </div>
              </div>

              {/* <div className="all-btn" role="group">
                <button type="button" className="btn btn-success mr-4 px-4">
                  Delivered <span className="badge badge-light">{delivered}</span>
                </button>
                <button type="button" className="btn btn-danger mr-4 px-4">
                  Returned <span className="badge badge-light">{returned}</span>
                </button>
                {riderOrVendor}
              </div> */}
            </ExpansionPanelDetails>
          </div>
        </ExpansionPanel>
      </div>
    );
  }
}

export default SimpleExpansionPanel;