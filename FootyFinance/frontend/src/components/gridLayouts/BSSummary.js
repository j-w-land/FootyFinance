import React, { useState, useEffect, useRef, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import useWindowDimensions from "../general/Window";
import store from "../../store";
import Legend from "./Legend";

const TOTAL_WIDTH = 100;
const BS_TREND_BAR_HEIGHT = 17;
//const BS_TREND_BAR_FONT_SIZE = BS_TREND_BAR_HEIGHT * 0.5;
const BS_TREND_BAR_MARGIN_TOP_SIZE = 2;
const BS_TREND_BAR_MARGIN_BOTTOM_SIZE = 0;
const BS_TREND_BAR_MARGIN_SIZE = 2;
const BS_TREND_BAR_BORDER_SIZE = 20;

/* MEASURES */
const BS_SUMMARY_MEASURES = {
  year: 0.05,
  BSBars: 0.45,
  BSSize: 0.1,
  KPIs: 0.1,
};
("color={theme.palette.primary.main}");
const BS_TREND_BAR_CSS = {
  classes: {
    5: "shapeProfit",
    1: "shapeProfitDark",
    18: "shapeLoss",
    14: "shapeLossDark",
  },
  colors: {
    5: { top: "profit", sub: "main" },
    1: { top: "profit", sub: "dark" },
    18: { top: "loss", sub: "main" },
    14: { top: "loss", sub: "dark" },
  },
  margins: {
    5: ``,
    1: "bsSummaryBarsMargin",
    18: "bsSummaryBarsMargin",
    14: "bsSummaryBarsMargin",
  },
};

const BS_TREND_TOOLTIP_CSS = {
  classes: {
    5: "profitColor",
    1: "profitDarkColor",
    18: "lossColor",
    14: "lossDarkColor",
  },
};

const doPercentage = (value) => {
  return value.toString() + "%";
};

const useStyles = makeStyles((theme) => ({
  tooltip: {
    width: 500,
  },
  profitColor: {
    backgroundColor: theme.palette.profit.main,
  },
  profitDarkColor: {
    backgroundColor: theme.palette.profit.dark,
  },
  lossColor: {
    backgroundColor: theme.palette.loss.main,
  },
  lossDarkColor: {
    backgroundColor: theme.palette.loss.dark,
  },
  root: {
    "& > *": {
      margin: theme.spacing(0),
      width: "100%",
    },
  },
  BSSummaryLineHolder: {
    "& > *": {
      margin: theme.spacing(0),
      height: "100%",
      display: "inline-block",
      backgroundColor: "transparent",
      marginTop: BS_TREND_BAR_MARGIN_TOP_SIZE,
      marginBottom: BS_TREND_BAR_MARGIN_BOTTOM_SIZE,
      /*  width: "100",
      height: "400", */
    },
    "&.hover": {
      /* backgroundColor: "rgb(118, 135, 115)", */
      /*  transform: "scale(1.005)", */
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: "rgb(118, 135, 115)",
      borderRadius: "5px",
      fontStyle: "bold",
      /* pointerEvents: "none", */
    },
  },
  BSBarsHolder: {
    "& > *": {
      margin: theme.spacing(0),
      height: "100%",
      display: "inline-block",
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
    height: BS_TREND_BAR_HEIGHT,
    width: 40,
    textAlign: "center",
    /* display: "block", */
  },
  shapeProfit: {
    backgroundColor: theme.palette.profit.main,
    height: BS_TREND_BAR_HEIGHT,
    width: 40,
    textAlign: "center",
    color: theme.palette.profit.contrastTextV2,
    /* width: "auto", */
  },
  shapeProfitDark: {
    backgroundColor: theme.palette.profit.dark,
    height: BS_TREND_BAR_HEIGHT,
    width: 40,
    textAlign: "center",
    color: theme.palette.profit.contrastTextV2,

    /* width: "auto", */
  },
  shapeLoss: {
    backgroundColor: theme.palette.loss.main,
    height: BS_TREND_BAR_HEIGHT,
    width: 40,
    textAlign: "center",
    color: theme.palette.loss.contrastText,
    /* width: "auto", */
  },
  shapeLossDark: {
    backgroundColor: theme.palette.loss.dark,
    height: BS_TREND_BAR_HEIGHT,
    width: 40,
    textAlign: "center",
    color: theme.palette.loss.contrastText,
    /* width: "auto", */
  },
  bsSummaryBarsMargin: { marginLeft: BS_TREND_BAR_MARGIN_SIZE },
  shapeCircle: {
    borderRadius: "50%",
  },
}));

const calcAdd = ([a, b]) => {
  return a + b;
};
const calcDivide = ([a, b]) => {
  return a / b;
};

//export default BSSummary;
/* export default */ /*  function */ const BSSummary = forwardRef(
  (props, ref) => {
    const classes = useStyles();
    const theme = useTheme();

    const rectangle = <div className={classes.shape} />;
    const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;

    console.log("BSSummary_SETUP");
    console.log(props);

    console.log(ref);
    try {
      console.log(ref.current.clientWidth);
    } catch (error) {}
    let window = useWindowDimensions();
    console.log("useWindowDimensions-> width : " + "height: " + " ");
    console.log(window);
    //const [width, setWidth] = useState(0);
    //const [width, setWidth] = useState(0);
    /* let width = window.width != null ? window.width : 0; */

    let width =
      ref.current != null
        ? (width =
            ref.current.clientWidth != null ? ref.current.clientWidth : 0)
        : 0;

    if (ref == null) {
      ref = { current: { clientWidth: null } };
    }

    /* useEffect(
      function () {
        try {
          console.log("TRYING___");
          width = ref.current.clientWidth;
        } catch (error) {
          console.log(error);
        }
      },
      [ref]
    ); */
    console.log("TRYING___W");
    console.log(width);

    //setWidth(Nwidth);

    //width = width / 2;

    //let width = ref;
    console.log("WIDTH_TEST__INIT");
    console.log(width);
    console.log(width / 4);

    //setWidth(refWidth);

    /* useEffect(() => {
      console.log("WIDTH_TEST_USEE");
      console.log(ref.current.clientWidth);
    }, [ref.current.clientWidth]); */

    const {
      setUp: [setUp, setSetUp],
    } = {
      setUp: useState([]),
      ...(props.state || {}),
    };
    console.log(setUp);

    const [data, setData] = useState([]);
    let fsdataStatus = "idle";
    try {
      fsdataStatus = store.getState().fs_data.fs_data_years_test2[
        setUp.storeRef
      ].status;
    } catch (error) {
      console.log("fsdataStatus_ERROR__");
      console.log(error);
      fsdataStatus = "idle";
    }

    const [rows, setRows] = useState([]);
    const [lineHeaders, setLineHeaders] = useState([]);
    const [legendVals, setLegendVals] = useState([]);

    const [openTooltip, setOpenTooltip] = React.useState(true);

    const handleTooltipClose = () => {
      console.log("handleTooltipClose");
      setOpenTooltip(false);
    };

    const handleTooltipOpen = () => {
      console.log("handleTooltipOpen");
      setOpenTooltip(true);
    };

    const [lineHover, setLineHover] = useState(false);

    const handleLineHover = (e) => {
      console.log("handleLineHover");
      console.log(e.target);
      let element = e.target;

      while (element.parentNode.className != "BSSummaryLines1") {
        try {
          element = element.parentNode;
          /*     console.log(element);
          console.log(element.parentNode.className); */
        } catch (error) {
          return;
        }
      }

      let res = Array.from(element.parentNode.children).indexOf(element);

      let i = 0;
      while (i < element.parentNode.children.length) {
        element.parentNode.children[i].className = classes.BSSummaryLineHolder;
        i++;
      }

      if (res != 0) {
        element.parentNode.children[res].className =
          classes.BSSummaryLineHolder + " hover";
      }

      //setLineHover((prevState) => !prevState);
    };

    const handleLineHoverLeave = (e) => {
      let element = e.target;

      try {
        while (element.parentNode.className != "BSSummaryLines1") {
          try {
            element = element.parentNode;
            /*     console.log(element);
                console.log(element.parentNode.className); */
          } catch (error) {
            return;
          }
        }
      } catch (error) {
        return;
      }

      console.log("element_after_Loop");
      console.log(element);
      let res = Array.from(element.parentNode.children).indexOf(element);
      console.log(element);

      let i = 0;
      while (i < element.parentNode.children.length) {
        element.parentNode.children[i].className = classes.BSSummaryLineHolder;
        i++;
      }
    };

    function changeBackground(e) {
      let targetClass = "";
      let relatedTargetClass = "";
      /*  console.log("changeBackground");
      console.log(e);
      console.log(e.target);
      console.log(e.relatedTarget);
      console.log(e.target.className); */
      try {
        targetClass = e.target.className;
      } catch (error) {}
      try {
        relatedTargetClass = e.relatedTarget.className;
      } catch (error) {}

      if (targetClass.includes("BSSummaryLineHolder")) {
        e.target.style.background = "red";
      } else if (relatedTargetClass.includes("BSSummaryLineHolder")) {
        e.relatedTarget.style.background = "red";
      }
    }
    function restoreBackground(e) {
      let targetClass = "";
      let relatedTargetClass = "";
      console.log("restoreBackground");
      console.log(e.target);
      console.log(e.relatedTarget);

      try {
        targetClass = e.target.className;
      } catch (error) {}
      try {
        relatedTargetClass = e.relatedTarget.className;
      } catch (error) {}

      if (targetClass.includes("BSSummaryLineHolder")) {
        e.target.style.background = "transparent";
      } else if (relatedTargetClass.includes("BSSummaryLineHolder")) {
        e.relatedTarget.style.background = "transparent";
      }
    }
    useEffect(() => {
      console.log("BSSUMMARY__DATA_TEST");
      if (fsdataStatus == "idle") {
        console.log("fsdataStatus:_ " + fsdataStatus);
        return;
      }
      console.log("fsdataStatus:_DONE:  " + fsdataStatus);

      let getData = store.getState().fs_data.fs_data_years_test2[setUp.storeRef]
        .data;

      console.log("getData_TEST___");
      console.log(getData);
      setData(getData);
      console.log("setDATA_ONNISTU?");

      let BSSize = createKPISet(
        getData,
        { tag: "BSSize", name: "Total Size" },
        [10],
        function (e) {
          return e[0];
        },
        { type: "amount" }
      );
      let CurrentRatio = createKPISet(
        getData,
        { tag: "CurrentRatio", name: "Current Ratio" },
        [5, 18],
        function (e) {
          return e[0] / e[1];
        } /*  calcDivide() */,
        { type: "percent" }
      );
      let DebtToEquity = createKPISet(
        getData,
        { tag: "DebtToEquity", name: "Debt-to-Equity" },
        [14, 18, 11],
        function (e) {
          return (e[0] + e[1]) / e[2];
        } /*  calcDivide() */,
        { type: "percent" }
      );
      let DebtoToRevenue = createKPISet(
        getData,
        { tag: "DebtoToRevenue", name: "Debt-to-Revenue" },
        [14, 18, 28],
        function (e) {
          return (e[0] + e[1]) / e[2];
        } /*  calcDivide() */,
        { type: "percent" }
      );
      // let BSSize = createKPISet("BSSize", function(e) {return e} , getData);
      console.log("KPIres");
      console.log(BSSize);

      setRows((prevRows) => ({
        ...prevRows,
        BSSize: BSSize,
        CurrentRatio: CurrentRatio,
        DebtToEquity: DebtToEquity,
        DebtoToRevenue: DebtoToRevenue,
      }));

      /*   let res = createBSBars(getData);
      console.log("data__res__");
      console.log(res); */

      /*  setLegendVals(res.legend);
      let lineHeaders = createLineHeader(getData);
      console.log("lineHeaders");
      console.log(lineHeaders);
      setRows((prevRows) => ({
        ...prevRows,
        bsSummaryBars: res.rows,
        lineHeaders: lineHeaders,
      })); */
    }, [fsdataStatus]);

    useEffect(() => {
      console.log("WIDTH_TEST__EFFECT");
      console.log(width);

      let res = createBSBars(data);
      console.log(res);
      let lineHeadersRes = createLineHeader(data);
      setLineHeaders(lineHeadersRes);

      //let newRes = rows;
      /*  setState(prevState => ({
                ...prevState,
                [name]: value
            }) */

      let BSSize = createKPISet(
        data,
        { tag: "BSSize", name: "Total Assets" },
        [10],
        function (e) {
          return e[0];
        },
        { type: "amount" }
      );
      let CurrentRatio = createKPISet(
        data,
        { tag: "CurrentRatio", name: "Current Ratio" },
        [5, 18],
        function (e) {
          return e[0] / e[1];
        } /*  calcDivide() */,
        { type: "percent" }
      );
      let DebtToEquity = createKPISet(
        data,
        { tag: "DebtToEquity", name: "Debt-to-Equity" },
        [14, 18, 11],
        function (e) {
          return (e[0] + e[1]) / e[2];
        } /*  calcDivide() */,
        { type: "percent" }
      );
      let DebtoToRevenue = createKPISet(
        data,
        { tag: "DebtoToRevenue", name: "Debt-to-Revenue" },
        [14, 18, 28],
        function (e) {
          return (e[0] + e[1]) / e[2];
        } /*  calcDivide() */,
        { type: "percent" }
      );

      setRows((prevRows) => ({
        ...prevRows,
        bsSummaryBars: res.rows,
        BSSize: BSSize,
        CurrentRatio: CurrentRatio,
        DebtToEquity: DebtToEquity,
        DebtoToRevenue: DebtoToRevenue,
        /* lineHeaders: lineHeaders, */
      }));
      // setRows(...rows, res.rows);

      setLegendVals(res.legend);
    }, [width, data]);

    const createKPISet = (data, name, fsliArr, calculation, formatting) => {
      console.log("createKPISet");
      console.log(data);

      console.log("createLineHeader");
      console.log(data);
      let resArray = [];
      console.log(width);

      let titleElement = (
        <div
          className={classes.BSBarsHolder}
          style={{
            height: "100%",
            display: "inline-block", //BS_TREND_BAR_HEIGHT, //"100%",
            /*   width: "5%", */

            /*  display: "inline-block", */
          }}
          key={name.tag + "Title"}
        >
          <div
            className={classes.shape}
            style={{
              display: "inline-block",
              alignContent: "center",
              width: /* width * */ width * BS_SUMMARY_MEASURES.KPIs,
              backgroundColor: "transparent",
              textOverflow: "ellipsis",

              /* outlineWidth: 1, */
              /*  height: "100%",
                  width: 40, */
            }}
          >
            {" "}
            <div
              style={{
                /* position: "absolute", */
                boxSizing: "border-box",
                width: /* width * */ width * BS_SUMMARY_MEASURES.KPIs,
                textAlign: "center",
                textOverflow: "clip",
              }}
            >
              {name.name}
            </div>{" "}
          </div>
        </div>
      );
      resArray.push(titleElement);
      for (const item in data) {
        let fsliAmounts = [];
        for (const fsliItem in fsliArr) {
          let value = data[item].filter(
            (e) => e.financial_statement_line_id == fsliArr[fsliItem]
          )[0].amount;
          fsliAmounts.push(value);
        }

        let amount = calculation(fsliAmounts);
        console.log("calculation_res");
        console.log(amount);
        if (formatting.type == "percent") {
          amount = parseFloat(100 * amount).toFixed(0) + "%";
        } else if (formatting.type == "amount") {
          amount = (amount / 1000000).toFixed(0) + "m£";
        }

        /* let amount =
          data[item].filter((e) => e.financial_statement_line_id == 10)[0]
            .amount / 1000000; */
        let element = (
          <div
            className={classes.BSBarsHolder}
            style={{
              height: "100%",
              display: "inline-block", //BS_TREND_BAR_HEIGHT, //"100%",
              /* width: "5%", */

              /*  display: "inline-block", */
            }}
            key={name.tag + item}
          >
            <div
              className={classes.shape}
              style={{
                display: "inline-block",
                alignContent: "center",
                width: /* width * */ width * BS_SUMMARY_MEASURES.KPIs,
                height: BS_TREND_BAR_HEIGHT,
                backgroundColor: "transparent",
                pointerEvents: "none",
                /*  borderColor: "blueviolet",
                borderRadius: 1,
                borderWidth: 1, */

                /* outlineWidth: 1, */
                /*  height: "100%",
                        width: 40, */
              }}
            >
              {" "}
              <div
                style={{
                  /*  position: "absolute", */
                  boxSizing: "border-box",
                  width: /* width * */ width * BS_SUMMARY_MEASURES.KPIs,
                  height: BS_TREND_BAR_HEIGHT,
                  textAlign: "center",
                  fontSize: "0.825em",
                }}
              >
                {amount}
              </div>{" "}
            </div>
          </div>
        );
        resArray.push(element);
      }
      return resArray;
    };

    const tableElements = {
      headers: [
        { tag: "year", name: "Year" },
        { tag: "bsSummaryBars", name: "Balance Sheet overview" },
      ],
    };

    const fslis = store.getState().fs_data.fslis.data;
    console.log("fslis_BSSUMMARY");
    console.log(fslis);

    const createLineHeader = (data) => {
      console.log("createLineHeader");
      console.log(data);
      let resArray = [];
      console.log(width);

      let titleElement = (
        <div
          className={classes.BSBarsHolder}
          style={{
            height: "100%", //BS_TREND_BAR_HEIGHT, //"100%",
            /*   width: "5%", */

            /*  display: "inline-block", */
          }}
          key={"barYearTitle"}
        >
          <div
            className={classes.shape}
            style={{
              display: "inline-block",
              alignContent: "center",
              width: width * BS_SUMMARY_MEASURES.year,
              backgroundColor: "transparent",

              /* outlineWidth: 1, */
              /*  height: "100%",
                width: 40, */
            }}
          >
            {" "}
            <div
              style={{
                position: "absolute",
                boxSizing: "border-box",
                width: width * BS_SUMMARY_MEASURES.year,
                textAlign: "center",
              }}
            >
              Year
            </div>{" "}
          </div>
        </div>
      );
      resArray.push(titleElement);
      for (const item in data) {
        let element = (
          <div
            className={classes.BSSummaryLineHolder}
            style={{
              height: "100%", //BS_TREND_BAR_HEIGHT, //"100%",
              /* width: "5%", */

              /*  display: "inline-block", */
            }}
            key={"barYear" + item}
          >
            <div
              className={classes.shape}
              style={{
                display: "inline-block",
                alignContent: "center",
                width: width * BS_SUMMARY_MEASURES.year,
                height: BS_TREND_BAR_HEIGHT,
                backgroundColor: "transparent",

                /* outlineWidth: 1, */
                /*  height: "100%",
                      width: 40, */
              }}
            >
              {" "}
              <div
                id="YEAR_TESTI"
                style={{
                  position: "absolute",
                  boxSizing: "border-box",
                  width: width * BS_SUMMARY_MEASURES.year,
                  height: BS_TREND_BAR_HEIGHT,
                  textAlign: "center",
                  fontSize: "0.825em",
                }}
              >
                {data[item][0].fiscal_year}
              </div>{" "}
            </div>
          </div>
        );
        resArray.push(element);
      }
      return resArray;
    };

    const createBSBars = (data) => {
      let element;
      let rowsResult = [];
      let BSitems = [5, 1, 18, 14];
      let legendArr = [];

      let titleElement = (
        <div
          /* className={classes.shape} */

          style={{
            width: width * BS_SUMMARY_MEASURES.BSBars,
            display: "inline-block",
            marginLeft: BS_TREND_BAR_MARGIN_SIZE,
            alignContent: "center",
          }}
          key="bsSummaryBarsTitle"
        >
          {"Total Assets & Liabilities overview (m£)"}
        </div>
      );
      let titleArray = [titleElement];
      rowsResult.push(titleArray);

      let matches = [];
      let totalAmount = 0;
      let maxTotalAmount = 0;

      /********************************** ***************************************/
      // GET MAXIMUM BS SIZE
      for (const year in data) {
        matches = [];
        totalAmount = 0;

        for (const item in BSitems) {
          console.log("BSitems_start");
          let dataForSeach = data[year];
          let match = dataForSeach.filter(
            (e) => e.financial_statement_line_id == BSitems[item]
          );
          console.log("BSitems_match");
          console.log(match);
          matches.push(match);
          totalAmount = totalAmount + match[0].amount;
          console.log("totalAmount");
          console.log(totalAmount);
        }
        if (totalAmount > maxTotalAmount) maxTotalAmount = totalAmount;
      }

      /************************************************************************ */

      for (const year in data) {
        let yearArray = [];
        matches = [];
        totalAmount = 0;
        legendArr = [];

        for (const item in BSitems) {
          console.log("BSitems_start");
          let dataForSeach = data[year];
          let match = dataForSeach.filter(
            (e) => e.financial_statement_line_id == BSitems[item]
          );
          console.log("BSitems_match");
          console.log(match);
          matches.push(match);
          totalAmount = totalAmount + match[0].amount;
          console.log("totalAmount");
          console.log(totalAmount);
        }

        for (const item in matches) {
          let legendObj = {};
          console.log("matches_AMOUNT___");
          console.log(matches[item]);
          let amount = matches[item][0].amount;
          let piece = amount / totalAmount / (maxTotalAmount / totalAmount);
          let amountShow = "";

          if (width * piece * BS_SUMMARY_MEASURES.BSBars >= 40) {
            amountShow = (amount / 1000000).toFixed(0); //+ "m£";
          } else if (
            width * piece * BS_SUMMARY_MEASURES.BSBars > 19 &&
            width * piece * BS_SUMMARY_MEASURES.BSBars < 40
          ) {
            amountShow = (amount / 1000000).toFixed(0);
          }
          console.log("width");
          console.log(width);
          console.log("piece");
          console.log(piece);
          if (piece == null) piece = 0;
          let legendName = "";
          let legendColor = "";
          let tooltipClass = "";
          let tooltipYear = "";

          try {
            legendName = fslis.filter(
              (e) => e.id == matches[item][0].financial_statement_line_id
            )[0].name;
          } catch (error) {}
          /* try {
            tooltipYear = fslis.filter(
              (e) => e.id == matches[item][0].financial_statement_line_id
            )[0].financial_year;
          } catch (error) {} */
          try {
            legendColor =
              theme.palette[
                BS_TREND_BAR_CSS.colors[
                  matches[item][0].financial_statement_line_id
                ].top
              ][
                BS_TREND_BAR_CSS.colors[
                  matches[item][0].financial_statement_line_id
                ].sub
              ];
            //BS_TREND_TOOLTIP_CSS
            tooltipClass =
              BS_TREND_TOOLTIP_CSS.classes[
                matches[item][0].financial_statement_line_id
              ];
          } catch (error) {}
          let amountTooltip = (
            <div>
              {/*  {tooltipYear} <br />
              Total assets: XXX Total Liabilities ZZZ <br />
              <br /> */}{" "}
              {legendName} : {(amount / 1000000).toFixed(0)} m£
            </div>
          );
          legendObj.name = legendName;
          /*  ("color={theme.palette.primary.main}"); */
          legendObj.color = legendColor;

          console.log("legendObj");
          console.log(legendObj);
          legendArr.push(legendObj);
          /* 
          <Badge color="secondary">
            </Badge>
          */
          element = (
            <div
              className={classes.shape}
              className={
                classes[
                  BS_TREND_BAR_CSS.classes[
                    matches[item][0].financial_statement_line_id
                  ]
                ]
              }
              style={{
                width: width * piece * BS_SUMMARY_MEASURES.BSBars,
                display: "inline-block",
                marginLeft: BS_TREND_BAR_MARGIN_SIZE,
              }}
              key={
                matches[item][0].club_id +
                "-" +
                matches[item][0].financial_statement_line_id +
                "-" +
                matches[item][0].fiscal_year
              }
            >
              {
                (console.log("tooltipClass"),
                console.log(tooltipClass),
                (
                  /*  <ClickAwayListener onClickAway={handleTooltipClose}> */
                  <div>
                    <Tooltip
                      /* onClose={handleTooltipClose} */
                      /*  open={openTooltip} */
                      disableFocusListener
                      classes={{ tooltip: classes[tooltipClass] }}
                      /*  className={"profit"} */
                      title={<React.Fragment>{amountTooltip}</React.Fragment>}
                      placement="top"
                    >
                      <div
                        className="bsBarElement"
                        style={{
                          position: "absolute",
                          boxSizing: "border-box",
                          width: width * piece * BS_SUMMARY_MEASURES.BSBars,
                          height: BS_TREND_BAR_HEIGHT,
                          textAlign: "center",
                          fontSize: "0.825em",
                          marginLeft: BS_TREND_BAR_MARGIN_SIZE,
                        }}
                      >
                        {amountShow}
                      </div>
                    </Tooltip>
                  </div>
                ))
                /*   </ClickAwayListener> */
              }
            </div>
          );
          yearArray.push(element);
          console.log("yearArray__TEST");
          console.log(yearArray);
        }

        console.log(yearArray);
        console.log("rows_RESULT__1");
        console.log(rowsResult);
        console.log(legendArr);
        let bsBarsholder = (
          <div
            style={{
              width: width * BS_SUMMARY_MEASURES.BSBars + 20,
              display: "inline-block",
            }}
          >
            {yearArray.map((n) => n)}
          </div>
        );
        rowsResult.push(/* yearArray */ bsBarsholder);
      }

      return { rows: rowsResult, legend: legendArr };
    };

    console.log("rows_RESULT__FINAL");
    console.log(rows);

    let testPercentage = doPercentage(0.2 * TOTAL_WIDTH);
    console.log("testPercentage");
    console.log(testPercentage);

    let refContent = (
      <div
        id="BSSummaryContainer"
        ref={ref}
        style={{ verticalAlign: "baseline", width: "100%" }}
      >
        {" "}
      </div>
    );

    try {
      if (rows.bsSummaryBars.length == 0) return refContent;
      if (lineHeaders.length != rows.bsSummaryBars.length) return refContent;
      if (lineHeaders.length != rows.BSSize.length) return refContent;
    } catch (error) {
      return refContent;
    }
    console.log(rows);
    console.log("MENI_LÄPI");
    console.log(width);

    //if (rows.length == 0) return null;

    /*   {
                          <div className={classes.BSBarsHolder}>
                            {" "}
                            {rows.BSSize[ii]}{" "}
                          </div>
                        } */

    /* 
              width * BS_SUMMARY_MEASURES.year +
              width * BS_SUMMARY_MEASURES.BSBars +
              BS_TREND_BAR_MARGIN_SIZE * 5, */

    return (
      <div
        id="BSSummaryContainer"
        ref={ref}
        style={{ verticalAlign: "baseline", width: "100%" }}
      >
        <div
          className="BSBarsContainerLeft"
          style={{
            width: "100%",
            display: "inline-block",
            verticalAlign: "baseline",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              /* width: "5%",  */ display: "inline-block",
            }}
          >
            <div
              style={{ width: "100%", height: "100%", display: "inline-block" }}
            >
              <div
                className={"BSSummaryLines1"}
                style={{ display: "inline-block", width: "100%" }}
                onMouseLeave={handleLineHoverLeave}
              >
                {lineHeaders.map(
                  (nn, ii) => (
                    console.log("MAP_TEST"),
                    console.log(nn),
                    (
                      <div
                        id="TESTING____"
                        className={classes.BSSummaryLineHolder}
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                        /* ref={ref} */
                        key={"bar" + nn.key}
                        onMouseOver={handleLineHover}
                      >
                        {nn}

                        {Object.getOwnPropertyNames(rows).map((keyName, i) => (
                          <div
                            className={classes.BSBarsHolder}
                            style={{
                              height: "100%",
                              display: "inline-block",
                              /* width: "100%", */
                            }}
                            key={keyName + nn.key}
                          >
                            {" "}
                            {rows[keyName][ii]}{" "}
                          </div>
                        ))}

                        {/* <div className={classes.BSBarsHolder}>
                            {" "}
                            {rows.bsSummaryBars[ii]}{" "}
                          </div>
                        }
                        {
                          <div className={classes.BSBarsHolder}>
                            {" "}
                            {rows.BSSize[ii]}{" "}
                          </div> */}
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          </div>

          <Legend items={legendVals}></Legend>
        </div>
        {/*  <BasicTable rowsData={rows} /> */}
      </div>
    );
  }
);

export default BSSummary;

/* 

*/

{
  /* <Badge color="secondary" badgeContent=" " variant="dot">
        {rectangle}
      </Badge>
      <Badge color="secondary" overlap="circle" badgeContent=" ">
        {circle}
      </Badge>
      <Badge color="secondary" overlap="circle" badgeContent=" " variant="dot">
        {circle}
      </Badge> */
}

{
  /* {rows} */
}

{
  /*  <Badge color="secondary">
          <div
            className={classes.shape}
            className={classes.shapeProfit}
            style={{ width: width * (2 / 3) }}
          />{" "}
        </Badge> */
}
{
  /*   <Badge color="secondary">
          <div
            className={classes.shape}
            className={classes.shapeProfitDark}
            style={{ width: width * (1 / 12) }}
          />
        </Badge>
        <Badge color="secondary">
          <div className={classes.shape} style={{ width: width * (3 / 12) }} />
        </Badge> */
}

import Grid from "@material-ui/core/Grid";

import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const useStylesTooltip = makeStyles({
  root: {
    width: 500,
  },
});

/* 
function PositionedTooltips() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item>
          <Tooltip title="Add" placement="top-start">
            <Button>top-start</Button>
          </Tooltip>
          <Tooltip title="Add" placement="top">
            <Button>top</Button>
          </Tooltip>
          <Tooltip title="Add" placement="top-end">
            <Button>top-end</Button>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={6}>
          <Tooltip title="Add" placement="left-start">
            <Button>left-start</Button>
          </Tooltip>
          <br />
          <Tooltip title="Add" placement="left">
            <Button>left</Button>
          </Tooltip>
          <br />
          <Tooltip title="Add" placement="left-end">
            <Button>left-end</Button>
          </Tooltip>
        </Grid>
        <Grid item container xs={6} alignItems="flex-end" direction="column">
          <Grid item>
            <Tooltip title="Add" placement="right-start">
              <Button>right-start</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Add" placement="right">
              <Button>right</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Add" placement="right-end">
              <Button>right-end</Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <Tooltip title="Add" placement="bottom-start">
            <Button>bottom-start</Button>
          </Tooltip>
          <Tooltip title="Add" placement="bottom">
            <Button>bottom</Button>
          </Tooltip>
          <Tooltip title="Add" placement="bottom-end">
            <Button>bottom-end</Button>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
} */
