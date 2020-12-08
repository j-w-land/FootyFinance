import React, { useState, useEffect, useRef, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import useWindowDimensions from "../general/Window";
import store from "../../store";

const TOTAL_WIDTH = 100;
const BS_TREND_BAR_HEIGHT = 20;
const BS_TREND_BAR_MARGIN_SIZE = 2;
const BS_TREND_BAR_BORDER_SIZE = 20;

/* MEASURES */
const BS_SUMMARY_MEASURES = {
  year: 0.05,
  BSBars: 0.45,
};

const BS_TREND_BAR_CSS = {
  colors: {
    5: "shapeProfit",
    1: "shapeProfitDark",
    18: "shapeLoss",
    14: "shapeLossDark",
  },
  margins: {
    5: ``,
    1: "bsSummaryBarsMargin",
    18: "bsSummaryBarsMargin",
    14: "bsSummaryBarsMargin",
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
      width: "100%",
    },
  },
  BSBarsHolder: {
    "& > *": {
      margin: theme.spacing(0),
      height: "100%",
      /*  width: "100",
      height: "400", */
    },
  },
  BarHolder: {
    "& > *": {
      margin: theme.spacing(0),
      /*  width: "100%",
      height: "100%", */
    },
  },
  shape: {
    backgroundColor: theme.palette.primary.main,
    height: 10,
    width: 10,
    /* display: "block", */
  },
  shapeProfit: {
    backgroundColor: theme.palette.profit.main,
    height: BS_TREND_BAR_HEIGHT,
    width: 40,
    /* width: "auto", */
  },
  shapeProfitDark: {
    backgroundColor: theme.palette.profit.dark,
    height: BS_TREND_BAR_HEIGHT,
    width: 40,
    /* width: "auto", */
  },
  shapeLoss: {
    backgroundColor: theme.palette.loss.main,
    height: BS_TREND_BAR_HEIGHT,
    width: 40,
    /* width: "auto", */
  },
  shapeLossDark: {
    backgroundColor: theme.palette.loss.dark,
    height: BS_TREND_BAR_HEIGHT,
    width: 40,
    /* width: "auto", */
  },
  bsSummaryBarsMargin: { marginLeft: BS_TREND_BAR_MARGIN_SIZE },
  shapeCircle: {
    borderRadius: "50%",
  },
}));

/* export default */ /*  function */ const Legend = (props) => {
  const classes = useStyles();

  const rectangle = <div className={classes.shape} />;
  const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;

  console.log("Legend_SETUP");
  console.log(props);

  /*  const {
    setUp: [setUp, setSetUp],
  } = {
    setUp: useState([]),
    ...(props.state || {}),
  };
  console.log(setUp); */

  const createLegendItems = (data) => {
    let element;
    let itemsResult = [];
    console.log("createLegendItems");
    console.log(data);

    for (const item in data) {
      console.log(data[item]);
      element = (
        <div
          key={"legend-" + data[item].name}
          style={{
            /* display: "flex" */
            marginRight: "5px",
          }}
        >
          <div
            className={classes.shape}
            style={{
              backgroundColor: data[item].color,
              display: "inline-block",
              marginLeft: BS_TREND_BAR_MARGIN_SIZE,
              /*   float: "left", */
            }}
          ></div>
          <div
            style={{
              position: "relative",
              boxSizing: "border-box",
              /*  width: width * BS_SUMMARY_MEASURES.year, */
              textAlign: "center",
              display: "inline-block",
              /*float: "left", */
              marginLeft: "5px",
            }}
          >
            {data[item].name}
          </div>
        </div>
      );
      itemsResult.push(element);
      console.log("itemsResult__TEST");
    }

    return itemsResult;
  };

  let items = createLegendItems(props.items);

  console.log("rows_RESULT__FINAL_LEGEND");
  console.log(items);

  return (
    <div className="LegendWrapper" style={{}}>
      <div
        className="LegendContainer"
        style={{
          height: "100%",
          /* display: "flex",
          clear: "both"; */
        }}
      >
        {items.map(
          (n, i) => (
            console.log(n),
            (
              <div
                /*  className={classes.BSBarsHolder} */
                style={{
                  height: "100%",
                  /*  width: "100%", */
                  display: "inline-block",
                }}
                /* ref={ref} */
                key={"legend" + n.key}
              >
                {n}
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default Legend;
