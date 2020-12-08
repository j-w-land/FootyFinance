import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import {
  get_FS_Data,
  get_FSLI_items,
  init_row_data,
  init_headCells,
  get_FS_Data_years,
  setFiltersAction,
} from "../../actions/fs_data";

import { getClubs } from "../../actions/clubs";

import store from "../../store";
import { connect, useSelector, useDispatch } from "react-redux";

import FinancialStatementTable from "./FinancialStatement";

/******************************** */

import clsx from "clsx";
import { lighten, makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

import FormHelperText from "@material-ui/core/FormHelperText";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export function FSTableFilter(props) {
  const [filterClubs, setFilterClubs] = React.useState([]);
  console.log("FSTableFilter_props:");
  console.log(props);

  /*
  const {
    filters: [filters, setFitlers],
  } = {
    filters: useState(2018),
    ...(props.state || {}),
  };*/

  const [filters, setFilters] = useState([
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
  ]);

  console.log("fslis_filter");

  const {
    setUp: [setUp, setSetUp],
  } = {
    setUp: useState([]),
    ...(props.state || {}),
  };
  //console.log(fslis);
  //console.log(props.state.setUp);

  //const [setUp, setSetUp] = useState(props.state.setUp);
  console.log("setUp_test");
  console.log(setUp);
  console.log(setUp.page);
  console.log("filters fstablefilter");
  console.log(filters);
  let years = filters.sort(function (a, b) {
    return b - a;
  });

  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [filterYears, setfilterYears] = React.useState(setUp.years);
  const [filterFslis, setFilterFslis] = React.useState(setUp.fslis);

  console.log("filterClubs");
  console.log(filterClubs);
  let filterObj = {};
  filterObj = {
    page: setUp.page,
    years: setUp.years.sort(function (a, b) {
      return b - a;
    }),
    fslis: setUp.fslis,
    clubs: filterClubs,
    clubsSelected: setUp.clubsSelected,
  };
  const [filterObject, setFilterObject] = React.useState(filterObj);
  console.log("filterObj_test");
  console.log(filterObject);

  const clubsStatus = useSelector((state) => state.clubs.clubs.status);
  //const clubs = store.getState().clubs.clubs.data.slice(0, 24);

  useEffect(() => {
    async function fetchData() {
      if (clubsStatus == "idle") {
        return;
      }
      const res = store.getState().clubs.clubs.data; //.slice(0, 24);

      //setFilterClubs(res.data);

      filterObj.clubs = res; //res.data;
      setFilterObject(filterObj);
      setFilterClubs(filterObj);
      props.setFiltersAction(filterObj);
    }
    fetchData();

    console.log("fetchData_done_get_FSLI_items!!FILTER");
  }, [clubsStatus]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleChangeYear = (event) => {
    console.log("handleChangeYear");
    console.log(event);
    console.log(event.target.value);

    setfilterYears(
      event.target.value.sort(function (a, b) {
        return b - a;
      })
    );

    filterObj = filterObject;
    filterObj.years = event.target.value.sort(function (a, b) {
      return b - a;
    });
    setFilterObject(filterObj);
    console.log("filterObject_TEST");
    console.log(filterObject);
    props.setFiltersAction(filterObject);
  };

  const handleChangeMultipleYear = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    console.log("handleChangeMultipleYear");
    setfilterYears(value);
  };

  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });

  const handleChangeSelect = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Year</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChangeSelect}
          inputProps={{
            name: "age",
            id: "age-native-simple",
          }}
        >
          <option key="Select_year_none" aria-label="None" value="" />
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Years</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={filterYears}
          onChange={handleChangeYear}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              <Checkbox checked={filterYears.indexOf(year) > -1} />
              <ListItemText primary={year} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">League</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

/******************************** */

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

const useFilterStyles = makeStyles((theme) => ({
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

export function FSTableFilterv2(props) {
  const [filter, setFilter] = useState("All");
  const classes = useFilterStyles();
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  //const { numSelected } = props;
  const { numSelected } = 0;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {filterList}
      </Typography>
    </Toolbar>
  );
}

const mapStateToProps = (state) => ({
  fs_data: state.fs_data.fs_data,
});

export default connect(mapStateToProps, {
  setFiltersAction,
  get_FSLI_items,
  getClubs,
})(FSTableFilter);
