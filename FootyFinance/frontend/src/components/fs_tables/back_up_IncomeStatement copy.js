import React, { Component, useEffect, useState } from "react";
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

import {
  get_FS_Data,
  get_FSLI_items,
  init_row_data,
  init_headCells,
  get_FS_Data_years,
} from "../../actions/fs_data";
import { connect, useSelector, useDispatch } from "react-redux";

function createData2(data_array) {
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
const fslis_selected = [];
for (let int1 = 1; int1 < 53; int1++) {
  fslis_selected.push(int1);
}
*/

const fslis_selected = [27, 29, 30, 31, 35, 37, 38, 41, 42];
const financial_years_selected = [2016, 2017, 2018];

function descendingComparator(a, b, orderBy) {
  //console.log("descendingComparator");
  //console.log(a);
  //console.log(b);
  //console.log(orderBy);
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  //console.log("getComparator");
  //console.log(order);
  //console.log(orderBy);
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

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  //console.log("onRequestSort_props");
  //console.log(onRequestSort);
  const createSortHandler = (property) => (event) => {
    //console.log("createSortHandler");
    //console.log(property);
    //console.log(event);
    onRequestSort(event, property);
  };

  useEffect(() => {
    async function fetchData() {
      //props.get_FSLI_items();
    }
    fetchData();
  }, []);
  const fslis = store.getState().fs_data.fslis;

  let headCells_res = init_headCells(fslis, fslis_selected);

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Club",
    },
  ];

  for (const item in headCells_res) {
    let data_item = {
      id: headCells_res[item].tag,
      numeric: true,
      disablePadding: false,
      label: headCells_res[item].name,
    };
    headCells.push(data_item);
  }
  //console.log("headCells");
  //console.log(headCells);

  return (
    <TableHead>
      <TableRow>
        <TableCell>
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
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableCell>
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
  const { numSelected } = props;

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
          Income Statement
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
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
  },
}));

