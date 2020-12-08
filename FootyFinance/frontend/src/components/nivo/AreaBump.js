import React, {
  useState,
  useEffect,
  Fragment,
  useStateCallback,
  useCallback,
  memo,
  useRef,
} from "react";
import { ResponsiveAreaBump, AreaBumpDefaultProps } from "@nivo/bump";
import { useTooltip, BasicTooltip } from "@nivo/tooltip";
import store from "../../store";
import { FormatLine, FormatBar, FormatAreaBump } from "./formatData";
import PropTypes from "prop-types";
import MyCustomTooltip from "./MyCustomTooltip";
import AreaBumpFilters from "./AreaBumpFilters";

import { useMeasure } from "@nivo/core";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
let dataStore = "TESTING_INIT";
const translate = function translate(x, y) {
  return "translate(".concat(x, "px, ").concat(y, "px)");
};

export default function AreaBump(props) {
  const [serieData, setSerieData] = useState({});
  const [mouseEvent, setMouseEvent] = useState({});
  const handleMouseMove = (params, params2) =>
    useCallback(
      console.log("handleMouseMove"),

      console.log(params),
      console.log(params2),
      (params) => setNodeId(params.id),
      [setNodeId]
      /*node => setNodeId(node.id), [setNodeId]*/
    );
  console.log("AREABUMP_PROPS___");
  console.log(props);
  console.log("AreaBumpProps_PROPS___");

  console.log(AreaBumpDefaultProps);

  const { tooltip } = AreaBumpDefaultProps;
  //console.log(tooltip);

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

  const [dataFormatted, setDataFormatted] = useState([]);
  const [dataCurrent, setDataCurrent] = useState([]);

  useEffect(() => {
    console.log("setUp");
    console.log(setUp);
    if (fsdataStatus == "idle") {
      console.log("fsdataStatus:_ " + fsdataStatus);
      return;
    }
    console.log("fsdataStatus:_DONE:  " + fsdataStatus);

    let getData = store.getState().fs_data.fs_data_years_test2[setUp.storeRef]
      .data;

    console.log(getData);

    let dataRes = FormatAreaBump(getData, {
      axisBottom: setUp.axisBottom,
      axisLeft: setUp.axisLeft,
      axisRight: setUp.axisRight,
      years: setUp.years,
      dataKey: setUp.dataKey,
      clubsArray: setUp.clubsArray,
    });

    setDataFormatted(dataRes.dataAll);
    setDataCurrent(dataRes.dataAll);
  }, [fsdataStatus, setUp.clubsArray]);

  const [tooltipElement, setTooltipElement] = useState(null);
  const formatTooltip = ({ serie, event }) => {
    let content = null;

    /*   console.log("TOOLTIP_TEST____CUSTOM_TEST");
    console.log(serie);

    console.log(event);
    console.log("event_client");

    console.log(event.clientX);
 

    console.log(event.clientY);


    console.log("measure");
    console.log(event.pageX - event.clientX);
    console.log(event.pageY - event.clientY); */

    let clientX = event.clientX;
    let clientY = event.clientY;

    let target = event.target;

    let parent = target.parentElement;
    let parentRect = target.parentElement.getBoundingClientRect();
    let parentRectTop = parentRect.top;

    let dim = target.getBoundingClientRect();

    //console.log(dimTop);

    let constant = (dim.right - dim.left) / serie.points.length / 2;

    clientX = clientX - dim.left;
    clientY = clientY - dim.top;
    //let x = event.clientX - AreaBumpDefaultProps.innerWidth + constant; //let
    //let y = event.clientY - AreaBumpDefaultProps.innerHeight; //let

    //console.log()

    let x = event.clientX - dim.left + constant; //let
    let y = event.clientY - parentRectTop; //let
    /* console.log("X_AND_Y_COORDINATES");
    console.log("x: " + x + " y:" + y); */

    let xPoint;
    let points = serie.points;
    for (const item in points) {
      if (points[item].x > x) break;
      xPoint = points[item];
    }
    console.log("xPoint");
    console.log(xPoint);
    try {
      if (xPoint.data.x == tooltipElement.xPoint) return;
    } catch (error) {}

    if (serie == null) {
      setTooltipElement(null);
      return;
    }
    if (xPoint == null) {
      setTooltipElement(null);
      return;
    }

    content = (
      <div
        style={{
          boxSizing: "border-box",
          background: "white",
          border: 1,
          borderColor: "grey",
          margin: 1,
          padding: 2,
          paddingLeft: 3,
          paddingRight: 3,
        }}
      >
        <span style={{ color: serie.color, margin: 2 }}>&#9632;</span>
        <strong>{serie.id}</strong>
        <br />

        <span> {"year: " + xPoint.data.x}</span>
        <br />

        <span>{xPoint.data.key + ": " + xPoint.data.yNotScaled}</span>
        <br />
        <span>
          {"rank: " +
            xPoint.data.rankPosition +
            "/" +
            xPoint.data.rankTotalItems}
        </span>
        <br />
        <span>{"share : " + xPoint.data.rankPercentage}</span>
        <br />
      </div>
    );

    //let html;
    content = (
      /*  <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          zIndex: 100,
          top: "0px",
          left: "0px",
          fontSize: "0.9375rem",
          fontFamily:
            'Lato,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
          fontWeight: 400,
          lineHeight: 1.5,
          transform: translate(foreignObjX, y),
        }}
      > */
      <div
        style={{
          background: "white",
          color: "black",

          borderWidth: "2px",
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 2px",
          padding: "5px 9px",
        }}
      >
        <div
          style={{ whiteSpace: "pre", display: "flex", alignItems: "center" }}
        >
          <span
            style={{
              display: "block",
              width: "12px",
              height: "12px",
              background: "rgb(241, 225, 91)",
              marginRight: " 7px",
              //color: "blue",
              background: serie.color,
            }}
          ></span>
          {serie.id}
        </div>

        <span> {"year: " + xPoint.data.x}</span>
        <br />

        <span>{xPoint.data.key + ": " + xPoint.data.yNotScaled}</span>
        <br />
        <span>
          {"rank: " +
            xPoint.data.rankPosition +
            "/" +
            xPoint.data.rankTotalItems}
        </span>
        <br />
        <span>{"share : " + xPoint.data.rankPercentage}</span>
        <br />
      </div>
      /*  </div> */
    );

    /* console.log("TOOLTIP_TEST____CUSTOM_TEST_FINISH");
    console.log(content); */

    let attributes = {
      x: x,
      y: y,
      color: serie.color,
      borderColor: serie.color,
      clientX: clientX,
      clientY: clientY,
    };
    /* console.log("setTooltipElement_attributes");
    console.log(attributes); */
    setTooltipElement({
      element: content,
      attributes: attributes,
      xPoint: xPoint.data.x,
    });
  };

  const MyCustomTooltipFunc = (props) => {
    console.log("MyCustomTooltipFunc_START");
    console.log(props);

    console.log(tooltipElement);
    //return <div>TESTIIIIN</div>;

    return (
      <MyCustomTooltip
        commonProps={props}
        content={tooltipElement}
        style={{
          position: "relative",

          height: setUp.elementHeight,
          top: " 0px",
          left: "0px",
          width: "inherit",
        }}
      />
    );
  };
  const [filterClubs, setFilterClubs] = useState([]);

  useEffect(() => {
    console.log("filterClubs_CHANGED");

    console.log(filterClubs);
    console.log(dataFormatted);

    let selectedData = [];

    for (const item in filterClubs) {
      let beg = filterClubs[item][0];
      let end = filterClubs[item][1] + 1;

      while (beg < end) {
        selectedData.push(dataFormatted[beg]);
        beg++;
      }
    }

    if (selectedData.length != 0) {
      console.log(selectedData);
      setDataCurrent(selectedData);
    }
  }, [filterClubs]);

  console.log(filterClubs);
  console.log("filterClubs__TESTING__");
  console.log(dataCurrent);

  return (
    <div
      className="graphWrapper"
      id={setUp.element}
      style={{
        height: setUp.elementHeight,
        position: "relative",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1,
      }} //TTTT
    >
      <AreaBumpFilters
        setFilterClubs={setFilterClubs}
        clubs={dataFormatted}
        test="PropTest"
      ></AreaBumpFilters>
      <ResponsiveAreaBump
        //tooltip={<div>Maintooltip</div>}
        style={{ position: "relative" }}
        layers={["grid", "axes", "labels", "areas", MyCustomTooltipFunc]}
        tooltip={() => {
          return null;
        }}
        onMouseEnter={(serie, event) => {
          /*
          console.log("ONMOUSEENTER");
          console.log(serie);
          console.log(event.target);*/
        }}
        onClick={(serie, event) => {
          //setSerieData(serie);
          //setMouseEvent(event);
          //formatTooltip({ serie, event });
          //console.log("CLICK_EVENT__"), handleNodeHover(serie, event);
        }}
        onMouseMove={(serie, event) => {
          formatTooltip({ serie, event });
        }}
        onMouseLeave={(serie, event) => {
          setTooltipElement(null);
          /*
          console.log("LEAVE___");
          console.log(serie);
          console.log(event.target);*/
        }}
        //enableSlices="x"
        isInteractive={true}
        data={dataCurrent}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        spacing={8}
        colors={{ scheme: "nivo" }}
        blendMode="multiply"
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 0.05,
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
        fill={
          [
            /*
          {
            match: {
              id: "CoffeeScript",
            },
            id: "dots",
          },
          {
            match: {
              id: "TypeScript",
            },
            id: "lines",
          },
        */
          ]
        }
        startLabel="id"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: -36,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: 32,
        }}
      />
      {console.log("TESTING_______________________")}

      {console.log(AreaBumpDefaultProps)}
      {console.log()}
    </div>
  );
}

/** <div
        id="MyCustomTooltipWrapper"
        style={{
          position: "absolute",
          height: setUp.elementHeight,
          top: " 0px",
          left: "0px",
          width: "inherit",
          zIndex: 2,
        }}
      >
        <MyCustomTooltip
          content={tooltipElement}
          style={{
            position: "relative",

            height: setUp.elementHeight,
            top: " 0px",
            left: "0px",
            width: "inherit",
          }}
        />
      </div>
      */
