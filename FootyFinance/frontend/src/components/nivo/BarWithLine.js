import React, { useState, useEffect, Fragment } from "react";
//import { render } from 'react-dom'
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import Paper from "@material-ui/core/Paper";
import store from "../../store";
import { FormatLine, FormatBar } from "./formatData";
import { line } from "d3-shape";
import * as d3 from "d3";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  shape: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
  },
  shapeCircle: {
    borderRadius: "50%",
  },
}));

const SCALE_ARRAYMIN = 0.5;
const SCALE_ARRAYMAX = 1.2;

const calculateScaleMinMax = (value, minMax) => {
  let res;

  if (minMax == "min") {
    if (value < 0) {
      res = value / SCALE_ARRAYMIN;
    } else {
      res = value * SCALE_ARRAYMIN;
    }
  } else {
    if (value < 0) {
      res = value / SCALE_ARRAYMAX;
    } else {
      res = value * SCALE_ARRAYMAX;
    }
  }

  return res;
};
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
//{ data /* see data tab */ }

/*CustomBar
layersoptionaldefault:['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh', 'legends']
*/
export default function BarWithLine(props) {
  const classes = useStyles();
  const {
    setUp: [setUp, setSetUp],
  } = {
    setUp: useState([]),
    ...(props.state || {}),
  };

  let fsdataStatus = "idle";

  try {
    fsdataStatus = store.getState().fs_data.fs_data_years_test2[setUp.storeRef]
      .status;
  } catch (error) {
    console.log(error);
    fsdataStatus = "idle";
  }
  console.log("fsdataStatus " + fsdataStatus);

  console.log("MyResponsiveLine_data__TEST");
  console.log(props);

  console.log("setUp");
  console.log(setUp);

  //const clubs = store.getState().clubs.clubs.data; //.slice(0, 24);

  //let data = [];
  const [data, setData] = useState([]);
  const [dataFormatted, setDataFormatted] = useState([]);
  const [dataFormattedLeftAxis, setDataFormattedLeftAxis] = useState([]);
  const [dataFormattedRightAxis, setDataFormattedRightAxis] = useState([]);
  const [barDataFormatted, setBarDataFormatted] = useState([]);

  useEffect(() => {
    if (fsdataStatus == "idle") {
      console.log("fsdataStatus:_ " + fsdataStatus);
      return;
    }
    console.log("fsdataStatus:_DONE:  " + fsdataStatus);

    let getData = store.getState().fs_data.fs_data_years_test2[setUp.storeRef]
      .data;
    setData(getData);
    console.log(getData);

    let dataRes = FormatLine(getData, {
      axisBottom: setUp.axisBottom,
      axisLeft: setUp.axisLeft,
      axisRight: setUp.axisRight,
      years: setUp.years,
      dataKey: setUp.dataKey,
    });

    //data:
    let barDataRes = FormatBar(getData, {
      axisBottom: setUp.axisBottom,
      axisLeft: setUp.axisLeft,
      axisRight: setUp.axisRight,
      years: setUp.years,
      dataKey: setUp.dataKey,
    });

    setDataFormatted(dataRes.dataAll);
    setDataFormattedLeftAxis(dataRes.leftData);
    setDataFormattedRightAxis(dataRes.rightData);
    setBarDataFormatted(barDataRes);
  }, [fsdataStatus]);

  console.log("MyResponsiveLine_data_COMP__TEST");
  console.log(dataFormatted);
  console.log(dataFormattedLeftAxis);
  console.log(barDataFormatted);

  //indexBy
  let keysVals = {};
  const keysValsLeft = [];
  const keysValsRight = [];
  for (const item in dataFormattedLeftAxis) {
    keysValsLeft.push(dataFormattedLeftAxis[item].id);
  }
  for (const item in dataFormattedRightAxis) {
    keysValsRight.push(dataFormattedRightAxis[item].id);
  }
  keysVals["left"] = keysValsLeft;
  keysVals["right"] = keysValsRight;
  console.log("keysValss__TEST");
  console.log(keysVals);

  console.log(dataFakeCountrySet);

  const arrayMinData = [];

  for (const item in dataFormattedLeftAxis) {
    if (dataFormattedLeftAxis[item].axis == "left") {
      for (const element in dataFormattedLeftAxis[item].data) {
        let value = "";
        try {
          value = dataFormattedLeftAxis[item].data[element].y;
        } catch (error) {}
        arrayMinData.push(value);
      }
    }
  }
  console.log("arrayMinData__LEFT__");
  console.log(arrayMinData);

  let arrayMin = Math.min.apply(Math, arrayMinData);
  let arrayMax = Math.max.apply(Math, arrayMinData);
  arrayMin.toString();
  arrayMax.toString();
  console.log(arrayMin);
  console.log(arrayMax);

  const MyCustomTooltip = (bars, xScale, yScale) => {
    console.log("MyCustomTooltip_TETSING");
    console.log(bars);
    console.log(xScale);
    console.log(yScale);
  };

  const BarRightAxisLine = ({
    bars,
    xScale,
    yScale,
    /* series, lineGenerator, */
  }) => {
    console.log("CustomLine_TEST____BAR_FIRSTELEMENT");
    console.log(bars);
    console.log(xScale);
    console.log(yScale);
    if (bars.length == 0) return;

    //var myxScale = d3.scaleLinear().domain([2010, 2018]).range([25, 175]);

    //.x((bar) => xScale(bar.data.index) + bar.width / 2)
    const lineGenerator = line()
      .x((bar) => xScale(bar.data.indexValue) + bar.width / 2)
      .y((bar) => yScale(bar.data.data.scaledValue_Profit));

    let lineColor = "rgba(200, 30, 15, 1)";
    console.log("BARTESTING:__");
    try {
      console.log(bars[0].data.index);
      console.log(bars[0].width);
    } catch (error) {
      console.log(error);
    }

    let testD = lineGenerator(bars);
    console.log("testD");
    console.log(testD);

    return (
      <Fragment>
        <path
          d={testD}
          fill="none"
          stroke={lineColor}
          style={{ pointerEvents: "none" }}
        />
        {bars.map((bar) => (
          <circle
            key={bar.key}
            cx={xScale(bar.data.indexValue) + bar.width / 2}
            cy={yScale(bar.data.data.scaledValue_Profit)}
            r={4}
            fill="white"
            stroke={lineColor}
            style={{ pointerEvents: "none" }}
          />
        ))}
      </Fragment>
    );
  };

  const MyBars = ({ bars, xScale, yScale }) => {
    console.log("CustomLine_TEST____MyBars");
    console.log(bars);
    console.log(xScale);
    console.log(yScale);
    return null;
  };

  let rightAxisElement = "";

  console.log("setUp.axisRight_TEST");
  console.log(setUp.axisRight);

  if (setUp.axisRight != null) {
    //if (setUp.axisRight == "TESTING......") {
    rightAxisElement = (
      <div
        className="RightAxisLineContainer"
        style={{
          height: 400,
          position: "absolute",
          top: 0,
          left: 0,
          width: "inherit", // "100%", //TTTT
          zIndex: 0,
        }}
      >
        <RightAxisBar
          //leftAxisData={dataFormattedLeftAxis}
          rightAxisData={dataFormatted}
          leftAxisData={dataFormatted}
          barDataFormatted={barDataFormatted}
          keysVals={keysVals}
          BarRightAxisLine={BarRightAxisLine}
          setUp={setUp}
        />
      </div>
    );
  }

  return (
    <div
      className="graphWrapper"
      style={{
        height: 400,
        position: "relative",
        top: 0,
        left: 0,
        width: "100%",
      }} //TTTT
    >
      <div
        className="graphContainer"
        style={{
          height: 400,
          position: "absolute",
          width: "inherit", // "100%", //TTTT
          zIndex: 1,
          /* top: "0px",*/
        }}
      >
        <ResponsiveBar
          data={barDataFormatted} //{dataFakeFood}
          keys={keysVals.left} //{setUp[setUp.axisBottom["items"]]}// {["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]} //{setUp[setUp.axisBottom["items"]]}//
          indexBy={setUp.dataKey["xVal"]} //"country" //{setUp[setUp.axisBottom["unit"]]}
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          minValue={0}
          maxValue={arrayMax}
          padding={0.55}
          height={400}
          enableGridY={false}
          enableGridX={false}
          groupMode="grouped"
          valueScale={{ type: "linear" }}
          colors={{ scheme: "nivo" }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "fries",
              },
              id: "dots",
            },
            {
              match: {
                id: "sandwich",
              },
              id: "lines",
            },
          ]}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          layers={[
            "grid",
            "axes",
            "bars",
            //MyBars,
            BarRightAxisLine,
            //MyCustomTooltip,
            "markers",
            "legends",
          ]}
          axisTop={null}
          axisLeft={{
            tickSize: 0,
            tickPadding: 0,
            tickRotation: 0,
            legend: setUp.axisLeft.unit,
            legendPosition: "middle",
            legendOffset: -40,
            tickValues: 10,
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: 36,
          }}
          axisRight={null}
          tooltip={({ id, value, color, bars, data }) => {
            console.log("TOOLTIP_TEST1____");
            console.log(id);
            console.log(value);
            console.log(color);
            console.log(data);
            console.log("keysValsRight");
            console.log(keysValsRight);
            const testArray = [];
            let testString = "";
            keysValsRight.map((key) => {
              testString = +testString + key + ": " + data[key];
              testArray.push(testString);
            });
            console.log("testString");
            console.log(testString);
            console.log(testArray);
            /**"Profittii: "{data.Profit} 
             * 
             * <strong>
                {id}: {value}
                {testString}
              </strong>
            */
            return (
              <div>
                <strong>{id}:</strong> {value}
                {keysValsRight.map((key, index) => (
                  <div key={key + index}>
                    <strong>{key}</strong> : {data[key]}
                  </div>
                ))}
              </div>
            );
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          isInteractive={true}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>

      {/*
      <div
        className="RightAxisLineContainer"
        style={{
          height: 400,
          position: "absolute",
          width: "inherit", // "100%", //TTTT
        }}
      >
        <RightAxisLine
          leftAxisData={dataFormattedLeftAxis}
          rightAxisData={dataFormatted}
          setUp={setUp}
        />
      </div>*/}
      {rightAxisElement}
      {/*
      <div
        className="RightAxisLineContainer"
        style={{
          height: 400,
          position: "absolute",
          top: 0,
          left: 0,
          width: "inherit", // "100%", //TTTT
        }}
      >
        <RightAxisBar
          //leftAxisData={dataFormattedLeftAxis}
          rightAxisData={dataFormatted}
          leftAxisData={dataFormatted}
          barDataFormatted={barDataFormatted}
          keysVals={keysVals}
          BarRightAxisLine={BarRightAxisLine}
          setUp={setUp}
        />
      </div>*/}
    </div>
  );
}

