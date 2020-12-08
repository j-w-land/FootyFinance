import axios from "axios";

import { GET_FS_DATA, GET_FSLIs, GET_FS_DATA_YEARS, FILTERS } from "./types";
import qs from "qs";
import {
  /*dataState,*/
  dataStateSet,
} from "../components/fs_tables/FinancialStatement";

// FootyFinance\frontend\src\actions\fs_data.js
export const fslis = [];

//FILTER
let content = [];
export const getFiltersActionIndex = (input) => {
  let resIndex = content.findIndex(function (param) {
    return param.page == input.page;
  });
  //console.log("RESINDEX::");
  //console.log(resIndex);
  return resIndex;
};

export const setFiltersAction = (input) => {
  /*
  console.log("setFiltersAction_TEST:");
  console.log(content);
  console.log(input);
  console.log(input.page);
  console.log("SEARCH_RESxy: ");
*/
  let param = input.page;
  let res = content.find(function (param) {
    /*
    console.log("PARAM_TEST");
    console.log(param.page);
    console.log("PARAM_TEST_FIN");
    */
    return param.page == input.page;
  });
  let resIndex = content.findIndex(function (param) {
    return param.page == input.page;
  });

  if (resIndex == -1) {
    content.push(input);
  } else {
    content[resIndex] = input;
  }

  return {
    type: FILTERS,
    page: input.page,
    /*
    payload: {
      ...[content],
    },*/
    payload2: {
      ...[input],
    },
  };
};

axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-type": "application/json",
  },
});

const round = (value, decimals) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

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
  console.log("get_FS_Data_TEST__");
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

export const get_FS_Data_years = (paramsvals, page) => {
  let axios_requests = [];
  console.log("get_FS_Data_years");
  console.log(paramsvals);

  for (const item in paramsvals) {
    console.log("paramsvals[item]_TEST");
    console.log(paramsvals[item]);
    let searchParams = paramsvals[item];
    let request = axios({
      method: "get",
      url: "/api/fsdata/",
      //params: { club_id: 9 },
      params: paramsvals[item],
      paramsSerializer: (searchParams) => {
        return qs.stringify(searchParams, { arrayFormat: "brackets" });
      },
    });
    console.log(request);
    axios_requests.push(request);
  }

  return async (dispatch) => {
    await axios
      .all(axios_requests)
      .then((responseArr) => {
        let responseArrData = [];
        for (const item in paramsvals) {
          responseArrData.push(responseArr[item].data);
        }
        /*
        for (const itemx in paramsvals) {
          console.log("reponseArr_element: ", responseArr[itemx].data);
        }*/
        dispatch({
          page: page,
          type: GET_FS_DATA_YEARS,
          payload: responseArrData,
        });
        dataStateSet();
        //console.log("dataState");
        //console.log(dataState);
        //console.log("FS DATA haettu!");
        console.log("responseArrData");
        console.log(responseArrData);
        //return responseArrData;
      })
      .catch((err) => console.log(err));
  };
};

// GET FSLIs
export const get_FSLI_items = () => {
  console.log("init_FSLI_items_alkaa!!!");
  /*
  
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
        console.log("init_FSLI_items_alkaa_LOPPU");
        //console.log(res.data);
        fslis.push(res.data);
        //console.log("fslis init:::");
        //console.log(fslis);
      })
      .catch((err) => console.log("INIT_FSLIs_err: " + err));
  };
  */

  /*TEST */
  const request = axios({
    method: "get",
    url: "/api/fslis",
    params: {},
  });

  return async (dispatch) => {
    //console.log("INIT_FSLIs_err: ");
    function onSuccess(success) {
      dispatch({ type: GET_FSLIs, payload: success });
      //console.log("INIT_FSLIs_err: " + success);
      return success;
    }
    function onError(error) {
      dispatch({
        type: GET_FSLIs,
        payload: error,
      }); /*console.log(
        "INIT_FSLIs_err: " + error
      );*/
      /*
      dispatch({ type: ERROR_GENERATED, error });
      return error;
*/ return error;
    }

    try {
      const success = await request;
      return onSuccess(success.data);
    } catch (error) {
      return onError(error);
    }

    request.then(
      //console.log("init_FSLI_items_alkaa_LOPPU"),
      (success) => onSuccess,
      (error) => onError
    );
  };
};

