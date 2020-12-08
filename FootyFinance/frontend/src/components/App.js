import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import "./index.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import Table from "./leaguetable/Table";
import Alerts from "./layout/Alerts";
import Paper from "@material-ui/core/Paper";
import FinancialStatementTable from "./fs_tables/FinancialStatement";
import { IncomeStatementTable as IncomeStatementTable_backup } from "./fs_tables/back_up_IncomeStatement copy";

import CollapsibleTable from "./fs_tables/mockUp";

import { Provider } from "react-redux";
import store from "../store";

import { ThemeProvider } from "@material-ui/core/styles";
//import CssBaseline from "@material-ui/core/CssBaseline";
//import MaterialDashboard from "../css/material-dashboard-react-master/src/index";
import theme from "../theme";

import FSTable from "./fs_tables/FSTable";
import Club from "./club_page/Club";
import League from "./league_page/League";
import Home from "./home/Home";

import {
  get_FS_Data,
  get_FSLI_items,
  init_row_data,
  init_headCells,
  get_FS_Data_years,
  setFiltersAction,
  getFiltersActionIndex,
} from "../actions/fs_data";
import { getClubs } from "../actions/clubs";

const history = createBrowserHistory();

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center",
};

let loader_content = <div className="loader">Loading...</div>;

async function fetchData() {
  const res = await store.dispatch(get_FSLI_items());
  await store.dispatch(getClubs());
  console.log("GETFSLIS_FETCH");
  console.log(res);
}

fetchData();

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            {/*<Fragment>
              <section>{loader_content}</section>
            </Fragment>*/}

            <Header />
            <Fragment>
              <Alerts />

              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/club/:params" component={Club} />
                <Route path="/league/:params" component={League} />
                <Route path="/league/" component={League} />
              </Switch>
            </Fragment>
          </AlertProvider>
        </Provider>
      </ThemeProvider>
    );
  }
}
import { format } from "url";

/*
<div className="container">
</div>


const mapStateToProps = (state) => ({
  fs_data: state.fs_data,

});

export default connect(mapStateToProps, {
  get_FSLI_items,
})(App);
*/

//store.dispatch(get_FSLI_items());
//basename="/static"
ReactDOM.render(
  <Router basename="/" history={history}>
    <App />
  </Router>,
  document.getElementById("app")
);