/******************************************************************************* */

function RightAxisBar(props) {
  const [setUp, setSetUp] = useState(props.setUp);

  let fsdataStatus = "idle";

  /*
  try {
    fsdataStatus = store.getState().fs_data.fs_data_years_test2[setUp.storeRef]
      .status;
  } catch (error) {
    console.log(error);
    fsdataStatus = "idle";
  }
  */
  console.log("fsdataStatus " + fsdataStatus);

  console.log("MyResponsiveLine_data__TEST_RIGHT");
  console.log(props);

  console.log("setUp");
  console.log(setUp);

  //const clubs = store.getState().clubs.clubs.data; //.slice(0, 24);

  //let data = [];
  //const [data, setData] = useState();
  const [dataFormatted, setDataFormatted] = useState([]);
  const [dataFormattedLeftAxis, setDataFormattedLeftAxis] = useState(
    props.leftAxisData
  );
  const [dataFormattedRightAxis, setDataFormattedRightAxis] = useState(
    props.rightAxisData
  );

  //return <div></div>;

  console.log("MyResponsiveLine_data_COMP__TEST_RIGHT_COMP");
  console.log(props.rightAxisData);
  console.log(props.barDataFormatted);
  console.log(setUp.axisRight.unit);
  console.log(setUp.axisBottom.unit);

  const arrayMinData = [];

  for (const item in props.rightAxisData) {
    if (props.rightAxisData[item].axis == "right") {
      for (const element in props.rightAxisData[item].data) {
        let value = "";
        try {
          value = props.rightAxisData[item].data[element].y;
        } catch (error) {}
        arrayMinData.push(value);
      }
    }
  }
  console.log("arrayMinData");
  console.log(arrayMinData);

  let arrayMin = Math.min.apply(Math, arrayMinData);
  let arrayMax = Math.max.apply(Math, arrayMinData);
  arrayMin.toString();
  arrayMax.toString();
  console.log(arrayMin);
  console.log(arrayMax);

  /**************************************************************************** */

  const MyBars = ({ bars, xScale, yScale }) => {
    console.log("CustomLine_TEST____MyBars___");
    console.log(bars);
    console.log(xScale);
    console.log(yScale);
    return null;
  };

  /************ *********************************************************/
  const BarRightAxisLineRight = ({
    bars,
    xScale,
    yScale,
    /* series, lineGenerator, */
  }) => {
    console.log("CustomLine_TEST____BarRightAxisLineRight");
    console.log(bars);
    console.log(xScale);
    console.log(yScale);
    if (bars.length == 0) return;

    //var myxScale = d3.scaleLinear().domain([2010, 2018]).range([25, 175]);

    //.x((bar) => xScale(bar.data.index) + bar.width / 2)
    const lineGenerator = line()
      .x((bar) => xScale(bar.data.indexValue) + bar.width / 2)
      .y((bar) => yScale(bar.data.data.Profit));

    let lineColor = "rgba(200, 30, 15, 1)";
    console.log("BARTESTING:__");
    try {
      console.log(bars[0].data.index);
      console.log(bars[0].width);
    } catch (error) {
      console.log(error);
    }

    let testD = lineGenerator(bars);
    console.log("testD");
    console.log(testD);

    return (
      <Fragment>
        <path
          d={testD}
          fill="none"
          stroke={lineColor}
          style={{ pointerEvents: "none" }}
        />
        {bars.map((bar) => (
          <circle
            key={bar.key}
            cx={xScale(bar.data.indexValue) + bar.width / 2}
            cy={yScale(bar.data.data.Profit)}
            r={4}
            fill="white"
            stroke={lineColor}
            style={{ pointerEvents: "none" }}
          />
        ))}
      </Fragment>
    );
  };

  return (
    <div
      className="graphWrapper"
      style={{
        height: 400,
        position: "relative",
        top: 0,
        left: 0,
        width: "100%",
      }} //TTTT
    >
      <div
        className="graphContainer"
        style={{
          height: 400,
          position: "absolute",
          width: "inherit", // "100%", //TTTT
          /* top: "0px",*/
        }}
      >
        <ResponsiveBar
          data={props.barDataFormatted} //{dataFakeFood}
          keys={props.keysVals.right} //{setUp[setUp.axisBottom["items"]]}// {["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]} //{setUp[setUp.axisBottom["items"]]}//
          indexBy={setUp.dataKey["xVal"]} //"country" //{setUp[setUp.axisBottom["unit"]]}
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.55}
          height={400}
          minValue={arrayMin}
          maxValue={arrayMax}
          enableGridY={false}
          enableGridX={false}
          groupMode="grouped"
          valueScale={{ type: "linear" }}
          colors={{ scheme: "nivo" }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "fries",
              },
              id: "dots",
            },
            {
              match: {
                id: "sandwich",
              },
              id: "lines",
            },
          ]}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          layers={[
            "grid",
            "axes",
            //"bars",
            MyBars,
            //props.BarRightAxisLine,
            //BarRightAxisLineRight,
            "markers",
            "legends",
          ]}
          axisTop={null}
          axisLeft={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: 36,
          }} /*
          axisLeft={{
            tickSize: 0,
            tickPadding: 0,
            tickRotation: 0,
            legend: "food",
            legendPosition: "top",
            legendOffset: -40,
          }}*/
          axisRight={{
            tickSize: 0,
            tickPadding: 0,
            tickRotation: 0,
            tickValues: 10,
            legend: props.setUp.axisLeft.unit,
            legendPosition: "middle",
            legendOffset: 40,
          }}
          axisTop={null}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[]}
          isInteractive={false}
          tooltip={({ id, value, color }) => {
            console.log("TOOLTIP_TEST1____2el");
            console.log(id);
            console.log(value);
            return (
              <strong>
                {id}: {value + " " + "POUNDS!"}
              </strong>
            );
          }}
          /*
          sliceTooltip={({ slice }) => {
            console.log("TOOLTIP_TEST___2el");
            console.log(slice);
            return (
              <div
                id="TESTINGID2"
                style={{
                  background: "white",
                  padding: "9px 12px",
                  border: "1px solid #ccc",
                }}
              >
                {<div>x: {slice.id}</div>}
                {slice.points.map((point) => (
                  <div
                    key={point.id + point.index} //JWTODO: KORJAA KEY
                    style={{
                      color: point.serieColor,
                      padding: "3px 0",
                    }}
                  >
                    <strong>{point.serieId}</strong> [{point.data.yFormatted}]
                  </div>
                ))}
              </div>
            );
          }}*/
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </div>
  );
}

