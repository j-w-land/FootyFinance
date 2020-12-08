import {
  GET_FS_DATA,
  GET_FSLIs,
  GET_FS_DATA_YEARS,
  FILTERS,
} from "../actions/types.js";

const initialState = {
  fs_data: [],
  fslis: { data: [], status: "idle" },
  fs_data_years: { data: [], status: "idle" },
  filters: {},
  fs_data_years_test: {},
  fs_data_years_test2: {},
};

let content_fsyrs2_obj = { data: [], status: "idle" };

export default function (state = initialState, action) {
  let res_obj;
  const updateDataStatus = (page, data, status) => {
    let obj = { data: [], status: "idle" };
    let content_fsyrs2 = state.fs_data_years_test2;
    /*
    console.log("updateDataStatus");
    console.log(page);
    console.log(data);
    console.log(status);
    console.log(content_fsyrs2);
    */

    obj.data = data;
    obj.status = status;

    content_fsyrs2[page] = obj;
    return content_fsyrs2;
  };

  switch (action.type) {
    case GET_FS_DATA:
      return {
        ...state,
        fs_data: action.payload,
      };
    case GET_FSLIs:
      return {
        ...state,
        fslis: { data: action.payload, status: "succeeded" },
      };
    case GET_FS_DATA_YEARS:
      let res_obj1;
      let content_fsyrs = state.fs_data_years_test;
      //let content_fsyrs2 = state.fs_data_years_test2;
      content_fsyrs[action.page] = action.payload;

      //content_fsyrs2_obj.data = action.payload;
      //content_fsyrs2_obj.status = "succeeded";
      res_obj1 = updateDataStatus(action.page, action.payload, "succeeded");
      //console.log("res_obj1_TEST");
      //console.log(action.page);
      //console.log(action.payload);
      //console.log(res_obj1);

      //content_fsyrs2[action.page] = content_fsyrs2_obj;

      return {
        ...state,
        fs_data_years: { data: action.payload, status: "succeeded" },
        fs_data_years_test: content_fsyrs,
        fs_data_years_test2: res_obj1,
      };
    case FILTERS:
      let content_filters = state.filters;
      res_obj = updateDataStatus(action.page, [], "idle");
      content_filters[action.page] = action.payload2;
      //console.log("FILTER_TESTING::");
      //console.log(action);

      return {
        ...state,
        filters: content_filters,
        fs_data_years_test2: res_obj,
        /*filters: { [action.page]: action.payload2 },*/
        /*["filters_" + action.page]: action.payload2,*/
      };
    default:
      return state;
  }
}
