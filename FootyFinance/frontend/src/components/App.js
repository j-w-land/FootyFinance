import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import Table from "./leaguetable/Table";
import Alerts from "./layout/Alerts";
import IncomeStatementTable from "./fs_tables/IncomeStatement";
import CollapsibleTable from "./fs_tables/mockUp";

import { Provider } from "react-redux";
import store from "../store";

const history = createBrowserHistory();

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center",
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Fragment>
            <Header />
            <Alerts />
            <div className="container">
              <CollapsibleTable />
              <IncomeStatementTable />
              {/*<Table />*/}
            </div>
          </Fragment>
        </AlertProvider>
      </Provider>
    );
  }
}
import { format } from "url";

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("app")
);