/*
export default function returnNull() {
  return null;
}*/

const CustomSymbol = ({ size, color, borderWidth, borderColor, symbol }) => {
  console.log("CustomSymbol");
  console.log(size);
  console.log(color);
  console.log(borderWidth);
  console.log(borderColor);
  console.log("xxx:");
  console.log(symbol);

  //console.log(data);
  let content;
  return "";
  return (
    <g>
      <circle
        fill="#fff"
        r={size / 2}
        strokeWidth={borderWidth}
        stroke={borderColor}
      />
      <circle
        r={size / 5}
        strokeWidth={borderWidth}
        stroke={borderColor}
        fill={color}
        fillOpacity={0.35}
      />
    </g>
  );
};

const CustomLine = ({ series, lineGenerator, xScale, yScale }) => {
  console.log("CustomLine_TEST____");
  console.log(series);
  console.log(xScale);
  let newSeries = [];
  series.map((value) => {
    console.log(value);

    console.log("axis");
    if (value.axis != "left") {
      newSeries.push(value);
    }
  });
  console.log("newSeries__TEST___");
  console.log(newSeries);
  newSeries = newSeries.map(({ id, data, color }) => (
    <path
      key={id}
      d={lineGenerator(
        data.map((d) => ({
          x: xScale(d.data.x),
          y: yScale(d.data.y),
        }))
      )}
      fill="none"
      stroke={color}
      style={styleById[id] || styleById.default}
    />
  ));
  console.log("CustomLine_TEST____NEWSERIES_TEST");
  console.log(newSeries);
  return newSeries;
};

