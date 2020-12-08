import React, { Component, useEffect, useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import "core-js/stable";
import "regenerator-runtime/runtime";
import store from "../../store";
import "cross-fetch/polyfill";
import Collapse from "@material-ui/core/Collapse";
import { BrowserRouter as Router, Link } from "react-router-dom";

import {
  get_FS_Data,
  get_FSLI_items,
  init_row_data,
  init_headCells,
  get_FS_Data_years,
  setFiltersAction,
  getFiltersActionIndex,
  searchClubs,
  init_row_data_SingleClub,
  initTableData,
} from "../../actions/fs_data";
import { getClubs } from "../../actions/clubs";
import { connect, useSelector, useDispatch } from "react-redux";

//import { Table as DashTable } from "../css/material-dashboard-react-master/src/components/Table/Table.js";
import { styles as tableStyles } from "../../css/material-dashboard-react-master/src/assets/jss/material-dashboard-react/components/tableStyle.js";
import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont,
} from "../../css/material-dashboard-react-master/src/assets/jss/material-dashboard-react.js";

import FSTableFilter from "./FSTableFilter";
import MultipleSelect from "./FSTableFilter";

function createData2(data_array) {
  console.log("createData2");
  console.log(data_array);
  let res_object = {};
  for (const item in data_array) {
    Object.defineProperty(res_object, data_array[item].name, {
      value: data_array[item].data,
    });
  }
  console.log(res_object);
  return res_object;
}

function createData2_SingleClub(data_array) {
  console.log("createData2_SingleClub");
  console.log(data_array);
  let res_object = {};
  for (const item in data_array) {
    Object.defineProperty(res_object, data_array[item].name, {
      value: data_array[item].data,
    });
  }

  return res_object;
}

function createObject(data_array) {
  let obj_keys = Object.getOwnPropertyNames(obj);
  Object.defineProperty(res_object, data_array[item].name, {
    value: data_array[item].data,
  });

  return res_object;
}

function createData(
  name,
  operating_revenue,
  operating_P_L,
  financial_P_L,
  P_L_before_tax,
  taxation,
  P_L_after_tax
) {
  return {
    name,
    operating_revenue,
    operating_P_L,
    financial_P_L,
    P_L_before_tax,
    taxation,
    P_L_after_tax,
  };
}

/*
const fslis_selected_all = [];
for (let int1 = 1; int1 < 53; int1++) {
  fslis_selected_all.push(int1);
}
*/

