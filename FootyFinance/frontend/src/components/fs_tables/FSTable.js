import React, { Component, Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Paper from "@material-ui/core/Paper";
import { lighten, makeStyles } from "@material-ui/core/styles";

import FinancialStatementTable from "./FinancialStatement";
import FSTableFilter from "./FSTableFilter";
import { get_fslis_IS, get_fslis_setup } from "./SetUpForTabels";

import {
  get_FS_Data,
  get_FSLI_items,
  init_row_data,
  init_headCells,
  get_FS_Data_years,
  setFiltersAction,
  getFiltersActionIndex,
} from "../../actions/fs_data";
import { getClubs } from "../../actions/clubs";
import { connect } from "react-redux";

import { ThemeProvider } from "@material-ui/core/styles";

import AreaBump from "../nivo/AreaBump";
//import CssBaseline from "@material-ui/core/CssBaseline";
//import MaterialDashboard from "../css/material-dashboard-react-master/src/index";

export function FSTable(props) {
  const classes = useStyles();

  const [filters, setFilters] = useState({ years: [2018] });
  console.log("fslis_IS");
  console.log(get_fslis_setup("IS"));

  /*  const [setUp, setSetUp] = useState({
    fslis: get_fslis_setup("IS"),
    page: "FSTable",
    years: [2018],
    tableTitle: "Income Statement",
    tableType: "MultiClub",
  }); */

  const {
    setUp: [setUp, setSetUp],
  } = {
    setUp: useState([]),
    ...(props.state || {}),
  };

  useEffect(() => {
    async function fetchData() {
      //await props.get_FSLI_items();
    }
    fetchData();
    console.log("fetchData_done_get_FSLI_items!!");
  }, []);

  return (
    <div className="container">
      {/*<Paper>*/}
      <FSTableFilter state={{ setUp: [setUp, setSetUp] }} />
      <FinancialStatementTable state={{ setUp: [setUp, setSetUp] }} />
      {/*</Paper>*/}
    </div>
  );
}

const mapStateToProps = (state) => ({
  fs_data: state.fs_data.fs_data,
});

export default connect(mapStateToProps, {
  get_FSLI_items,
})(FSTable);

//<div className="container">

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(12),
  },
}));