const CustomPointer = ({
  points,
  pointSymbol,
  pointLabel,
  pointSize,
  pointLabelYOffset,
  borderColor,
  getPointColor,
}) => {
  console.log("CustomPointer_TEST____");
  console.log(points);
  console.log(pointSymbol);
  console.log(pointLabel);
  console.log(pointSize);
  console.log(pointLabelYOffset);
  console.log("borderColor");
  console.log(borderColor);
  console.log("getPointColor");
  console.log(getPointColor);

  //return "";
  let newPoints = points.map(
    ({ serieId, serieColor, borderColor, color, data, id, index, x, y }) => (
      <path
        key={id}
        color={color}
        data={data}
        id={id}
        index={index}
        x={x}
        y={y}
        bordercolor={
          styleById[serieId] != undefined
            ? styleById[serieId].borderColor
            : borderColor || borderColor
        }
        seriecolor={
          styleById[serieId] != undefined
            ? styleById[serieId].serieColor
            : serieColor || serieColor
        }
      />
    )
  );
  console.log("newPoints__TEST___");
  console.log(newPoints);

  return newPoints;
  return (
    <g>
      <circle
        fill="#fff"
        r={20 / 2}
        strokeWidth={borderWidth}
        stroke={borderColor}
      />
      <circle
        r={20 / 5} //size
        strokeWidth={borderWidth}
        stroke={borderColor}
        fill={color}
        fillOpacity={0.35}
      />
    </g>
  );

  console.log(xScale);
  let newSeries = [];
  series.map((value) => {
    console.log(value);

    console.log("axis");
    if (value.axis != "left") {
      newSeries.push(value);
    }
  });
  console.log("newSeries__TEST___");
  console.log(newSeries);
  return newSeries.map(({ id, data, color }) => (
    <path
      key={id}
      d={lineGenerator(
        data.map((d) => ({
          x: xScale(d.data.x),
          y: yScale(d.data.y),
        }))
      )}
      fill="none"
      stroke={color}
      style={styleById[id] || styleById.default}
    />
  ));
};