// GET FSLIs
/*
export const get_FSLI_items2 = createAsyncThunk(GET_FSLIs, async () => {
  const response = await client.get("/fakeApi/posts");
  return response.posts;
});
*/
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
  let result = [];
  let clubs_array = [];
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
            round(line_item_data_match[0].amount / 1000000, 1) //.toFixed(0) / 1000000).toFixed(0) //.toLocaleString("en-US")
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
  //console.log("row_data_result::");
  //console.log(result);
  return result;
};

export const init_row_data_SingleClub = (fsdata, clubs, rows, headCells) => {
  console.log("init_row_data_SingleClub");
  console.log(fsdata);
  console.log(clubs);
  console.log(rows);
  console.log(headCells);
  let result = [];
  let headCells_array = [];
  let res_object = { name: "", data: [] };
  //console.log("headCells_fsdata");
  //console.log(headCells);
  let headCells_count = 0;

  for (const item in headCells) {
    headCells_array.push(headCells[item].id);
  }
  //console.log(headCells_array);
  //console.log("headCells[headCells_count]");
  //console.log(headCells[headCells_count].id);

  res_object.name = clubs[headCells_count].name;
  //res_object.name = "XXX" + headCells_count.toString();// headCells[headCells_count].id;
  headCells_count = headCells_count + 1;
  res_object.data = headCells_array;
  result.push(res_object);
  res_object = { name: "", data: [] };

  for (const line_item in rows) {
    let line_item_data = "";
    try {
      line_item_data = fsdata.filter(
        (fsdata) => fsdata.financial_statement_line_id == rows[line_item]
      );
    } catch (err) {}

    //console.log(line_item_data);
    //console.log("line_item_data");

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
            round(line_item_data_match[0].amount / 1000000, 1) //.toFixed(0) / 1000000).toFixed(0) //.toLocaleString("en-US")
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
      //console.log("headCells_count2 err::" + err);
    }
  }
  //console.log("row_data_result::");
  //console.log(result);
  return result;
};

export const init_headCells = (fslis_data, line_items) => {
  //console.log("init_headCells");
  //console.log(fslis_data);
  //console.log(line_items);

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
    let match_object = { name: "", tag: "", id: "" };
    //console.log("match:");
    //console.log(match);
    try {
      //console.log(match[0]);
      match_object.name = match[0].name;
      match_object.tag = match[0].tag;
      match_object.id = line_items[item];
      //headCells.push(match[0].name);
      //console.log("match object:" + match_object);
      headCells.push(match_object);
    } catch (err) {
      //console.log("MATCHERR" + err);
    }
  }

  return headCells;
};

const getColumnTitles = (clubObject, titles, year) => {
  console.log("getColumnTitles_TEST");
  console.log(clubObject);

  let resTitle = "";

  for (const item in titles) {
    if (clubObject[titles[item]] != undefined) {
      console.log("getColumnTitles_match: " + clubObject[titles[item]]);
      resTitle = resTitle + " " + clubObject[titles[item]];
    } else if (titles[item] == "year") {
      resTitle = resTitle + " " + year;
    } else {
      console.log("getColumnTitles_no_match: " + titles[item]);
    }
  }
  resTitle.trim();

  console.log(resTitle);

  return resTitle;
};

