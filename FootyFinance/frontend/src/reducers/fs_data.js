import { GET_FS_DATA, GET_FSLIs, GET_FS_DATA_YEARS } from "../actions/types.js";

const initialState = {
  fs_data: [],
  fslis: [],
  fs_data_years: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FS_DATA:
      return {
        ...state,
        fs_data: action.payload,
      };
    case GET_FSLIs:
      return {
        ...state,
        fslis: action.payload,
      };
    case GET_FS_DATA_YEARS:
      return {
        ...state,
        fs_data_years: action.payload,
      };
    default:
      return state;
  }
}
