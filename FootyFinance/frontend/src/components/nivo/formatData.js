export const FormatLine = (data, attributes) => {
  console.log("FormatLine__TEST__");
  console.log(data);
  console.log(attributes);

  const dataArray = [];
  const dataArrayLeft = [];
  const dataArrayRight = [];
  /*
    let objKeys = Object.getOwnPropertyNames(attributes.axisLeft).map(
        function (e) {
          return attributes.axisLeft[e];
        }
        */

  let axisLeftItemsIds = attributes.axisLeft.items_ids;
  let axisLeftItems = attributes.axisLeft.items;
  for (const id in axisLeftItemsIds) {
    const objData = [];
    let obj = { color: "hsl(109, 70%, 50%)", axis: "left" };
    obj["id"] = axisLeftItems[id];

    for (const item in data) {
      //let xyObj = {}
      let dataItem = data[item];
      let match = dataItem.filter(
        (dataItem) =>
          dataItem[attributes.dataKey["yVal"]] == axisLeftItemsIds[id]
      );
      console.log("FormatLine__match");
      console.log(match);
      let yVal = null;
      try {
        yVal = match[0]["amount"] / 1000000;
      } catch (error) {
        console.log("NO_VALUE_FormatLine: ");
        console.log(match);
      }
      let xVal = null;
      try {
        xVal = match[0][attributes.dataKey["xVal"]];
      } catch (error) {
        console.log("NO_VALUE_FormatLine: ");
        console.log(match);
        console.log(error);
      }
      if (xVal == null) {
        continue;
      }

      let xyObj = {
        x: xVal,
        yNotScaled: yVal,
        y: yVal,
        axis: "left",
        category: axisLeftItems[id],
      };
      objData.push(xyObj);
    }
    console.log("objData_TESTING!!");
    console.log(objData);
    if (objData.length == 0) {
      continue;
    } else {
      obj["data"] = objData;
    }
    obj["data"] = objData;
    dataArray.push(obj);
    dataArrayLeft.push(obj);
  }

  let axisRightItemsIds = [];
  let axisRightItems = [];
  if (attributes.axisRight != null) {
    axisRightItemsIds = attributes.axisRight.items_ids;
    axisRightItems = attributes.axisRight.items;
  }

  for (const id in axisRightItemsIds) {
    const objDataRight = [];
    let objRight = { color: "hsl(109, 70%, 50%)", axis: "right" };
    objRight["id"] = axisRightItems[id];

    for (const item in data) {
      //let xyObj = {}
      let dataItemRight = data[item];
      let match = dataItemRight.filter(
        (dataItemRight) =>
          dataItemRight[attributes.dataKey["yVal"]] == axisRightItemsIds[id]
      );
      console.log("FormatLine__match");
      console.log(match);
      let yVal = null;
      try {
        yVal = match[0]["amount"] / 1000000;
      } catch (error) {
        console.log("NO_VALUE_FormatLine: ");
        console.log(match);
      }
      let xVal = null;
      try {
        xVal = match[0][attributes.dataKey["xVal"]];
      } catch (error) {
        console.log("NO_VALUE_FormatLine: ");
        console.log(match);
        console.log(error);
      }
      if (xVal == null) {
        continue;
      }

      let xyObjRight = {
        x: xVal,
        yNotScaled: yVal,
        y: yVal,
        axis: "right",
        category: axisLeftItems[id],
      };
      objDataRight.push(xyObjRight);
    }
    if (objDataRight.length == 0) {
      continue;
    } else {
      objRight["data"] = objDataRight;
    }
    dataArray.push(objRight);
    dataArrayRight.push(objRight);
  }

  console.log("FormatLine__dataArray");
  console.log(dataArray);
  //return dataArray;
  return {
    leftData: dataArrayLeft,
    rightData: dataArrayRight,
    dataAll: dataArray,
  };
};

const findMissingInts = (dataArr) => {
  console.log("findMissingInts");
  console.log(dataArr);
  let data = [];
  for (const item in dataArr) data.push(dataArr[item]);

  console.log(data);
  let addToStart = 0;
  let min = Math.min.apply(Math, data);
  if (min > 1) {
    addToStart = min - 1;
  }
  console.log("addToStart");
  console.log(min);
  console.log(addToStart);

  var mia = data.reduce(function (acc, cur, ind, arr) {
    var diff = cur - arr[ind - 1];
    if (diff > 1) {
      var i = 1;
      while (i < diff) {
        acc.push(arr[ind - 1] + i);
        i++;
      }
    }
    return acc;
  }, []);

  console.log("findMissingIntegers_Vals:");

  let i = 1;
  while (i < addToStart + 1) {
    mia.push(i);
    i++;
  }

  for (const item in mia) {
    if (mia[item] > data.length) {
    }
  }

  i = mia.length - 1;
  while (mia[i] > data.length) {
    console.log("MIA_POPPED");
    console.log(mia[i]);
    //mia.pop();
    //mia.push(mia[i] + 1);

    i--;
  }

  console.log(mia);

  return mia;
};

