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
        },
        topPanel: {
          paddingBottom: '0px'
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

    let table;
    if (this.state.data === undefined) {
      table = <Spinner />
    } else {
      if (this.state.data.length > 0) {
        table = <AllPackages data={this.state.data} />
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
            <Typography className={classes.heading}>{this.props.heading}</Typography>
          </ExpansionPanelSummary>
          <div>
            <ExpansionPanelDetails className={classes.topPanel}>
              {table}
            </ExpansionPanelDetails>
            <ExpansionPanelDetails>
              <div className="btn-group" role="group" aria-label="...">
                <button type="button" className="btn btn-success mr-4 dummy-btn">
                  Delivered <span className="badge badge-light">14</span>
                </button>
                <button type="button" className="btn btn-danger">
                  Returned <span className="badge badge-light">4</span>
                </button>
              </div>
            </ExpansionPanelDetails>
          </div>
        </ExpansionPanel>
      </div>
    );
  }
}

export default SimpleExpansionPanel;