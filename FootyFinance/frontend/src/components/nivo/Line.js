import React, { useState, useEffect } from "react";
//import { render } from 'react-dom'
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import Paper from "@material-ui/core/Paper";
import store from "../../store";
import { FormatLine } from "./formatData";

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

/*
layersoptionaldefault:['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh', 'legends']
*/
export default function MyResponsiveLine(props) {
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
    setDataFormatted(dataRes.dataAll);
    setDataFormattedLeftAxis(dataRes.leftData);
    setDataFormattedRightAxis(dataRes.rightData);
  }, [fsdataStatus]);

  console.log("MyResponsiveLine_data_COMP__TEST");
  console.log(dataFormatted);
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

  return (
    <div
      className="graphWrapper"
      style={{ height: 400, position: "relative", top: 0, left: 0 }}
    >
      <div
        className="graphContainer"
        style={{
          height: 400,
          position: "absolute",
          width: "100%",
          /* top: "0px",*/
        }}
      >
        <ResponsiveLine
          data={dataFormattedLeftAxis}
          margin={{
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
          }} /*TESTXX { top: 50, right: 110, bottom: 50, left: 60 } */
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min:
              arrayMin != undefined
                ? calculateScaleMinMax(arrayMin, "min")
                : "auto", //"-90",
            max:
              arrayMax != undefined
                ? calculateScaleMinMax(arrayMax, "max")
                : "auto", //"90",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          /*
      axisRight={{
        orient: "right",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: setUp.axisRight.unit,
        legendOffset: 40,
        legendPosition: "middle",
      }}
      */
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: setUp.axisBottom.unit,
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: setUp.axisLeft.unit,
            legendOffset: -40,
            legendPosition: "middle",
          }} /*
    layers={[
      "grid",
      "markers",
      "areas",
      DashedLine,
      "slices",
      "points",
      "axes",
      "legends",
    ]}*/
          /* TESTXXX
          layers={[
            "grid",
            "markers",
            "axes",
            "areas",
            "crosshair",
            CustomLine,
            "points",
            "slices",
            "mesh",
            "legends",
          ]}
          */
          pointSize={10}
          pointColor={{ theme: "background" }}
          //pointSymbol={CustomSymbol}
          pointBorderWidth={3}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          //useMesh={true} TESTXXX
          //crosshairType={"cross"} TESTXXX
          //enableSlices="x"// TESTXXX
          /* TESTXXX
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}*/
          theme={{
            crosshair: {
              line: {
                strokeWidth: 2,
              },
            },
          }}
        />
      </div>

      <div
        className="RightAxisLineContainer"
        style={{
          height: 400,
          position: "absolute",
          width: "100%",
        }}
      >
        <RightAxisLine
          leftAxisData={dataFormattedLeftAxis}
          rightAxisData={dataFormatted}
          setUp={setUp}
        />
      </div>
    </div>
  );
}

/******************************************************************************* */

function RightAxisLine(props) {
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

  //console.log(dataFakeCountrySet);

  return (
    <div style={{ height: 400 }}>
      {console.log("data_dataFormattedRightAxis")}
      {console.log(dataFormattedRightAxis)}
      {console.log(props.rightAxisData)}
      {console.log(props.setUp.axisRight.unit)}
      <ResponsiveLine
        data={props.rightAxisData}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min:
            arrayMin != undefined
              ? calculateScaleMinMax(arrayMin, "min")
              : "auto", //"-90",
          max:
            arrayMax != undefined
              ? calculateScaleMinMax(arrayMax, "max")
              : "auto", //"90",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        //axisRight={null}

        axisRight={{
          orient: "right",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: props.setUp.axisRight.unit,
          legendOffset: 40,
          legendPosition: "middle",
        }}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: props.setUp.axisBottom.unit,
          legendOffset: 36,
          legendPosition: "middle",
        }}
        //axisBottom={null}
        axisLeft={null}
        /*
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: setUp.axisLeft.unit,
          legendOffset: -40,
          legendPosition: "middle",
        }} 
        */
        /*
      layers={[
        "grid",
        "markers",
        "areas",
        DashedLine,
        "slices",
        "points",
        "axes",
        "legends",
      ]}*/

        layers={[
          "grid",
          "markers",
          "axes",
          "areas",
          "crosshair",
          CustomLine,
          "points", //"points",CustomPointer
          "slices",
          "mesh",
          "legends",
        ]}
        enableGridY={false}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointSymbol={(e) => {
          if (e.datum.axis == "left") {
            return null;
          } else {
            console.log(e);
            console.log(e.datum);
            return (
              <circle
                cx="0"
                cy="0"
                r="5"
                stroke={e.serieColor}
                strokeWidth="2"
                fill={e.borderColor}
              />
            );
          }
        }}
        pointBorderWidth={3}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        crosshairType={"cross"}
        enableSlices="x"
        /*
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        */
        /*
        tooltip={(tProps) => {
          const x = tProps.point.data.x;
          console.log("tPropS____TEST__");
          console.log(tPropS);
          return (
            <div className="tooltip">
              <div>x: {x}</div>
              <div>Blue: {tProps.point.data.y}</div>
              <div>Red: {"find(props.firstGraphData, { x: x }).y"}</div>
            </div>
          );
        }}
        */
        /*
        tooltip={({ id, value, color }) => (
          console.log(id),
          console.log(value),
          console.log(color),
          (
            <strong style={{ color }}>
              {id}: {value}
            </strong>
          )
        )}*/

        sliceTooltip={({ slice }) => {
          console.log(slice);
          return (
            <div
              style={{
                background: "white",
                padding: "9px 12px",
                border: "1px solid #ccc",
              }}
            >
              {/*<div>x: {slice.id}</div>*/}
              {slice.points.map((point) => (
                <div
                  key={point.id}
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
        }}
        theme={{
          crosshair: {
            line: {
              strokeWidth: 2,
            },
          },
        }}
      />
    </div>
  );
}

/************************************************************************************************* */

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