const removeMissingRanks = (data) => {
  console.log("findMissingIntegers_data");
  console.log(data);
  let numArray = [];
  for (const item in data[0]) {
    numArray.push([]);
  }
  console.log(numArray);

  for (const item in data) {
    for (const element in data[item]) {
      numArray[element].push(data[item][element]);
    }
    //numArray.push(Number(data[item][0]));
  }
  //numArray = numArray.sort((a, b) => a - b);
  console.log("findMissingIntegers_numArray");
  console.log(numArray);

  let missingVals = [];
  for (const item in numArray) {
    let arraySorted = [];

    for (const element in numArray[item]) {
      arraySorted.push(numArray[item][element]);
    }

    arraySorted = arraySorted.sort((a, b) => a - b);
    missingVals.push(findMissingInts(arraySorted));
  }
  console.log("missingVals");
  console.log(numArray);
  console.log(missingVals);

  const numArrayToLoop = [];
  for (const item in numArray) {
    numArrayToLoop.push(numArray[item]);
  }
  for (const item in numArrayToLoop) {
    for (const element in numArrayToLoop[item]) {
      let value = missingVals.length - 1;
      while (value > -1) {
        //for (const value in missingVals[item]) {
        if (numArrayToLoop[item][element] > missingVals[item][value]) {
          numArrayToLoop[item][element] = numArrayToLoop[item][element] - 1;
        } else {
          //continue;
        }
        //}
        value--;
      }
    }
    //console.log(numArrayToLoop[item].sort((a, b) => a - b));
  }

  console.log("numArray_FINISHED");
  console.log(numArrayToLoop);
  console.log(numArray);
  return numArrayToLoop;
};