/*
if (isInteractive && enableCrosshair) {
    if (currentPoint !== null) {
      layerById.crosshair = React__default.createElement(tooltip.Crosshair, {
        key: "crosshair",
        width: innerWidth,
        height: innerHeight,
        x: currentPoint.x,
        y: currentPoint.y,
        type: crosshairType
      });
    }
*/

const CustomCrosshair = ({ series, lineGenerator, xScale, yScale }) => {
  console.log("CustomLine__TEST__");
  console.log(series);
  //console.log(currentPoint);
  /*
  return series.map(({ id, data, color }) => (
    <path
      key={id}
      d={lineGenerator(
        data.map((d) => ({
          x: xScale(d.data.x),
          y: yScale(d.data.y),
        }))
      )}
      fill="none"
      stroke={color}
      style={styleById[id] || styleById.default}
    />
  ));
  */
  let content = series.map(({ id, data, color }) => (
    <path
      key={id}
      width={1}
      height={2}
      x={data.x}
      y={data.y}
      type="bottom-right"
    />
  ));

  console.log(content);
  return content;
};

/********************************************************************* */

/************************************************************************************************* */

const styleById = {
  revenue: {
    borderColor: "#f47560",
    serieColor: "#f47560",
  },
  us: {
    strokeDasharray: "12, 6",
    strokeWidth: 2,
  },
  france: {
    strokeDasharray: "1, 16",
    strokeWidth: 3,
    strokeLinejoin: "round",
    strokeLinecap: "round",
  },
  japan: {
    strokeDasharray: "6, 6",
    strokeWidth: 4,
  },
  default: {
    strokeWidth: 3,
  },
};

