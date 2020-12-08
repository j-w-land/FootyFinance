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
import zIndex from "@material-ui/core/styles/zIndex";

export default function MyCustomTooltip(props) {
  console.log("MyCustomTooltip____props");
  console.log(props);
  console.log("MyCustomTooltip____props_Common");
  console.log(props.commonProps);
  //let xScale = props.commonProps.xScale;
  //const { tooltip } = props.commonProps;
  //const { showTooltipFromEvent, hideTooltip } = useTooltip();

  try {
    if (props.content.attributes == null) {
      // console.log("TESTING_NULL");
      return React.createElement(
        "div",
        {},
        " TESTING_NULL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
      );
    }
  } catch (error) {
    //console.log("TESTING_ERROR");
    //return <div>TESTING_ERROR</div>;
    return React.createElement(
      "div",
      {},
      " TESTING_ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
  }

  let size = 10;
  let color = props.content.attributes.color;
  let borderColor = props.content.attributes.color;
  let borderWidth = 5;
  let x = props.content.attributes.x;
  let y = props.content.attributes.y;

  /*   console.log("MyCustomTooltip___VALUES");
  console.log("x: " + x + " y:" + y); */
  let SVGwidth = props.commonProps.width;
  let SVGheight = props.commonProps.height;
  let SVGXadjust = props.commonProps.innerWidth - props.commonProps.width;
  let SVGYadjust = props.commonProps.innerHeight - props.commonProps.height;

  let foreignObjX = x + 50; // 0.02 * SVGwidth; //200
  if (x > SVGwidth / 2) {
    foreignObjX = x + 0; // 0.1 * SVGwidth; //0.01*SVGwidth;
  }
  let foreignObjHeight = 200;
  let foreignObjY = y + 20;
  //if (foreignObjHeight + y > SVGheight) foreignObjY = y - foreignObjHeight;
  //console.log("foreignObjY_RES");
  /*  console.log(foreignObjHeight);
  console.log(y);
  console.log(SVGheight);
  console.log(foreignObjY); */

  let html;
  html = (
    <div
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
    >
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
              background: "blue",
            }}
          ></span>
          TESTINGGGG
        </div>
      </div>
    </div>
  );

  let svgHtml = (
    <svg
      id="MYCUSTOMTOOLTIP"
      x={SVGXadjust}
      y={SVGYadjust}
      width={SVGwidth}
      height={SVGheight}
      style={{ position: "absolute", zIndex: -1 }} //relative toimi
    >
      <g
        //transform={`translate(${x}, ${y})`}
        style={{ pointerEvents: "none" }}
        height={SVGheight}
        width={SVGwidth}
      >
        <foreignObject
          x={0} // foreignObjX
          y={0}
          width={SVGwidth}
          height={SVGheight} //{SVGheight}
          position="fixed"
        >
          <div
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
          >
            {props.content.element}
          </div>
        </foreignObject>
      </g>
    </svg>
  );

  return svgHtml;
}

let translate = function translate(x, y) {
  return "translate(".concat(x, "px, ").concat(y, "px)");
};

/**************************** */
/*
const BumpCustomTooltip = ({ element, tooltip, format }) => {
    console.log(element);
    console.log(tooltip);
    console.log(format);
    console.log("bumpCustomTooltip");
    //console.log(serie);
    //console.log(event);
    //return props.element;
    //return <div>BumpCustomTooltip</div>;

    return (
      <BasicTooltip
        id={111111}
        enableChip={true}
        color={"blue"}
        format={format}
        renderContent={
          typeof tooltip === "function"
            ? tooltip.bind(null, { ...(<div>"TESTINNNNNT"</div>) })
            : null
        }
      />
    );
  };
  BumpCustomTooltip.propTypes = {
    element: PropTypes.object,
    tooltip: PropTypes.func,
  };

    /*
  return BumpCustomTooltip({
    element: props.content.element,
    tooltip: tooltip,
  });*/
//return props.content.element;
/*
  return React.createElement(
    "div",
    {},
    " TESTING_SUCCESS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  );*/