export const FormatAreaBump = (data, attributes) => {
  console.log("FormatLine__TEST__");
  console.log(data);
  console.log(attributes);

  const dataArray = [];

  /*
      let objKeys = Object.getOwnPropertyNames(attributes.axisLeft).map(
          function (e) {
            return attributes.axisLeft[e];
          }
          */

  let axisLeftItemsIds = attributes.axisLeft.items_ids;
  let axisLeftItems = attributes.axisLeft.items;

  const clubs = [];
  const clubsArray = attributes.clubsArray;
  let resultObjects = {};

  for (const club in clubsArray) {
    //console.log("CLUBTESTING");
    //console.log(clubsArray[club]);
    resultObjects[clubsArray[club].id] = {
      id: clubsArray[club].name,
      data: [],
      rank: "",
    };
  }
  console.log("resultObject____Test__");
  console.log(resultObjects);
  if (Object.keys(resultObjects).length == 0)
    return {
      dataAll: [],
    };

  for (const id in axisLeftItemsIds) {
    const objData = [];
    let obj = { color: "hsl(109, 70%, 50%)", axis: "left" };
    obj["fsli"] = axisLeftItems[id];

    for (const item in data) {
      //let xyObj = {}
      let dataItem = data[item];
      let matches = dataItem.filter(
        (dataItem) =>
          dataItem[attributes.dataKey["yVal"]] == axisLeftItemsIds[id]
      );
      console.log("FormatLine__match");
      console.log(matches);

      let rankData = [];
      let totalAmount = 0;
      for (const item in matches) {
        rankData.push(matches[item].amount);
        totalAmount = totalAmount + matches[item].amount;
      }
      function rankings(arr) {
        // add whatever parameters you deem necessary....good luck!
        var sorted = arr.slice().sort(function (a, b) {
          return b - a;
        });
        var ranks = arr.slice().map(function (v) {
          return sorted.indexOf(v) + 1;
        });
        return ranks;
      }

      let rank = rankings(rankData);

      //console.log(rank);
      for (const item in matches) {
        matches[item]["rankPosition"] = rank[item];
        let percentage = (matches[item].amount / totalAmount) * 100;
        matches[item]["rankPercentage"] =
          parseFloat(percentage).toFixed(2) + "%";
      }
      console.log("matches_After_rank");
      console.log(matches);

      for (const match in matches) {
        //console.log(matches[match]);
        //let matchObj = { id: match["club_id"], data: [] };
        let yVal = null;
        try {
          yVal = matches[match]["amount"] / 1000000;
        } catch (error) {
          console.log("NO_VALUE_FormatLine: ");
          console.log(matches[match]);
        }
        let xVal = null;
        try {
          xVal = matches[match][attributes.dataKey["xVal"]];
        } catch (error) {
          console.log("NO_VALUE_FormatLine: ");
          console.log(matches[match]);
          console.log(error);
        }
        if (xVal == null) {
          continue;
        }

        let dataValue = {
          x: xVal,
          yNotScaled: yVal,
          y: yVal,
          dataTest: "dataTest",
          key: axisLeftItems[id],
          rankTotalItems: matches.length,
          rankPosition: matches[match].rankPosition,
          rankPercentage: matches[match].rankPercentage,
        };
        resultObjects[matches[match]["club_id"]].data.push(dataValue);
      }
    }
  }

  console.log("FormatLine__OBJECT_AREABUMP__");

  Object.getOwnPropertyNames(resultObjects).map(function (e) {
    dataArray.push(resultObjects[e]);
  });

  console.log("FormatLine__dataArray_AREABUMP__");
  console.log(dataArray);

  let dataArrayLenght = dataArray.length;
  //while()
  const dataArrayFinish = [];

  for (const item in dataArray) {
    //console.log("item: " + item);
    //console.log("UUSI_ELEMENT");
    //console.log(dataArray[item]);
    //console.log(dataArray[item].data.length);
    if (dataArray[item].data.length == 10) {
      dataArrayFinish.push(dataArray[item]);
    }
  }
  console.log("FormatLine__dataArray_AREABUMP__FINISH");
  console.log(dataArrayFinish);
  /************************** Scale negative values to positive scale******************************************* */

  const scalingArray = [];
  for (const item in dataArrayFinish) {
    let scalingArrayClub = [];

    for (const dataItem in dataArrayFinish[item].data) {
      scalingArrayClub.push(dataArrayFinish[item].data[dataItem].y);
    }

    scalingArray.push(scalingArrayClub);
  }
  console.log("scalingArray__TEST__");
  console.log(scalingArray);
  let scalingArrayRes = toPositiveScale(scalingArray);
  console.log("scalingArray__TEST__RES");
  console.log(scalingArrayRes);

  for (const item in scalingArrayRes) {
    for (const element in scalingArrayRes[item]) {
      console.log(dataArrayFinish[element].data);
      console.log(item);
      dataArrayFinish[item].data[element].y = scalingArrayRes[item][element];
    }
  }

  /*********************************************************************** */

  /************** Eliminate empty vals from rank ********************************/

  const ranksArray = [];
  for (const item in dataArrayFinish) {
    let ranksArrayClub = [];

    for (const dataItem in dataArrayFinish[item].data) {
      ranksArrayClub.push(dataArrayFinish[item].data[dataItem].rankPosition);
    }

    ranksArray.push(ranksArrayClub);
  }
  console.log("ranksArray__TEST__");
  console.log(ranksArray);
  let ranksArrayRes = removeMissingRanks(ranksArray);
  console.log("ranksArray__TEST__RES");
  console.log(ranksArrayRes);

  for (const item in ranksArrayRes) {
    for (const element in ranksArrayRes[item]) {
      dataArrayFinish[element].data[item].rankPosition =
        ranksArrayRes[item][element];
      dataArrayFinish[element].data[item].rankTotalItems =
        ranksArrayRes[item].length;
    }
  }

  for (const element in ranksArrayRes[ranksArrayRes.length - 1]) {
    dataArrayFinish[element].rank =
      ranksArrayRes[ranksArrayRes.length - 1][element];
  }

  dataArrayFinish.sort(dynamicSort("rank"));

  /************************************************ */

  console.log("FormatLine__dataArray_AREABUMP__FINISH_FINISH");
  console.log(dataArrayFinish);

  /*   for (const item in dataArrayFinish) {


    for (const dataItem in dataArrayFinish[item].data) {
      ranksArrayClub.push(dataArrayFinish[item].data[dataItem].rankPosition);

    }

 
  }  */

  //return dataArray;
  return {
    dataAll: dataArrayFinish,
  };
};

function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

