import axios from "axios";

import { GET_FS_DATA, GET_FSLIs, GET_FS_DATA_YEARS } from "./types";
import qs from "qs";
import {
  dataState,
  dataStateSet,
} from "../components/fs_tables/IncomeStatement";

// FootyFinance\frontend\src\actions\fs_data.js
export const fslis = [];

axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-type": "application/json",
  },
});

// GET INCOME STATEMENT DATA
export const get_FS_Data2 = (paramsvals) => {
  return (dispatch) => {
    axios({
      method: "get",
      url: "/api/fsdata/",
      //params: { club_id: 9 },
      params: paramsvals,
    })
      .then((res) => {
        dispatch({
          type: GET_FS_DATA,
          payload: res.data,
        });
        //console.log("FS DATA haettu!");
        //console.log(res.data);
        //return res.data;
      })
      .catch((err) => console.log(err));
  };
};

export const get_FS_Data = (paramsvals) => {
  console.log("paramsvalsT");
  console.log(paramsvals);
  return async (dispatch) => {
    await axios({
      method: "get",
      url: "/api/fsdata/",
      //params: { club_id: 9 },
      params: paramsvals,
    })
      .then((res) => {
        dispatch({
          type: GET_FS_DATA,
          payload: res.data,
        });
        //console.log("FS DATA haettu!");
        //console.log(res.data);
        //return res.data;
      })
      .catch((err) => console.log(err));
  };
};

function createObject(newKey, newValue) {
  let res_object = {};
  Object.defineProperty(res_object, newKey, {
    value: newValue,
  });

  return res_object;
}

export const get_FS_Data_years = (paramsvals) => {
  let axios_requests = [];
  console.log("paramsvals:");
  console.log(paramsvals);

  for (const item in paramsvals) {
    let request = axios({
      method: "get",
      url: "/api/fsdata/",
      //params: { club_id: 9 },
      params: paramsvals[item],
    });
    console.log("axios_request");
    console.log(request);
    axios_requests.push(request);
  }
  console.log("axios_requests");
  console.log(axios_requests);

  return async (dispatch) => {
    await axios
      .all(axios_requests)
      .then((responseArr) => {
        console.log("responseArr");
        console.log(responseArr[0].data);
        let responseArrData = [];
        for (const item in paramsvals) {
          responseArrData.push(responseArr[item].data);
        }
        for (const itemx in paramsvals) {
          console.log("reponseArr_element: ", responseArr[itemx].data);
        }
        dispatch({
          type: GET_FS_DATA_YEARS,
          payload: responseArrData,
        });
        dataStateSet();
        console.log("dataState");
        console.log(dataState);
        console.log("FS DATA haettu!");
        //console.log(res.data);
        //return res.data;
      })
      .catch((err) => console.log(err));
  };
};

// GET FSLIs
export const get_FSLI_items = () => {
  //console.log("init_FSLI_items alkaa!!!");
  return async (dispatch) => {
    await axios({
      method: "get",
      url: "/api/fslis",
      params: {},
    })
      .then((res) => {
        dispatch({
          type: GET_FSLIs,
          payload: res.data,
        });
        //console.log("INIT_FSLIs haettu!");
        //console.log(res.data);
        fslis.push(res.data);
        //console.log("fslis init:::");
        //console.log(fslis);
      })
      .catch((err) => console.log(err));
  };
};

export const init_FSLI_items2 = () => {
  //console.log("get_FSLI_items alkaa!!!");
  axios({
    method: "get",
    url: "/api/fslis",
    params: {},
  })
    .then((res) => {
      //console.log("GET_FSLIs haettu!");
      //console.log(res.data);
      fslis.push(res.data);
      //console.log("fslis init:::");
      //console.log(fslis);
    })
    .catch((err) => console.log(err));
};

export const init_row_data = (fsdata, clubs, rows, headCells) => {
  const result = [];
  const clubs_array = [];
  let res_object = { name: "", data: [] };
  //console.log("headCells_fsdata");
  //console.log(headCells);
  let headCells_count = 0;

  for (const item in clubs) {
    //console.log(fsdata_revenue.club_id);
    //console.log(clubs[item].id);

    clubs_array.push(clubs[item].name);
  }
  //console.log("headCells[headCells_count]");
  //console.log(headCells[headCells_count].id);

  res_object.name = headCells[headCells_count].id;
  headCells_count = headCells_count + 1;
  res_object.data = clubs_array;
  result.push(res_object);
  res_object = { name: "", data: [] };

  for (const line_item in rows) {
    let line_item_data = "";
    try {
      line_item_data = fsdata.filter(
        (fsdata) => fsdata.financial_statement_line_id == rows[line_item]
      );
      console.log("line_item_data");
      console.log(line_item_data);
    } catch (err) {}

    let line_item_res_array = [];

    for (const item in clubs) {
      let line_item_data_match = "";
      try {
        line_item_data_match = line_item_data.filter(
          (line_item_data) => line_item_data.club_id == clubs[item].id
        );
      } catch (err) {}

      if (line_item_data_match.length != 0) {
        try {
          line_item_res_array.push(
            line_item_data_match[0].amount //.toLocaleString("en-US")
          );
        } catch (err) {
          line_item_res_array.push(line_item_data_match[0].amount);
        }
      } else {
        line_item_res_array.push("");
      }
    }
    //console.log("headCells[headCells_count2!!?]");
    //console.log(headCells);
    //console.log(headCells_count);
    try {
      res_object.name = headCells[headCells_count].id;
      headCells_count = headCells_count + 1;
      res_object.data = line_item_res_array;

      result.push(res_object);
      res_object = { name: "", data: [] };
    } catch (err) {
      console.log("headCells_count2 err::" + err);
    }
  }
  console.log("row_data_result::");
  console.log(result);
  return result;
};

export const init_headCells = (fslis_data, line_items) => {
  //console.log(line_items);
  fslis_data = fslis_data;
  //console.log("FSLI ID::");
  //console.log(fslis_data.size);
  for (const item in fslis_data) {
    //console.log("fsli id item::");
    //console.log(fslis_data[item]);
    //console.log(fslis_data[item].id);
  }
  const headCells = [];

  for (const item in line_items) {
    //console.log("fslis_data");
    //console.log(fslis_data);
    //console.log(line_items[item]);
    let match = fslis_data.filter(
      (fslis_data) => fslis_data.id == line_items[item]
    );
    let match_object = { name: "", tag: "" };
    //console.log("match:");
    //console.log(match);
    try {
      //console.log(match[0]);
      match_object.name = match[0].name;
      match_object.tag = match[0].tag;
      //headCells.push(match[0].name);
      //console.log("match object:" + match_object);
      headCells.push(match_object);
    } catch (err) {
      //console.log("MATCHERR" + err);
    }
  }
  //console.log("headCells new array::");
  //console.log(headCells);
  return headCells;
};
