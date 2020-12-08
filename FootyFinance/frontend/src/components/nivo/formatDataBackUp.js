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
    const objData = [];
    let obj = { color: "hsl(109, 70%, 50%)", axis: "right" };
    obj["id"] = axisRightItems[id];

    for (const item in data) {
      //let xyObj = {}
      let dataItem = data[item];
      let match = dataItem.filter(
        (dataItem) =>
          dataItem[attributes.dataKey["yVal"]] == axisRightItemsIds[id]
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
        y: yVal,
        axis: "right",
        category: axisLeftItems[id],
      };
      objData.push(xyObj);
    }
    if (objData.length == 0) {
      continue;
    } else {
      obj["data"] = objData;
    }
    dataArray.push(obj);
    dataArrayRight.push(obj);
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

  const barDataArray = [];
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
    barDataArray.push(dataObj);
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

  console.log("formatBar__TEST__RESULT");
  console.log(barDataArray);

  return barDataArray;

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

      let xyObj = {
        x: xVal,
        y: yVal,
        axis: "left",
        category: axisLeftItems[id],
      };
      objData.push(xyObj);
    }
    obj["data"] = objData;
    dataArray.push(obj);
    dataArrayLeft.push(obj);
  }

  let axisRightItemsIds = attributes.axisRight.items_ids;
  let axisRightItems = attributes.axisRight.items;
  for (const id in axisRightItemsIds) {
    const objData = [];
    let obj = { color: "hsl(109, 70%, 50%)", axis: "right" };
    obj["id"] = axisRightItems[id];

    for (const item in data) {
      //let xyObj = {}
      let dataItem = data[item];
      let match = dataItem.filter(
        (dataItem) =>
          dataItem[attributes.dataKey["yVal"]] == axisRightItemsIds[id]
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

/*
BAR:
[
  {
    "country": "AD", ->YEAR
    "hot dog": 134, -> revenue MAN UTD....
    "hot dogColor": "hsl(242, 70%, 50%)", 
    "burger": 188, -> revenue Premier League..
    "burgerColor": "hsl(202, 70%, 50%)",
    "sandwich": 135,
    "sandwichColor": "hsl(76, 70%, 50%)",
    "kebab": 137,
    "kebabColor": "hsl(254, 70%, 50%)",
    "fries": 102,
    "friesColor": "hsl(69, 70%, 50%)",
    "donut": 166,
    "donutColor": "hsl(341, 70%, 50%)"
  },
*/

/*
  
  const dataFakeCountrySet = [
  {
    id: "japan",
    color: "hsl(109, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 106,
      },
        
*/