export const FormatBar = (data, attributes) => {
  console.log("FormatBar__TEST__");
  console.log(data);
  console.log(attributes);

  const dataArray = [];
  const dataArrayLeft = [];
  const dataArrayRight = [];
  /*
      let objKeys = Object.getOwnPropertyNames(attributes.axisLeft).map(
          function (e) {
            return attributes.axisLeft[e];
          }
          */

  let axisLeftItemsIds = attributes.axisLeft.items_ids;
  let axisLeftItems = attributes.axisLeft.items;
  let axisRightItemsIds = attributes.axisRight.items_ids;
  let axisRightItems = attributes.axisRight.items;
  let key = attributes.dataKey["xVal"];

  let axisItemIds = attributes.axisLeft.items_ids;
  let axisItems = attributes.axisLeft.items;
  console.log("attributes.axisRight.items");
  console.log(attributes.axisRight.items);

  if (attributes.axisRight != null) {
    axisItemIds = axisItemIds.concat(attributes.axisRight.items_ids);
    axisItems = axisItems.concat(attributes.axisRight.items);
  }

  //let axisItems = attributes.axisLeft.items.concat(attributes.axisRight.items);

  console.log(axisItemIds);
  console.log(axisItems);

  //const barDataArray = [];
  const barDataArrayLeft = [];
  const barDataArrayRight = [];
  for (const item in data) {
    if (data[item].length == 0) {
      continue;
    }
    let dataIndex = "";
    try {
      dataIndex = data[item][0][key];
    } catch (error) {}
    let dataObj = {};
    dataObj[key] = dataIndex;

    let dataItem = data[item];
    for (const id in axisItemIds) {
      //let obj = {}
      let colorString = "";

      let match = dataItem.filter(
        (dataItem) => dataItem[attributes.dataKey["yVal"]] == axisItemIds[id]
      );
      console.log("FormatLine__match");
      console.log(match);
      colorString = axisItems[id] + "Color";

      try {
        dataObj[axisItems[id]] = match[0].amount / 1000000;
      } catch (error) {}
      dataObj[colorString] = "hsl(242, 70%, 50%)";
    }
    barDataArrayLeft.push(dataObj);

    let dataObjRight = {};
    dataObjRight[key] = dataIndex;

    //let dataItemRight = data[item];
    for (const id in axisRightItemsIds) {
      //let obj = {}
      let colorString = "";

      let match = dataItem.filter(
        (dataItem) =>
          dataItem[attributes.dataKey["yVal"]] == axisRightItemsIds[id]
      );
      console.log("FormatLine__match");
      console.log(match);
      colorString = axisRightItems[id] + "Color";

      try {
        dataObjRight[axisRightItems[id]] = match[0].amount / 1000000;
      } catch (error) {}
      dataObjRight[colorString] = "hsl(242, 70%, 50%)";
    }
    barDataArrayRight.push(dataObjRight);
  }

  /**
     * let yVal = null;
      try {
        yVal = match[0]["amount"] / 1000000;
      } catch (error) {
        console.log("NO_VALUE_FormatLine: ");
        console.log(match);
      }
      let xVal = null;
      try {
        xVal = match[0][attributes.dataKey["xVal"]];
      } catch (error) {
        console.log("NO_VALUE_FormatLine: ");
        console.log(match);
        console.log(error);
      }

      let xyObj = {
        x: xVal,
        y: yVal,
        axis: "right",
        category: axisLeftItems[id],
      };
      objData.push(xyObj);
    }
    obj["data"] = objData;
    dataArray.push(obj);
    dataArrayRight.push(obj);

     */

  let scaledAxisData = scaleRightAxisData(
    barDataArrayLeft,
    barDataArrayRight,
    attributes
  );
  console.log("scaledAxisData_res");
  //console.log(scaledAxisData);
  console.log(barDataArrayLeft);

  //const barDataArray = barDataArrayLeft.concat(scaledRightAxisData);
  //const barDataArray = barDataArrayRight.concat(scaledAxisData);
  //const barDataArray = barDataArrayRight.concat(barDataArrayLeft);
  const barDataArray = scaledAxisData.concat(barDataArrayRight);

  console.log("formatBar__TEST__RESULT");
  console.log(barDataArray);

  return barDataArray;
};