export const initTableData = (
  setUp,
  tableData,
  page,
  fslis,
  fsdata,
  clubs,
  rows,
  headCells,
  dimensions,
  year
) => {
  const result = { columns: [], rows: [] };
  const headCells2 = init_headCells(fslis, rows);

  console.log("initTableDataFUNC" + page); //initTableDataFUNCclub_IS
  console.log(setUp);
  console.log(clubs);
  /*
  console.log(tableData);
  console.log(year);
  console.log(headCells);
  console.log(headCells2);
  
  console.log(clubs);*/
  let columns_array = []; //
  let rows_array = [];
  let row_object = {};
  switch (dimensions.columns) {
    case "clubs":
      //populate columns row of the result array:

      for (const item in clubs) {
        let nameVal = getColumnTitles(
          clubs[item],
          setUp.tableColumnTitles,
          year
        );

        columns_array.push({
          name: nameVal, // clubs[item].name, //TÄHÄN
          id: clubs[item].name + "-" + year.toString(),
          year: year,
        });
        Object.defineProperty(row_object, clubs[item].name, {
          value: "",
          writable: true,
        });
      }

      result.columns = columns_array;

      for (const fsliItem in headCells2) {
        row_object = {};
        row_object.name = headCells2[fsliItem].name;

        let line_item_data_club = "";

        //console.log(clubs[clubItem].id);

        try {
          line_item_data_club = fsdata.filter(
            (fsdata) =>
              fsdata.financial_statement_line_id == headCells2[fsliItem].id
          );
        } catch (err) {
          console.log("line_item_data_club_ERROR: " + err);
        }

        for (const line_item in clubs) {
          let line_item_data = "";
          try {
            line_item_data = line_item_data_club.filter(
              (line_item_data_club) =>
                line_item_data_club.club_id == clubs[line_item].id
            );
          } catch (err) {}

          //console.log(line_item_data);
          //console.log("line_item_data_TYPECLUB");

          //for (const item in line_item_data) {
          // Do rounding:
          let amount;
          if (line_item_data.length != 0) {
            try {
              amount = round(line_item_data[0].amount / 1000000, 1); //.toFixed(0) / 1000000).toFixed(0) //.toLocaleString("en-US")
            } catch (err) {
              amount = "";
            }
          } else {
            amount = "";
          }

          let rowName = clubs[line_item].name + "-" + year.toString();
          //row_object[clubs[line_item].name] = amount;
          row_object[rowName] = amount;

          //console.log("row_object");
          //console.log(row_object);
        }
        rows_array.push(row_object);
      }
      result.rows = rows_array;

      break;

    case "fslis":
      //populate columns row of the result array:
      /*
      let columns_array = []; //
      let rows_array = [];
      let row_object = {};*/
      for (const item in headCells2) {
        columns_array.push({
          name: headCells2[item].name,
          id: headCells2[item].tag,
        });
        Object.defineProperty(row_object, headCells2[item].tag, {
          value: "",
          writable: true,
        });
      }

      result.columns = columns_array;

      for (const clubItem in clubs) {
        row_object = {};
        row_object.name = clubs[clubItem].name;

        let line_item_data_club = "";

        //console.log(clubs[clubItem].id);

        try {
          line_item_data_club = fsdata.filter(
            (fsdata) => fsdata.club_id == clubs[clubItem].id
          );
        } catch (err) {
          console.log("line_item_data_club_ERROR: " + err);
        }

        for (const line_item in headCells2) {
          let line_item_data = "";
          try {
            line_item_data = line_item_data_club.filter(
              (line_item_data_club) =>
                line_item_data_club.financial_statement_line_id ==
                headCells2[line_item].id //rows[line_item]
            );
          } catch (err) {}

          //for (const item in line_item_data) {
          // Do rounding:
          let amount;
          if (line_item_data.length != 0) {
            try {
              amount = round(line_item_data[0].amount / 1000000, 1); //.toFixed(0) / 1000000).toFixed(0) //.toLocaleString("en-US")
            } catch (err) {
              amount = "";
            }
          } else {
            amount = "";
          }

          row_object[headCells2[line_item].tag] = amount;
        }
        rows_array.push(row_object);
      }

      result.rows = rows_array;

      break;
  }

  //console.log(result);

  let resultRows = result.rows;
  let resultCols = result.columns;

  for (const item in tableData.rows) {
    let dataElement = tableData.rows[item];

    let resIndex = resultRows.findIndex((obj) => obj.name === dataElement.name);

    /*
    dataElement = resultRows.filter(
      (resultRows) => resultRows.name == dataElement.name //rows[line_item]
    );
    */

    //dataElement = dataElement[0];

    if (resIndex != -1) {
      //resultRows[resIndex] = dataElement;

      let dataElement_getOwnPropertyNames = Object.getOwnPropertyNames(
        dataElement
      );
      //console.log(dataElement_getOwnPropertyNames);

      for (const item in dataElement_getOwnPropertyNames) {
        if (dataElement_getOwnPropertyNames[item] != "name") {
          resultRows[resIndex][dataElement_getOwnPropertyNames[item]] =
            dataElement[dataElement_getOwnPropertyNames[item]];
        }
      }
    }
  }

  result.rows = resultRows;

  for (const item in tableData.columns) {
    result.columns.push(tableData.columns[item]);
  }

  //console.log(result);
  //console.log("initTableData_result");
  return result;
};

export const searchClubs = (nameKey, myArray) => {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].name === nameKey) {
      return myArray[i];
    }
  }
};
