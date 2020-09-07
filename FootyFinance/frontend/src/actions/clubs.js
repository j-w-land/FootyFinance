import axios from "axios";

import { GET_CLUBS, DELETE_CLUB, ADD_CLUB, GET_ERRORS } from "./types";

axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-type": "application/json",
  },
});

// GET CLUBS
export const getClubs = () => (dispatch) => {
  axios
    .get("/api/clubs/")
    .then((res) => {
      dispatch({
        type: GET_CLUBS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// DELETE CLUBS
export const deleteClub = (id) => (dispatch) => {
  axios
    .delete(`/api/clubs/${id}/`)
    .then((res) => {
      dispatch({
        type: DELETE_CLUB,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD CLUB
export const addClub = (club) => (dispatch) => {
  axios
    .post("/api/clubs/", club)
    .then((res) => {
      dispatch({
        type: ADD_CLUB,
        payload: res.data,
      });
    })
    .catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.status,
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};
