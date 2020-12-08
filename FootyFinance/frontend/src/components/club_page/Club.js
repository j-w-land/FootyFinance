import React, {
  Component,
  Fragment,
  useState,
  useEffect,
  useRef,
  forwardRef,
} from "react";
import ReactDOM from "react-dom";
import store from "../../store";
import { connect, useSelector, useDispatch } from "react-redux";
import BSSummary from "../gridLayouts/BSSummary";

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

import { ThemeProvider } from "@material-ui/core/styles";
//import CssBaseline from "@material-ui/core/CssBaseline";
//import MaterialDashboard from "../css/material-dashboard-react-master/src/index";

import { get_FS_Data_years, searchClubs } from "../../actions/fs_data";
import { getClubs } from "../../actions/clubs";

import MyResponsiveLine from "../nivo/Line";
import BarWithLine from "../nivo/BarWithLine";
import MyTreeMap from "../nivo/TreeMap";
import useWindowDimensions from "../general/Window";

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

  //console.log("resolveUrl_TESTT_resObj");
  //console.log(resObj);
  return resObj;
};

export /* default*/ function Club(props) {
  let location = useLocation();
  //console.log("LOCATION_TEST__");
  //console.log(location);

  let clubsSelected = location.pathname;
  //console.log(clubsSelected);
  clubsSelected = clubsSelected.substr(
    clubsSelected.indexOf('/club/clubs:"') + 1
  );
  console.log("clubsSelected_CLUB_TEST");
  console.log(clubsSelected);

  let urlParamsData = useParams().params;
  const paramsResolved = resolveUrl(useParams().params);
  console.log(paramsResolved.club);

  const clubsStatus = useSelector((state) => state.clubs.clubs.status);
  //const clubs = store.getState().clubs.clubs.data.slice(0, 24);

  //const [clubs, setClubs] = useState(null);
  let clubId = "TEST_START";
  const [clubIdInt, setClubIdInt] = useState("");

  const [setUpPLGraphLine, setSetUpPLGraphLine] = useState({
    fslis: get_fslis_setup("PLGraphLine"),
    page: "Club",
    element: "PLGraphLine",
    years: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
    tableTitle: "Revenue & Profit/Loss evolution",
    tableType: "SingleClubPLGraphLine",
    clubsSelected: [paramsResolved.club],
    clubsSelectedId: null,
    tableColumnTitles: ["year"],
    storeRef: "Club/" + paramsResolved.club,
    axisLeft: {
      unit: "amount",
      itemsType: "FSLIS",
      items: ["revenue"],
      items_ids: [28],
    },
    //axisRight: null,
    axisRight: {
      unit: "percentage",
      itemsType: "FSLIS",
      items: ["Profit"],
      items_ids: [44],
    },
    axisBottom: { unit: "year", itemsType: "years", items: "years" },
    dataKey: { yVal: "financial_statement_line_id", xVal: "fiscal_year" },

    //tableRowTitles: [""],
  });

  const [setUpBSTreeMap, setSetUpBSTreeMap] = useState({
    fslis: [get_fslis_setup("BS")],
    page: "Club",
    element: "BSTreeMap",
    years: [2017, 2018],
    tableTitle: "Balance Sheet TreeMap",
    tableType: "ClubTreeMap",
    clubsSelected: [paramsResolved.club],
    clubsSelectedId: null,
    clubsArray: [],
    tableColumnTitles: null,
    storeRef: "Club/" + paramsResolved.club,
    axisLeft: null,
    axisRight: null,
    axisBottom: null,
    dataKey: null,
    structure: ["year", "club", "fsli"],
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
      clubId = await searchClubs(paramsResolved.club, clubs);

      console.log("clubId_TEST___:clubid: " + clubId);
      clubId = clubId.id;
      console.log("clubId_TEST___:clubid: " + clubId);
      setClubIdInt(clubId);
      let setUpPLGraphLineObject = setUpPLGraphLine;
      setUpPLGraphLineObject.clubsSelectedId = clubId;
      setSetUpPLGraphLine(setUpPLGraphLineObject);
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

        obj = { fiscal_year: "", club_id: "" };

        obj.fiscal_year = yearsArray[item];
        obj.club_id = clubId;
        financial_years_selected_objects.push(obj);

        console.log(obj);
      }
      console.log("financial_years_selected_objects");
      console.log(financial_years_selected_objects);

      const res = await store.dispatch(
        get_FS_Data_years(
          financial_years_selected_objects,
          "Club/" + paramsResolved.club
        )
      );
      //await store.dispatch(getClubs());
      console.log("CLUB__get_FS_Data_years__TEST___");
      console.log(res);
    }
    fetchData();

    //console.log("fetchData_done_get_FSLI_items!!FILTER");
  }, [clubsStatus]);

  console.log("clubId__TEST__END");
  clubIdInt;
  console.log(clubId);
  console.log(clubIdInt);

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
    page: "club_IS",
    years: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
    tableTitle: "Income Statement",
    tableType: "SingleClub",
    clubsSelected: [paramsResolved.club],
    tableColumnTitles: ["year"],
    //tableRowTitles: [""],
  });
  const [setUpBS, setSetUpBS] = useState({
    fslis: get_fslis_setup("BS"),
    page: "club_BS",
    years: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
    tableTitle: "Balance Sheet",
    tableType: "SingleClub",
    clubsSelected: [paramsResolved.club],
    tableColumnTitles: ["year"],
    //tableRowTitles: [""],
  });

  const [setUpBSSummary, setSetUpBSSummary] = useState({
    fslis: get_fslis_setup("BS"),
    page: "club_BS",
    element: "BSSummary,",
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
    tableTitle: "Balance Sheet overview",
    tableType: "BSSummary",
    clubsSelected: [paramsResolved.club],
    tableColumnTitles: ["year"],
    storeRef: "Club/" + paramsResolved.club,
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

  const myRef = useRef(null);
  const [windowChange, setWindowChange] = useState(1);
  useEffect(() => {
    //const { offsetHeight } =  componentRef;
    console.log("componentRef_height", myRef); //componentRef);
    setWindowChange((change) => change * -1);
  }, [/* componentRef.current */ myRef, useWindowDimensions()]);

  return (
    <div className="container">
      <h1>{setUpIS.clubsSelected[0]}</h1>

      {/*  <div className="container" style={{ height: 400, position: "relative" }}>
        <h5>{setUpPLGraphLine.tableTitle}</h5>
     
        <BarWithLine
          state={{ setUp: [setUpPLGraphLine, setSetUpPLGraphLine] }}
        />
      </div> */}

      {/*  <div className="container">
        <BSSummary
          width={windowChange}
          ref={myRef}
          state={{ setUp: [setUpBSSummary, setSetUpBSSummary] }}
        />
      </div> */}

      <div className="container" style={{ height: 500, position: "relative" }}>
        <MyTreeMap state={{ setUp: [setUpBSTreeMap, setSetUpBSTreeMap] }} />
      </div>

      {/* <div className="container">
        <FSTableFilter state={{ setUp: [setUpIS, setSetUpIS] }} />
        <FinancialStatementTable state={{ setUp: [setUpIS, setSetUpIS] }} />
        <FSTableFilter state={{ setUp: [setUpBS, setSetUpBS] }} />
        <FinancialStatementTable state={{ setUp: [setUpBS, setSetUpBS] }} />
      </div> */}
    </div>
  );
}

/*


* */

const mapStateToProps = (state) => ({
  fs_data: state.fs_data,
  /* fs_data: state.fs_data.fs_data_years,
  fs_data: state.fs_data.fs_data_years_test,*/
});

export default connect(mapStateToProps, {
  get_FS_Data_years,
  getClubs,
})(Club);