const scaleRightAxisData = (
  barDataArrayLeft,
  barDataArrayRight,
  attributes
) => {
  console.log("scaleRightAxisData");
  console.log(barDataArrayLeft);
  console.log(barDataArrayRight);
  let dataLeftOrig = barDataArrayLeft;
  const arrayData = [];
  const arrayDataRight = [];
  let leftKeys = attributes.axisLeft.items;
  let rightKeys = attributes.axisRight.items;
  console.log(leftKeys);

  for (const item in barDataArrayLeft) {
    //if (barDataArrayLeft[item].axis == "left") {
    for (const key in leftKeys) {
      console.log("testing...");
      console.log(key);
      console.log(barDataArrayLeft[item]);
      let value = "";
      try {
        value = barDataArrayLeft[item][leftKeys[key]];
      } catch (error) {}
      arrayData.push(value);
    }
    //}
  }
  console.log("arrayMinData__LEFT__");
  console.log(arrayData);

  let arrayMin = Math.min.apply(Math, arrayData);
  arrayMin = 10;
  let arrayMax = Math.max.apply(Math, arrayData);
  // arrayMax = 600;
  let arrayAvg = (Math.abs(arrayMin) + Math.abs(arrayMax)) / 2;
  //arrayMin.toString();
  //arrayMax.toString();
  console.log("scaleRightAxisData_RES");
  console.log(arrayMin);
  console.log(arrayMax);

  for (const item in barDataArrayRight) {
    //if (barDataArrayLeft[item].axis == "left") {
    for (const key in rightKeys) {
      console.log("testing...");
      console.log(key);
      console.log(barDataArrayRight[item]);
      let value = "";
      try {
        value = barDataArrayRight[item][rightKeys[key]];
      } catch (error) {}
      arrayDataRight.push(value);
    }
    //}
  }
  console.log("arrayMinData__Right__");
  console.log(arrayDataRight);

  let arrayMinRight = Math.min.apply(Math, arrayDataRight);
  //arrayMinRight = -80;
  let arrayMaxRight = Math.max.apply(Math, arrayDataRight);
  let arrayAvgRight = (Math.abs(arrayMinRight) + Math.abs(arrayMaxRight)) / 2;
  //arrayMinRight.toString();
  //arrayMaxRight.toString();
  console.log("scaleRightAxisData_RESRight");
  console.log(arrayMinRight);
  console.log(arrayMaxRight);

  //let ratio = ((abs(arrayMaxRight - arrayMinRight) ) (/) (abs(arrayMax - arrayMin));

  let ratio =
    Math.abs(arrayMax - arrayMin) / Math.abs(arrayMaxRight - arrayMinRight);

  const resArray = [];

  let maxDiff = arrayMax - arrayMaxRight;
  let minDiff = arrayMinRight - arrayMin;
  ratio = maxDiff / minDiff;

  for (const item in barDataArrayLeft) {
    for (const key in rightKeys) {
      let nameString = "scaledValue_" + rightKeys[key];
      let colorString = "scaledValue_" + rightKeys[key] + "Color";
      let amount = null;
      let amountScaled = null;
      try {
        amount = barDataArrayLeft[item][rightKeys[key]];
        ratio = (amount - arrayMin) / (arrayMaxRight - arrayMinRight);
        //amountScaled = ratio * (arrayMax - arrayMin); // arrayAvg + arrayAvgRight;* ratio
        amountScaled =
          ((amount - arrayMinRight) * (arrayMax - arrayMin)) /
            (arrayMaxRight - arrayMinRight) +
          arrayMin;
      } catch (error) {}
      console.log("amount: " + amount);
      //console.log(ratio);
      console.log("amountScaled: " + amountScaled);

      barDataArrayLeft[item][nameString] = amountScaled;
      barDataArrayLeft[item][colorString] = "hsl(242, 70%, 50%)";
    }

    //barDataArrayLeft[item];
  }

  console.log(barDataArrayLeft);
  return dataLeftOrig;
  return barDataArrayLeft;
};

const toPositiveScale = (data) => {
  console.log("toPositiveScale_STARTS");
  console.log(data);
  let from_min = data[0][0];
  let from_max = data[0][0];
  for (const item in data) {
    for (const element in data[item]) {
      from_min =
        data[item][element] < from_min ? data[item][element] : from_min;
      from_max =
        data[item][element] > from_max ? data[item][element] : from_max;
    }
  }
  console.log("toPositiveScale_MIN_MAX");
  console.log(from_min);
  console.log(from_max);

  let to_max = 100;
  let to_min = 0;

  //x -> (x - from_min) * (to_max - to_min) / (from_max - from_min) + to_min

  for (const item in data) {
    for (const element in data[item]) {
      data[item][element] =
        ((data[item][element] - from_min) * (to_max - to_min)) /
          (from_max - from_min) +
        to_min;
    }
  }

  return data;
};

export const formatTreeMap = (data, attributes) => {
  for (const club in attributes.clubsArray) {
    let clubYearResObj = {};

    for (const year in attributes.years) {
      for (const fsli in attributes.fslis) {
      }
    }
  }

  return null;
};