let fslis_selected = [];
//const financial_years_selected = [2016 /*, 2017, 2018*/];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const getTableAttributes = (tableType) => {
  //console.log("tableAttributes_type: " + tableType);

  const Default = {
    headCells1: { id: "name", label: "" },
    tableOrientation: { columns: "clubs", rows: "fslis" },
  };

  const SingleClub = {
    headCells1: { id: "name", label: "Financial Statement", year: true },
    tableOrientation: { columns: "clubs", rows: "fslis" },
  };

  const MultiClub = {
    headCells1: { id: "name", label: "Clubs", year: false },
    tableOrientation: { columns: "fslis", rows: "clubs" },
  };

  switch (tableType) {
    case "SingleClub":
      return SingleClub;
    case "MultiClub":
      return MultiClub;
    default:
      return null;
  }
};

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    page,
    fslis,
    fslis_selected,
    tableAttributesObj,
    headCellValues,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  console.log(props);
  console.log("EnhancedTableHead_props");

  //const fslis = store.getState().fs_data.fslis.data;

  let headCells_res = init_headCells(props.fslis, props.fslis_selected);

  const headCells = [
    {
      id: tableAttributesObj.id, // "name",
      numeric: false,
      disablePadding: true,
      label: tableAttributesObj.label, //"Club",
    },
  ];

  // + tableAttributesObj.year ? headCellValues[item].year  : ""

  for (const item in headCellValues) {
    /*
    let year = "";
    if (tableAttributesObj.year) year = headCellValues[item].year;
    */
    let data_item = {
      id: headCellValues[item].id,
      numeric: true,
      disablePadding: false,
      label: headCellValues[item].name,
    };
    headCells.push(data_item);
  }

  //console.log(headCells_res);
  //console.log(headCells);

  console.log("TABLEHEAD_RETURN");

  return (
    <TableHead page={page}>
      <TableRow>
        {/*<TableCell> */}
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.tableCell}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {/* </TableCell> */}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  page: PropTypes.string.isRequired,
  fslis: PropTypes.array.isRequired,
  fslis_selected: PropTypes.array.isRequired,
  tableAttributesObj: PropTypes.object.isRequired,
  headCellValues: PropTypes.array.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, tableTitle } = props;

  //console.log(tableTitle);

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableTitle}
        </Typography>
      )}

      {
        numSelected > 0 ? (
          /*?*/ <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null /*: (
        <Tooltip title="Filter list">
          
          <IconButton aria-label="filter list">
            <FilterListIcon />
        </IconButton>
        </Tooltip>
      )*/
      }
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  tableTitle: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(),
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
    fontSize: "0.6rem",
  },
  /* tableStyle.js:: */
  warningTableHeader: {
    color: warningColor[0],
  },
  primaryTableHeader: {
    color: primaryColor[0],
  },
  dangerTableHeader: {
    color: dangerColor[0],
  },
  successTableHeader: {
    color: successColor[0],
  },
  infoTableHeader: {
    color: infoColor[0],
  },
  roseTableHeader: {
    color: roseColor[0],
  },
  grayTableHeader: {
    color: grayColor[0],
  },
  table: {
    marginTop: "0",
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse",
  },
  tableHeadCell: {
    color: "inherit",
    ...defaultFont,
    "&, &$tableCell": {
      fontSize: "1em",
      /*textAlign: "center",*/
    },
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.32857143", //"1.42857143"
    padding: "2px 2px",
    verticalAlign: "middle",
    fontSize: "0.75rem" /*"0.8125rem"*/,
  },
  tableCellValue: {
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "0px 0px",
    verticalAlign: "middle",
    fontSize: "0.8rem" /*"0.8125rem"*/,
    /*textAlign: "center",*/
  },
  tableResponsive: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  tableHeadRow: {
    height: "56px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle",
  },
  tableBodyRow: {
    height: "20px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle",
  },
  tableBody: {},
  /* TableStyle.js ends*/
}));

let dataState = false;

export const dataStateSet = () => {
  dataState = !dataState;
};

let financial_years_selected = [];
//let filter_settings = [];

let fsdataStatus = "idle";
let getFslisStatus = "idle";

