import React, { Component, Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import store from "../../store";
import { connect, useSelector, useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  useLocation,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { generatePath } from "react-router";
import { createBrowserHistory } from "history";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import FinancialStatementTable from "../fs_tables/FinancialStatement";
import FSTableFilter from "../fs_tables/FSTableFilter";
import { get_fslis_IS, get_fslis_setup } from "../fs_tables/SetUpForTabels";
import FSTable from "../fs_tables/FSTable";

import { ThemeProvider } from "@material-ui/core/styles";
//import CssBaseline from "@material-ui/core/CssBaseline";
//import MaterialDashboard from "../css/material-dashboard-react-master/src/index";

import { get_FS_Data_years, searchClubs } from "../../actions/fs_data";
import { getClubs } from "../../actions/clubs";

import MyResponsiveLine from "../nivo/Line";
import BarWithLine from "../nivo/BarWithLine";
import AreaBump from "../nivo/AreaBump";

const resolveUrl = (path) => {
  let res = "";

  for (const letter in path) {
    if (path[letter] == "+") {
      res = res + " ";
    } else {
      res = res + path[letter];
    }
  }

  res = res.split("&");
  res.shift();

  let resObj = {};

  for (const item in res) {
    let val = res[item].split("=");
    Object.defineProperty(resObj, val[0], {
      value: val[1],
    });
  }

  console.log("resolveUrl_TESTT_resObj");
  console.log(resObj);
  return resObj;
};

export /* default*/ function League(props) {
  let location = useLocation();
  //console.log("LOCATION_TEST__");
  //console.log(location);

  /*
  let clubsSelected = location.pathname;


  clubsSelected = clubsSelected.substr(
    clubsSelected.indexOf('/club/clubs:"') + 1
  );
  console.log("clubsSelected_CLUB_TEST");
  console.log(clubsSelected);
*/
  let urlParamsData = useParams().params;
  const paramsResolved = resolveUrl(useParams().params);
  console.log("paramsResolved__TEST");
  console.log(paramsResolved);

  const clubsStatus = useSelector((state) => state.clubs.clubs.status);
  //const clubs = store.getState().clubs.clubs.data.slice(0, 24);

  //const [clubs, setClubs] = useState(null);
  let leagueName = "";
  try {
    leagueName = paramsResolved.league;
  } catch (error) {}

  let clubId = "TEST_START";
  const [clubIdInt, setClubIdInt] = useState("");

  const [setUpRevenueAreaBump, setSetUpRevenueAreaBump] = useState({
    fslis: [28],
    page: "League",
    element: "RevenueAreaBump",
    years: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
    tableTitle: "Revenue evolution",
    tableType: "LeagueAreaBump",
    clubsSelected: [],
    clubsSelectedId: null,
    clubsArray: [],
    tableColumnTitles: ["year"],
    storeRef: "League/" + paramsResolved.league,
    axisLeft: {
      unit: "amount",
      itemsType: "FSLIS",
      items: ["revenue"],
      items_ids: [28],
    },
    //axisRight: null,
    axisRight: null /*{
      unit: "percentage",
      itemsType: "FSLIS",
      items: ["Profit"],
      items_ids: [42],
    }*/,
    axisBottom: { unit: "year", itemsType: "years", items: "years" },
    dataKey: { yVal: "financial_statement_line_id", xVal: "fiscal_year" },
    elementHeight: 400,

    //tableRowTitles: [""],
  });

  const [setUpPLAreaBump, setSetUpPLAreaBump] = useState({
    fslis: [44],
    page: "League",
    element: "P/LAreaBump",
    years: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
    tableTitle: "P/L share evolution",
    tableType: "LeagueAreaBump",
    clubsSelected: [],
    clubsSelectedId: null,
    clubsArray: [],
    tableColumnTitles: ["year"],
    storeRef: "League/" + paramsResolved.league,
    axisLeft: {
      unit: "amount",
      itemsType: "FSLIS",
      items: ["Profit/Loss"],
      items_ids: [44],
    },
    //axisRight: null,
    axisRight: null /*{
      unit: "percentage",
      itemsType: "FSLIS",
      items: ["Profit"],
      items_ids: [42],
    }*/,
    axisBottom: { unit: "year", itemsType: "years", items: "years" },
    dataKey: { yVal: "financial_statement_line_id", xVal: "fiscal_year" },
    elementHeight: 400,

    //tableRowTitles: [""],
  });

  useEffect(() => {
    console.log("clubsStatus_CHANGE");
    console.log(clubsStatus);
    async function fetchData() {
      if (clubsStatus == "idle") {
        return;
      }
      const clubs = store.getState().clubs.clubs.data; //.slice(0, 24);
      console.log("clubsStatus_CHANGE_RES");
      //console.log(res);
      //setClubs(res);

      console.log(clubsStatus);
      console.log(clubs);
      if (clubs == [] || clubs == null) {
        console.log(clubs);
        console.log("CLUBS_NOT_FETCHED");
        return;
      }
      console.log("CLUBS_NOT_FETCHED_NOTTTT");
      //const clubs = store.getState().clubs.clubs.data;

      console.log(paramsResolved.club);
      console.log(clubs);
      console.log("clubId_TEST___");
      let setUpRevenueAreaBumpObject = setUpRevenueAreaBump;
      let setUpPLAreaBumpObject = setUpPLAreaBump;

      setUpRevenueAreaBumpObject.clubsArray = clubs;
      setUpPLAreaBumpObject.clubsArray = clubs;

      setSetUpRevenueAreaBump(setUpRevenueAreaBumpObject);
      setSetUpPLAreaBump(setUpPLAreaBumpObject);

      //clubId = await searchClubs(paramsResolved.club, clubs);

      //console.log("clubId_TEST___:clubid: " + clubId);
      //clubId = clubId.id;
      //console.log("clubId_TEST___:clubid: " + clubId);
      //setClubIdInt(clubId);
      //let setUpPLGraphLineObject = setUpPLGraphLine;
      //setUpPLGraphLineObject.clubsSelectedId = clubId;
      //setSetUpPLGraphLine(setUpPLGraphLineObject);
      const yearsArray = [
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
      ];
      const financial_years_selected_objects = [];
      let obj = {};

      for (const item in yearsArray) {
        console.log("fiscal_year_YEAR: " + yearsArray[item]);

        obj = { fiscal_year: "" };

        obj.fiscal_year = yearsArray[item];
        //obj.club_id = clubId;

        financial_years_selected_objects.push(obj);

        console.log(obj);
      }
      console.log("financial_years_selected_objects");
      console.log(financial_years_selected_objects);

      const res = await store.dispatch(
        get_FS_Data_years(
          financial_years_selected_objects,
          "League/" + paramsResolved.league
        )
      );
      //await store.dispatch(getClubs());
      console.log("CLUB__get_FS_Data_years__TEST___");
      console.log(res);
    }
    fetchData();

    //console.log("fetchData_done_get_FSLI_items!!FILTER");
  }, [clubsStatus]);

  /* console.log("clubId__TEST__END");
  
  clubIdInt;
  console.log(clubId);
  console.log(clubIdInt);*/

  const getPath = generatePath("/club/:clubs/:years/:dogs", {
    clubs: "clubs=Manchester+United,Arsenal,Chelsea",
    years: "years=2017,2018",
    dogs: "dogs=TEROO",
  });
  //console.log("getPath_TEST__");
  //console.log(getPath);

  let match = useRouteMatch("/club/:slug");
  let useRouteMatchObj = useRouteMatch();
  const { url } = useRouteMatch();
  /*
  console.log("useRouteMatch__TEST__");
  console.log(match);
  console.log(url);
  console.log("useRouteMatchObj");
  console.log(useRouteMatchObj);*/

  // const [filters, setFilters] = useState({ years: [2018, 2017] });
  const [filters, setFilters] = useState({ years: [2018, 2017] });
  /*
  console.log("urlParamsData");
  console.log(urlParamsData);

  
  console.log("paramsResolved");
  console.log(paramsResolved);

  console.log("fslis_IS_CLUBS");
  console.log(get_fslis_setup("BS"));
  console.log("fslis_IS_CLUBS_FIN");
  */

  const [setUpIS, setSetUpIS] = useState({
    fslis: get_fslis_setup("IS"),
    page: "LeagueIS",
    element: "IS",
    years: [2018],
    tableTitle: "Income Statement",
    tableType: "MultiClub",
    // clubsSelected: [paramsResolved.club],
    //tableColumnTitles: ["year"],
    //tableRowTitles: [""],
  });
  const [setUpBS, setSetUpBS] = useState({
    fslis: get_fslis_setup("BS"),
    page: "LeagueBS",
    element: "BS",
    years: [2018],
    tableTitle: "Balance Sheet",
    tableType: "MultiClub",
    //clubsSelected: [paramsResolved.club],
    //tableColumnTitles: ["year"],
    //tableRowTitles: [""],
  });

  /*
  const [setUpPLGraphLine, setSetUpPLGraphLine] = useState({
    fslis: get_fslis_setup("PLGraphLine"),
    page: "Club",
    element: "PLGraphLine",
    years: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
    tableTitle: "Revenue & Profit/Loss evolution",
    tableType: "SingleClubPLGraphLine",
    clubsSelected: [paramsResolved.club],
    clubsSelectedId: [clubIdInt],
    tableColumnTitles: ["year"],
    storeRef: "Club/" + paramsResolved.club,
    axisLeft: { unit: "amount", itemsType: "FSLIS", items: "revenue" },
    axisRight: { unit: "percentage", itemsType: "FSLIS", items: "P/L" },
    axisBottom: { unit: "year", itemsType: "years", items: "years" },

    //tableRowTitles: [""],
  });
  */

  return (
    <div className="container">
      <h1> {leagueName}</h1>

      <div
        style={{
          height: setUpRevenueAreaBump.elementHeight,
          position: "relative",
        }}
      >
        <h5>{setUpRevenueAreaBump.tableTitle}</h5>
        <AreaBump
          state={{ setUp: [setUpRevenueAreaBump, setSetUpRevenueAreaBump] }}
        />
      </div>

      <div
        style={{
          height: setUpPLAreaBump.elementHeight,
          position: "relative",
        }}
      >
        <h5>{setUpPLAreaBump.tableTitle}</h5>
        <AreaBump state={{ setUp: [setUpPLAreaBump, setSetUpPLAreaBump] }} />
      </div>

      <div>
        <FSTable state={{ setUp: [setUpIS, setSetUpIS] }} />
      </div>
      <div>
        <FSTable state={{ setUp: [setUpBS, setSetUpBS] }} />
      </div>
    </div>
  );
}

/*

********
<div>
        <FSTable />
      </div>
      ***************
 <div style={{ height: setUpPLAreaBump.elementHeight }}>
        <AreaBump state={{ setUp: [setUpPLAreaBump, setSetUpPLAreaBump] }} />
      </div>

* */

const mapStateToProps = (state) => ({
  fs_data: state.fs_data,
  /* fs_data: state.fs_data.fs_data_years,
  fs_data: state.fs_data.fs_data_years_test,*/
});

export default connect(mapStateToProps, {
  get_FS_Data_years,
  getClubs,
})(League);
