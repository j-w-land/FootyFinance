import { GET_CLUBS, DELETE_CLUB, ADD_CLUB } from "../actions/types.js";

const initialState = {
  clubs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLUBS:
      return {
        ...state,
        clubs: action.payload
      };
    case DELETE_CLUB:
      return {
        ...state,
        clubs: state.clubs.filter(club => club.id !== action.payload)
      };
    case ADD_CLUB:
      return {
        ...state,
        clubs: [...state.clubs, action.payload]
      };
    default:
      return state;
  }
}