export function FinancialStatementTable(props) {
  const {
    setUp: [setUp, setSetUp],
  } = {
    setUp: useState([]),
    ...(props.state || {}),
  };

  console.log("FinancialStatementTable_setup_props");
  console.log(setUp);

  const dispatch = useDispatch();

  //const postStatus = useSelector((state) => state.posts.status);

  try {
    fsdataStatus = store.getState().fs_data.fs_data_years_test2[setUp.page]
      .status;
  } catch (error) {
    fsdataStatus = "idle";
  }

  try {
    getFslisStatus = store.getState().fs_data.fslis.status;
  } catch (error) {
    getFslisStatus = "idle";
  }

  /*
  useEffect(() => {
    async function fetchData() {
      //await props.getClubs();
      //await props.get_FSLI_items();
    }
    fetchData();
  }, [setUp]);
  */

  const fslis = store.getState().fs_data.fslis.data;

  //let fslis_res = useSelector((state) => state.fs_data.fslis);

  const [dataFetchState, setdataFetchState] = useState(null);
  const [fsdata_years_res_state, set_fsdata_years_res] = useState();

  const filter_name = "state.fs_data.filters";

  let filter_settings = useSelector(
    (state) => state.fs_data.filters[setUp.page]
  );

  let filter_settings_item = [];
  try {
    filter_settings_item = filter_settings[0];
  } catch (error) {}

  let clubs = [];
  try {
    clubs = filter_settings_item.clubs.slice(0, 24);
  } catch (error) {}

  let clubsSelectedFilter = [];
  //DELL????
  try {
    clubsSelectedFilter = filter_settings_item.clubsSelected;
  } catch (error) {}
  //DELL????end

  let clubsSelected = [];

  if (clubsSelectedFilter == undefined) {
    clubsSelected = clubs;
  } else {
    for (const item in clubsSelectedFilter) {
      let res = searchClubs(clubsSelectedFilter[item], clubs);
      //console.log("clubsSelectedArray_TEST_RES:");
      //console.log(res);
      if (res != undefined) clubsSelected.push(res);
    }
  }

  console.log(clubsSelected);
  console.log(filter_settings_item);
  console.log(clubsSelectedFilter);
  console.log("clubsSelectedFilter_TEST__");

  const clubs2 = store.getState().clubs.clubs.data.slice(0, 24);

  const {
    filters: [filters, setFitlers],
  } = {
    filters: useState(2018),
    ...(props.state || {}),
  };

  useEffect(() => {
    if (filter_settings == undefined) {
      return;
    }
    async function fetchData() {
      fslis_selected = filter_settings_item.fslis;

      let financial_years_selected_objects = [];
      //let obj = { fiscal_year: "" };
      let obj = {};
      /*
      Object.defineProperty(obj, "fiscal_year", {
        value: "",
        writable: true,
      });
      */

      if (
        filter_settings_item.page == "club_BS" ||
        filter_settings_item.page == "club_IS"
      ) {
        console.log("SE_ON_CLUB__BS");
        console.log(clubsSelected);
        for (const club in clubsSelected) {
          for (const item in filter_settings_item.years) {
            console.log(
              "fiscal_year_YEAR: " + filter_settings_item.years[item]
            );
            /*
            let obj = { fiscal_year: "" };
            
            */
            //obj.fiscal_year = filter_settings_item.years[item];

            /*
            let obj = {};

            Object.defineProperty(obj, "fiscal_year", {
              value: filter_settings_item.years[item],
            });
            */

            /*
            Object.defineProperty(obj, "club_id", {
              value: clubsSelected[club].id.toString(),
              writable: true,
            });
            */

            obj = { fiscal_year: "", club_id: "" };

            obj.fiscal_year = filter_settings_item.years[item];
            obj.club_id = clubsSelected[club].id;
            financial_years_selected_objects.push(obj);

            console.log(obj);
          }
          console.log("financial_years_selected_objects");
          console.log(financial_years_selected_objects);
        }
      } else {
        for (const item in filter_settings_item.years) {
          obj = { fiscal_year: "" };

          obj.fiscal_year = filter_settings_item.years[item];
          financial_years_selected_objects.push(obj);
        }
      }

      await props.get_FS_Data_years(
        financial_years_selected_objects,
        setUp.page
      );
    }
    fetchData();
  }, [filter_settings]);

  let rows_holder = [];
  let columns_holder = [];
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const rows_array = [];
  const columns_array = [];

  //let fs_data_array = [];
  const [fs_data_array, set_fs_data_array] = useState([]);

  //console.log("fsdata_years_res_testX");
  const fsdata_years_res = store.getState().fs_data.fs_data_years_test[
    setUp.page
  ];
  //console.log("fsdata_years_res");

  //console.log(fsdata_years_res);

  //let headCells_res1 = null;

  let tableAttributesObj = getTableAttributes(setUp.tableType);

  const headCells1 = [
    {
      id: tableAttributesObj.headCells1.id, // "name",
      numeric: false,
      disablePadding: true,
      label: tableAttributesObj.headCells1.label, // "club",
    },
  ];

  //let row_data_res_array_holder = []; DELL
  //const [row_data_res_array, set_row_data_res_array] = useState([]); DELL

  //
  useEffect(() => {
    if (fsdata_years_res == undefined) return;
    let fs_data_array_item = [];

    for (const item in filter_settings_item.years) {
      let fy_res_obj = { year: "", data: [] };
      let fsdata_res = "";

      fy_res_obj.year = filter_settings_item.years[item];

      fy_res_obj.data = fsdata_years_res[item];
      fs_data_array_item.push(fy_res_obj);
    }
    set_fs_data_array(fs_data_array_item);
  }, [fsdata_years_res]);

  /****************************************************************/
  const [headCells_res1, set_headCells_res1] = useState(null);

  useEffect(() => {
    let resfsli = init_headCells(fslis, filter_settings_item.fslis);

    set_headCells_res1(resfsli);
    /**/
  }, [fslis, fs_data_array]);

  //console.log("headCells_res1");
  //console.log(headCells_res1);
  let tableData = { rows: [], columns: [] };
  let tableData2;
  useEffect(() => {
    for (const item in headCells_res1) {
      let data_item = {
        id: headCells_res1[item].tag,
        numeric: true,
        disablePadding: false,
        label: headCells_res1[item].name,
      };
      headCells1.push(data_item);
    }

    for (const item in fs_data_array) {
      tableData = initTableData(
        setUp,
        tableData,
        setUp.page,
        fslis,
        fs_data_array[item].data,
        clubsSelected,
        filter_settings_item.fslis,
        headCells1,
        tableAttributesObj.tableOrientation,
        fs_data_array[item].year
      );
      //setRows(tableData.rows);

      rows_array.push(tableData.rows);

      columns_array.push(tableData.columns);

      /* DELL
      let row_data_res = init_row_data(
        fs_data_array[item].data,
        clubsSelected,
        filter_settings_item.fslis,
        headCells1
      );
      row_data_res_array_holder.push(row_data_res);

      */
    }
    //console.log(rows_array);
    //console.log(columns_array);
    //console.log("rows_array_columns_array");

    //POISTAA::
    /*
    set_row_data_res_array(row_data_res_array_holder);

    for (const year_item in row_data_res_array_holder) {
      let row_array_item = [];
      for (const item in clubsSelected) {
        let data_array = [];
        let data_object = { name: "", data: [] };

        for (const row_item in row_data_res_array_holder[year_item]) {
          data_object = {};
          data_object.name =
            row_data_res_array_holder[year_item][row_item].name;
          data_object.data =
            row_data_res_array_holder[year_item][row_item].data[item];
          data_array.push(data_object);
        }
        row_array_item.push(createData2(data_array));
      }
      //rows_array.push(row_array_item);
    }
    */
    /***POISAAA END */

    rows_holder = tableData.rows[0] != undefined ? tableData.rows : [];
    columns_holder = tableData.columns[0] != undefined ? tableData.columns : [];

    setRows(rows_holder);
    setColumns(columns_holder);
    /**/
  }, [headCells_res1]);

  useEffect(() => {
    let rowsPerPageValue = rows.length < 101 ? rows.length : 25;
    console.log("rowsPerPageValue");
    setRowsPerPage(rowsPerPageValue);
  }, [rows]);

  /****************************************************************/

  //console.log("ROWS_DONE__COLS");
  //console.log(rows);
  //console.log(columns);

  //******************************** CREATE ROW ARRAY /

  //******************************** CREATE ROW ARRAY ends/

  //rowsPerPageOptions={ [5, 10, 25, 100]}
  const rowsOptions = [];
  //if (rows.length < 6) rowsOptions = []

  if (rows.length > 5) rowsOptions.push(5);
  if (rows.length > 10) rowsOptions.push(10);
  if (rows.length > 25) rowsOptions.push(25);
  if (rows.length > 100) rowsOptions.push(100);

  rowsOptions.push(rows.length);
  console.log(rowsOptions);
  //let rowsPerPageValue = rows.length < 51 ? rows.length : 25;
  //console.log(rowsPerPageValue);
  //setRowsPerPage(rowsPerPageValue);
  console.log("rowsOptions");

  const classes = useStyles();
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("operating_revenue");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10); //90

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  console.log(rows.length);
  console.log(emptyRows);
  console.log("RETURN_STARTS");
  //console.log("rows_data:");
  //console.log(rows);
  console.log("rowsPerPage_TEST__");
  console.log(rowsPerPage);

  let content;

  if (fsdataStatus == "succeeded" && getFslisStatus == "succeeded") {
    content = (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            tableTitle={setUp.tableTitle}
          />

          <TableContainer className={classes.container}>
            <Table
              aria-label="enhanced table" /* enhanced*/
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                page={setUp.page}
                fslis={fslis} //JWTODO
                fslis_selected={filter_settings_item.fslis}
                tableAttributesObj={tableAttributesObj.headCells1}
                headCellValues={columns}
              />

              {/*
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 1 }}>
                  {financial_years_selected[1] + "XX"}
                </TableCell>
              </TableRow>
            */}
              {/* <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}> */}
              {/*<Collapse in={true} timeout="auto" unmountOnExit>*/}

              <TableBody className={classes.tableBody}>
                {stableSort(
                  rows /*rows_array[0]*/,
                  getComparator(order, orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    let obj = rows[index];
                    let row_elements_arr = Object.getOwnPropertyNames(obj).map(
                      function (e) {
                        return obj[e];
                      }
                    );
                    row_elements_arr.shift();
                    // console.log("row_elements_arr");
                    //console.log(row_elements_arr);
                    try {
                      //console.log("rows_testi");
                      //console.log(rows[0]);
                    } catch (err) {
                      console.log("TableBody_err: \n" + err);
                    }

                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    /**component={Link}
                        to={`/club/&club=${row.name}/`} */

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                        className={classes.tableBodyRow} //tableStyle
                      >
                        <TableCell
                          padding="checkbox"
                          className={classes.tableCell} //tableStyle
                        >
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        {/* MULTICLUB */}
                        {
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            className={classes.tableCell}
                          >
                            <Link to={`/club/&club=${row.name}/`}>
                              {row.name}
                            </Link>
                          </TableCell>
                        }
                        {/*(console.log("ROW_TESTI_"), console.log(row))*/}
                        {/*console.log(Object.getOwnPropertyNames(row))*/}

                        {Object.getOwnPropertyNames(row)
                          .slice(1)
                          .map((keyName, i) => (
                            <TableCell
                              align="right"
                              className={classes.tableCellValue}
                              key={keyName + "-" + i}
                            >
                              {/*
                                (console.log("keyName_test: " + row[keyName]),
                                console.log(row[keyName]),
                                console.log(keyName),
                                console.log("row_XXX: " + row))*/}
                              {row[keyName]}{" "}
                            </TableCell>
                          ))}
                        {/* MULTICLUB ENDS*/}
                        {/* SINGLECLUB */}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={16} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={rowsOptions} //{ [5, 10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </div>
    );
  } else if (fsdataStatus == "idle") {
    content = (
      <Paper className={classes.paper}>
        <div className="loader">Loading...</div>
      </Paper>
    );
  } else if (getFslisStatus == "idle") {
    content = (
      <Paper className={classes.paper}>
        <div className="loader">Loading...</div>
      </Paper>
    );
  }

  //content = <div className="loader">Loading...</div>;

  return content;
}

const mapStateToProps = (state) => ({
  fs_data: state.fs_data,
  /* fs_data: state.fs_data.fs_data_years,
  fs_data: state.fs_data.fs_data_years_test,*/
});

export default connect(mapStateToProps, {
  get_FS_Data,
  get_FSLI_items,
  get_FS_Data_years,
  getClubs,
  setFiltersAction,
  getFiltersActionIndex,
})(FinancialStatementTable);
