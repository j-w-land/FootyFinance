import React, {
  useState,
  useEffect,
  Fragment,
  useStateCallback,
  useCallback,
  memo,
} from "react";
import { ResponsiveAreaBump, AreaBumpDefaultProps } from "@nivo/bump";
import { useTooltip, BasicTooltip } from "@nivo/tooltip";
import store from "../../store";
import { FormatLine, FormatBar, FormatAreaBump } from "./formatData";
import PropTypes from "prop-types";
import MyCustomTooltip from "./MyCustomTooltip";

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
  /*   console.log("AreaBumpProps_PROPS___");

  console.log(AreaBumpDefaultProps); */

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
  //console.log("fsdataStatus " + fsdataStatus);

  //console.log("setUp");
  //console.log(setUp);

  const [dataFormatted, setDataFormatted] = useState([]);

  useEffect(() => {
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
  }, [fsdataStatus]);

  //console.log(dataFormatted);

  //let hoverData = "";
  const [hoverData, setHoverData] = useState(null);
  //const [state, setState] = useStateCallback(0);
  const [hoverElement, setHoverElement] = useState(1);

  const hoverHandler = (data) => {
    console.log("hoverHandlerdataStore");
    console.log(dataStore);
    if (data == "get") {
      return dataStore;
    }
    console.log("hoverHandler");
    console.log(data);
    console.log(dataStore);

    setHoverData(data);
    dataStore = data;

    //setMyCustomTooltip(data);
    const mouseclickEvent = new Event("click");
    const mouseoverEvent = new Event("mouseover");
    let stat = hoverElement * -1;
    setHoverElement(stat);

    let elementName = setUp.element;
    let element = document.getElementById(elementName);
    //element.click();

    element.dispatchEvent(mouseoverEvent);
    //element.dispatchEvent(mouseoverEvent);
    console.log("HANDLER_DONE");
    return "DONE";
  };

  const customTooltip = ({ serie }) => {
    console.log("TOOLTIP_TEST____CUSTOM_TEST");

    const mouseclickEvent = new Event("click");
    const mouseoverEvent = new Event("mouseover");
    let stat = hoverElement * -1;
    //setHoverElement(stat);

    let elementName = setUp.element;
    let element = document.getElementById(elementName);
    //element.click();

    element.dispatchEvent(mouseoverEvent);
    console.log("DISPATHCED_IN_TOOLTIP");
    console.log(dataStore);
    //console.log(myCustomTooltip);
    let dataTest = hoverHandler("get");
    console.log(dataTest);

    console.log(hoverData);
    let data = hoverData;
    console.log("Hover_element_changed_1:");
    console.log(hoverElement);

    let x = 0;
    let y = 0;
    //let xPoint = { data: { x: "testX", y: "testY" } };
    const [xPoint, setxPoint] = useState({ data: { x: "testX", y: "testY" } });
    let content = null;

    let event = null;
    let xPointVal = { data: { x: "testXIn", y: "testYIn" } };

    try {
      event = data.event.persist();
    } catch (error) {}

    if (data == null) return null;
    if (data.xPoint == null) return null;

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

        <span> {"year: " + data.xPoint.data.x}</span>
        <br />

        <span>{data.xPoint.data.key + ": " + data.xPoint.data.y}</span>
        <br />
        <span>
          {"rank: " +
            data.xPoint.data.rankPosition +
            "/" +
            data.xPoint.data.rankTotalItems}
        </span>
        <br />
        <span>{"share : " + data.xPoint.data.rankPercentage}</span>
        <br />
      </div>
    );

    let size = 100;
    let color = serie.color;
    let borderColor = serie.color;
    let borderWidth = 5;
    if (hoverData == null) return null;
    //return React.createElement("div", {}, "TEEEEEEEESTTTTTT");

    console.log("TOOLTIP_TEST____CUSTOM_TEST_FINISH");
    console.log(content);
    return null;
    return React.createElement("div", {}, content);
  };
  const { showTooltipFromEvent, hideTooltip } = useTooltip();

  const BumpCustomTooltip = (propss) => {
    console.log(propss);
    console.log("bumpCustomTooltip");
    //console.log(serie);
    //console.log(event);
    return <div>BumpCustomTooltip</div>;

    return (
      <BasicTooltip
        id={node.id}
        enableChip={true}
        color={node.color}
        //format={format}
        renderContent={
          typeof tooltip === "function" ? tooltip.bind(null, { ...node }) : null
        }
      />
    );
  };

  BumpCustomTooltip.propTypes = {
    serie: PropTypes.object,
    event: PropTypes.object,
    tooltip: PropTypes.object,
  };

  const handleNodeHover = useCallback(
    (serie, event) => {
      console.log("handleNodeHover_TEST");
      console.log(serie);
      console.log(event);
      console.log(tooltip);
      showTooltipFromEvent(
        <BumpCustomTooltip serie={serie} event={event} tooltip={tooltip} />,
        event
      );
    },
    [showTooltipFromEvent, tooltip] //tooltip
  );

  const handleNodeLeave = useCallback(() => {
    hideTooltip();
  }, [hideTooltip]);

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

        <span>{xPoint.data.key + ": " + xPoint.data.y}</span>
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

        <span>{xPoint.data.key + ": " + xPoint.data.y}</span>
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
    setTooltipElement({ element: content, attributes: attributes });
  };

  const MyCustomTooltipFunc = (props) => {
    /*   console.log("MyCustomTooltipFunc_START");
    console.log(props); */
    //console.log(tooltipElement);
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
      <ResponsiveAreaBump
        //tooltip={<div>Maintooltip</div>}
        style={{ position: "relative" }}
        layers={["grid", "axes", "labels", "areas", MyCustomTooltipFunc]}
        tooltip={() => {
          return null;
        }}
        /*
        tooltip={(params, params2, params3) => {
          console.log("TOOLTIP_TESTING");
          console.log(params);
          console.log(params2);
          console.log(params3);
          //console.log(hoverData);
          return <div>HELLO</div>;
        }}*/
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
        /*
        onClick={(serie, event) => {
          console.log("clicked!");
          console.log(event);
          React.createElement("div", {}, "TEEEEEEEESTTTTTT1");
          // return <div> TEEEEEEEESTTTTTT1 </div>;
          //return React.createElement("div", {}, "TEEEEEEEESTTTTTT");

          const mouseoverEvent = new Event("mouseover");
          const mouseenterEvent = new Event("mouseenter");
          const mouseclickEvent = new Event("click");

          let elementName = setUp.element;
          let element = document.getElementById(elementName);
          //element.click();

          //element.dispatchEvent(mouseoverEvent);

          let target = event.target;
          let dim = target.getBoundingClientRect();
          console.log(dim);
          console.log(dim.left);
          console.log(dim.right);
          let constant = (dim.right - dim.left) / serie.points.length / 2;
          console.log(constant);

          let x = event.clientX - dim.left + constant;
          let y = event.clientY - dim.top;
          console.log("x: " + x + " y:" + y);

          let xPoint;
          let points = serie.points;
          for (const item in points) {
            if (points[item].x > x) break;
            xPoint = points[item];
          }
        
          console.log("res_hoverHandler");
          setHoverData({ serie: serie, event: event, xPoint: xPoint });
        }}*/
        onMouseMove={(serie, event) => {
          formatTooltip({ serie, event });
          /* 
          console.log("MOVING_________!");

          console.log(serie);
          console.log(event);

          let target = event.target;
          let dim = target.getBoundingClientRect();
          console.log(dim);
          console.log(dim.left);
          console.log(dim.right);
          let constant = (dim.right - dim.left) / serie.points.length / 2;
          console.log(constant);

          let x = event.clientX - dim.left + constant;
          let y = event.clientY - dim.top;
          console.log("x: " + x + " y:" + y);

          let xPoint;
          let points = serie.points;
          for (const item in points) {
            if (points[item].x > x) break;
            xPoint = points[item];
          }
          //hoverHandler({ serie: serie, event: event, xPoint: xPoint });
          setHoverData({ serie: serie, event: event, xPoint: xPoint });

          let size = 100;
          let color = serie.color;
          let borderColor = serie.color;
          let borderWidth = 5;
          //let isActive = true;

          return (
            <g
              transform={`translate(${x}, ${y})`}
              style={{ pointerEvents: "none" }}
            >
              <rect
                x={size * -0.5 - 4}
                y={size * -0.5 + 4}
                width={size + borderWidth}
                height={size + borderWidth}
                fill="rgba(0, 0, 0, .07)"
              />
              <rect
                x={size * -0.5}
                y={size * -0.5}
                width={size}
                height={size}
                fill={color}
                stroke={borderColor}
                strokeWidth={borderWidth}
              />
              {
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
                  <p> TEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEST </p>
                </div>
              }
            </g>
          ); */
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
        data={dataFormatted}
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

        /*
          }
        }}*/
        /* tooltip={({ serie }) => {
          console.log("TOOLTIP_TEST1____");

          console.log("serie");
          console.log(serie);
          {
            /*
          return null;

          //let position = getToolTipPosition();

          return (
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
              <p> </p>
            </div>
          );
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

          return (
            <div>
              <strong>{id}:</strong> {value}
              {keysValsRight.map((key, index) => (
                <div key={key + index}>
                  <strong>{key}</strong> : {data[key]}
                </div>
              ))}
            </div>
          );*/
      />
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
