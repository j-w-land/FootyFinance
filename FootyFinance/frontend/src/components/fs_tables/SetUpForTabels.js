import React, { Component, Fragment, useState } from "react";

const fslis_IS = [28, 34, 37, 39, 40, 43, 44];
const IS = [28, 34, 37, 39, 40, 43, 44];
const PLGraphLine = [28, 44];

const BS = [];
for (var i = 1; i < 28; i++) BS.push(i);
const BSSummary = [];

const setUps = [
  { name: "IS", fslis: IS },
  { name: "BS", fslis: BS },
  { name: "BSSummary", fslis: BSSummary },
  { name: "PLGraphLine", fslis: PLGraphLine },
];

export default function get_fslis_IS_IS() {
  return fslis_IS;
}

export function get_fslis_setup(item) {
  let res = setUps.find(function (param) {
    console.log("GET_FSLI_PARAM_TEST");
    console.log(param);
    console.log(item);
    console.log("GET_FSLI_PARAM_TESTFIN");
    return param.name == item;
  });
  console.log("get_fslis_res");
  console.log(res);
  return res.fslis;
}