export function IncomeStatementTable(props) {
  let rows = [];
  const rows_array = [];
  const headCells2 = [];
  const [state, setState] = React.useState([]);
  const dispatch = useDispatch();

  const fs_data_array = [];

  let financial_years_selected_objects = [];
  for (const item in financial_years_selected) {
    let obj = { fiscal_year: "" };
    obj.fiscal_year = financial_years_selected[item];
    financial_years_selected_objects.push(obj);
  }

  const [fsdata_years_res2, set_fsdata_years_res] = useState();
  const [dataState, setDataState] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await props.get_FS_Data_years(financial_years_selected_objects);
      //await props.get_FS_Data({ fiscal_year: 2016 });
      //await props.get_FSLI_items();
    }
    fetchData();
    console.log("fetchData_done!!");
  }, [fsdata_years_res]);
  useEffect(() => {
    async function fetchData() {
      await props.get_FS_Data({ fiscal_year: 2016 });
    }
    fetchData();
    console.log("fetchData_done!!");
  }, []);
  useEffect(() => {
    async function fetchData() {
      await props.get_FSLI_items();
    }
    fetchData();
    console.log("fetchData_done!!");
  }, []);
  /*
  useEffect(() => {
    const fetchData = async () => {
      const result = await props.get_FS_Data_years(
        financial_years_selected_objects
      );

      set_fsdata_years_res(result);
    };

    fetchData();
  }, []);
*/
  //console.log("fsdata_years_res2");
  //console.log(fsdata_years_res2);

  const clubs = store.getState().clubs.clubs.slice(0, 24);
  console.log("clubs_length");
  console.log(clubs.length);

  console.log("clubs_slice!");
  console.log(clubs);
  const fsdata = store.getState().fs_data.fs_data;
  const fslis = store.getState().fs_data.fslis;

  console.log("fsdata_v1");
  console.log(fsdata);

  const fsdata_years_res = store.getState().fs_data.fs_data_years;
  console.log("fsdata_years_res");
  console.log(fsdata_years_res);
  //fsdata_years_res.pop();

  for (const item in financial_years_selected) {
    let fy_res_obj = { year: "", data: [] };
    let fsdata_res = "";
    console.log(
      "financial_years_selected_year: " + financial_years_selected[item]
    );

    fsdata_res = store.getState().fs_data.fs_data_years;
    console.log("fsdata_res");
    console.log(fsdata_res);
    fy_res_obj.year = financial_years_selected[item];
    fy_res_obj.data = fsdata_res[item];
    fs_data_array.push(fy_res_obj);
  }
  console.log("fs_data_array:");
  console.log(fs_data_array);

  //console.log("fslis");
  //console.log(fslis);

  let headCells_res1 = init_headCells(fslis, fslis_selected);

  const headCells1 = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Club",
    },
  ];

  for (const item in headCells_res1) {
    let data_item = {
      id: headCells_res1[item].tag,
      numeric: true,
      disablePadding: false,
      label: headCells_res1[item].name,
    };
    headCells1.push(data_item);
  }

  console.log("fs_data_array[0].data");
  console.log(fs_data_array[0].data);
  let row_data_res_array = [];
  for (const item in fs_data_array) {
    let row_data_res = init_row_data(
      fs_data_array[item].data,
      clubs,
      fslis_selected,
      headCells1
    );
    row_data_res_array.push(row_data_res);
  }

  console.log("row_data_res_array");
  console.log(row_data_res_array);

  useEffect(() => {
    async function fetchData() {}
    fetchData();
    console.log("row_data_res_DONE!!");
  }, []);

  //******************************** CREATE ROW ARRAY /

  for (const year_item in row_data_res_array) {
    let row_array_item = [];
    for (const item in clubs) {
      let data_array = [];
      let data_object = { name: "", data: [] };

      for (const row_item in row_data_res_array[year_item]) {
        data_object = {};
        data_object.name = row_data_res_array[year_item][row_item].name;
        data_object.data = row_data_res_array[year_item][row_item].data[item];
        data_array.push(data_object);
      }
      row_array_item.push(createData2(data_array));
    }
    rows_array.push(row_array_item);
  }
  rows = rows_array[0];
  console.log("rows_uusi");
  console.log(rows);
  console.log(rows_array);

  //******************************** CREATE ROW ARRAY ends/

  //const obj_keys = Object.getOwnPropertyNames(rows[0]);
  /*
  let rows_keys = [];
  try {
    let obj_keys = rows[0];
    let row_keys1 = Object.getOwnPropertyNames(obj_keys);
    rows_keys.push(row_keys1);
  } catch (err) {
    //console.log("err::" + err);
  }*/

  const classes = useStyles();
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("operating_revenue");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10); //90

  const handleRequestSort = (event, property) => {
    //console.log("handleRequestSort");
    //console.log("event::" + event);
    //console.log(property);
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      //console.log("ROWS:::handleSelectAllClick");
      //console.log(rows);
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    //console.log("handleClick");
    //console.log("event: " + event);
    //console.log("name: " + name);
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

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />

        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableCell style={{ paddingBottom: 0, paddingTop: 1 }}>
              {financial_years_selected[0]}
            </TableCell>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
              <TableBody>
                {stableSort(rows_array[0], getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    let obj = rows[index];
                    let row_elements_arr = Object.getOwnPropertyNames(obj).map(
                      function (e) {
                        return obj[e];
                      }
                    );
                    row_elements_arr.shift();

                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        {
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.name}
                          </TableCell>
                        }

                        {Object.getOwnPropertyNames(row)
                          .slice(1)
                          .map((keyName, i) => (
                            <TableCell align="right">{row[keyName]}</TableCell>
                          ))}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={16} />
                  </TableRow>
                )}
              </TableBody>
            </TableCell>
            {
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 1 }}
                  colSpan={4}
                >
                  {financial_years_selected[1] + "!!"}
                </TableCell>
              </TableRow>
            }
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
              <Collapse in={true} timeout="auto" unmountOnExit>
                <TableBody>
                  {stableSort(rows_array[1], getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      let obj = rows[index];
                      let row_elements_arr = Object.getOwnPropertyNames(
                        obj
                      ).map(function (e) {
                        return obj[e];
                      });
                      row_elements_arr.shift();
                      //console.log(row_elements_arr);
                      try {
                        //console.log(rows[0]);
                      } catch (err) {
                        //console.log(err);
                      }
                      //console.log("ROWX::");
                      //console.log(row);
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.name)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.name}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </TableCell>
                          {
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row.name}
                            </TableCell>
                          }

                          {Object.getOwnPropertyNames(row)
                            .slice(1)
                            .map((keyName, i) => (
                              <TableCell align="right">
                                {row[keyName]}
                              </TableCell>
                            ))}
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={16} />
                    </TableRow>
                  )}
                </TableBody>
              </Collapse>
            </TableCell>
            <TableRow>
              <TableCell
                style={{ paddingBottom: 0, paddingTop: 1 }}
                colSpan={4}
              >
                {financial_years_selected[2]}
              </TableCell>
            </TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
              <Collapse in={true} timeout="auto" unmountOnExit>
                <TableBody>
                  {stableSort(rows_array[2], getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      //console.log("ROWX_all::");
                      //console.log(rows);
                      //console.log("ROWX_item::");
                      //console.log(rows[index]);
                      //console.log("row_elements_arr");
                      let obj = rows[index];
                      let row_elements_arr = Object.getOwnPropertyNames(
                        obj
                      ).map(function (e) {
                        return obj[e];
                      });
                      row_elements_arr.shift();
                      //console.log(row_elements_arr);
                      try {
                        //console.log(rows[0]);
                      } catch (err) {
                        //console.log(err);
                      }
                      //console.log("ROWX::");
                      //console.log(row);
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.name)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.name}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </TableCell>
                          {
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row.name}
                            </TableCell>
                          }

                          {Object.getOwnPropertyNames(row)
                            .slice(1)
                            .map((keyName, i) => (
                              <TableCell align="right">
                                {row[keyName]}
                              </TableCell>
                            ))}
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={16} />
                    </TableRow>
                  )}
                </TableBody>
              </Collapse>
            </TableCell>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 91]}
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
}

const mapStateToProps = (state) => ({
  fs_data: state.fs_data.fs_data,
});

export default connect(mapStateToProps, {
  get_FS_Data,
  get_FSLI_items,
  get_FS_Data_years,
})(IncomeStatementTable);