const dataFakeCountrySet = [];

const dataFakeFood = [
  {
    country: "AD",
    "hot dog": 134,
    "hot dogColor": "hsl(242, 70%, 50%)",
    burger: 188,
    burgerColor: "hsl(202, 70%, 50%)",
    sandwich: 135,
    sandwichColor: "hsl(76, 70%, 50%)",
    kebab: 137,
    kebabColor: "hsl(254, 70%, 50%)",
    fries: 102,
    friesColor: "hsl(69, 70%, 50%)",
    donut: 166,
    donutColor: "hsl(341, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 36,
    "hot dogColor": "hsl(26, 70%, 50%)",
    burger: 34,
    burgerColor: "hsl(194, 70%, 50%)",
    sandwich: 145,
    sandwichColor: "hsl(73, 70%, 50%)",
    kebab: 91,
    kebabColor: "hsl(137, 70%, 50%)",
    fries: 185,
    friesColor: "hsl(125, 70%, 50%)",
    donut: 126,
    donutColor: "hsl(92, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 81,
    "hot dogColor": "hsl(17, 70%, 50%)",
    burger: 132,
    burgerColor: "hsl(107, 70%, 50%)",
    sandwich: 167,
    sandwichColor: "hsl(7, 70%, 50%)",
    kebab: 6,
    kebabColor: "hsl(207, 70%, 50%)",
    fries: 79,
    friesColor: "hsl(156, 70%, 50%)",
    donut: 52,
    donutColor: "hsl(28, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 48,
    "hot dogColor": "hsl(86, 70%, 50%)",
    burger: 74,
    burgerColor: "hsl(351, 70%, 50%)",
    sandwich: 153,
    sandwichColor: "hsl(278, 70%, 50%)",
    kebab: 38,
    kebabColor: "hsl(135, 70%, 50%)",
    fries: 190,
    friesColor: "hsl(351, 70%, 50%)",
    donut: 10,
    donutColor: "hsl(75, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 147,
    "hot dogColor": "hsl(198, 70%, 50%)",
    burger: 158,
    burgerColor: "hsl(170, 70%, 50%)",
    sandwich: 142,
    sandwichColor: "hsl(115, 70%, 50%)",
    kebab: 92,
    kebabColor: "hsl(220, 70%, 50%)",
    fries: 101,
    friesColor: "hsl(17, 70%, 50%)",
    donut: 36,
    donutColor: "hsl(340, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 39,
    "hot dogColor": "hsl(157, 70%, 50%)",
    burger: 178,
    burgerColor: "hsl(84, 70%, 50%)",
    sandwich: 168,
    sandwichColor: "hsl(230, 70%, 50%)",
    kebab: 44,
    kebabColor: "hsl(169, 70%, 50%)",
    fries: 133,
    friesColor: "hsl(317, 70%, 50%)",
    donut: 90,
    donutColor: "hsl(52, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 18,
    "hot dogColor": "hsl(11, 70%, 50%)",
    burger: 43,
    burgerColor: "hsl(212, 70%, 50%)",
    sandwich: 38,
    sandwichColor: "hsl(173, 70%, 50%)",
    kebab: 71,
    kebabColor: "hsl(81, 70%, 50%)",
    fries: 95,
    friesColor: "hsl(242, 70%, 50%)",
    donut: 171,
    donutColor: "hsl(197, 70%, 50%)",
  },
];
