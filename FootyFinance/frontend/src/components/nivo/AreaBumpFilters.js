import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

//AreaBumpFilters

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  clubButton: {
    color: "blue",
    marginLeft: "none",
    marginRight: "none",
  },
}));

const doButtonCount = (data) => {
  if (data.length == 0)
    return {
      countTexts: [],
      countValues: [],
      ariaLabels: [],
    };
  console.log("doButtonCount_START");
  console.log(data);
  let count = data.length;
  let res = [];
  let countValues = [];
  let countTexts = [];
  let remainder = 0;
  let division = 0;
  let divider = 0;
  let lastRound = 0;
  let lastRoundCount = 0;
  let text = "";
  let textFrom1 = "from 1";
  let textFrom = "from ";
  let textTo = "to ";
  let counting = 0;

  if (count < 11) divider = 2;
  else if (count < 25) divider = 3;
  else if (count < 40) rdivider = 4;
  else if (count < 60) divider = 5;
  else divider = count / 8;

  division = count / divider;
  division = Math.floor(division);
  remainder = count - division * divider;
  if (remainder > 0) {
    lastRoundCount = division + remainder;
    lastRound = division * divider + remainder;
  } else {
    lastRoundCount = division;
    lastRound = division * divider;
  }

  if (divider == 2) {
    countTexts.push("top " + division.toString());
    countValues.push([0, division - 1]);
    countTexts.push("bottom " + lastRoundCount.toString());
    countValues.push([division, lastRound - 1]);
  } else if (divider == 3) {
    countTexts.push("top " + division.toString());
    countValues.push([0, division - 1]);
    countTexts.push("mid " + division.toString());
    countValues.push([division, division * 2 - 1]);
    countTexts.push("bottom " + lastRoundCount.toString());
    countValues.push([division * 2, lastRound - 1]);
  } else {
    text = textFrom1 + textTo + divison.toString();
    countTexts.push(text);
    countValues.push([0, divison - 1]);
    counting = division - 1;

    let i;
    for (i = 1; i < divider - 1; i++) {
      text =
        textFrom +
        (division * i).toString() +
        textTo +
        (division * (i + 1) - 1).toString();
      countTexts.push("top " + division.toString());
      countValues.push([division * i, division * (i + 1) - 1]);
    }
    text = textFrom + (division * i).toString() + textTo + lastRound.toString();
    countTexts.push(text);
    countValues.push([division * i, lastRound]);
  }

  const ariaLabels = [];
  let i;
  for (i = 0; i < countTexts.length; i++) {
    ariaLabels.push("Button-BumpArea-Club-Filter-#" + i + "#");
  }

  return {
    countTexts: countTexts,
    countValues: countValues,
    ariaLabels: ariaLabels,
  };
};

export default function AreaBumpFilters(props) {
  console.log("AreaBumpFilters_Props");
  console.log(props);
  const { clubs } = props;
  const classes = useStyles();

  const { setFilterClubs } = props;

  const [buttonCount, setButtonCount] = useState({
    countTexts: [],
    countValues: [],
    ariaLabels: [],
  });

  useEffect(() => {
    console.log("doButtonCount_EFFECT");
    console.log(clubs);
    if (clubs == null) return;
    if (clubs.length == 0) return;
    let getButtonCount = doButtonCount(props.clubs);
    setButtonCount(getButtonCount);
  }, [clubs]);

  console.log("buttonCount");
  console.log(buttonCount);

  const buttons = [];

  const [selectedButtons, setSelectedButtons] = useState(() => []);
  const [selectedButtonsVals, setSelectedButtonsVals] = useState(() => []);
  const [showClubButtons, setShowClubButtons] = useState(false);
  const [showClubButtonsToggler, setShowClubButtonsToggler] = useState(true);
  const [toggleClubsButtonText, setToggleClubsButtonText] = useState("All");

  const handleselectedButtons = (event, newVals) => {
    console.log("handleselectedButtons");
    console.log(event);
    console.log(newVals);
    setSelectedButtons(newVals);
  };

  useEffect(() => {
    console.log("setFilterClubs__CHANGE");
    console.log(selectedButtons);
    console.log(selectedButtonsVals);

    let indexes = [];

    let str;
    const resArray = [];
    let toggleClubsButtonString = "";
    for (const item in selectedButtons) {
      console.log("STRING::");
      console.log(selectedButtons[item]);
      str = selectedButtons[item];
      /* let mySubString = str.substring(
        str.lastIndexOf("#") + 1,
        str.lastIndexOf("#")
      ); */
      let mySubString = str.split("#")[1]; //.pop(); //.split("#")[0];
      console.log("INDEX::::");
      console.log(mySubString);
      resArray.push(selectedButtonsVals.countValues[mySubString]);
      toggleClubsButtonString =
        toggleClubsButtonString +
        selectedButtonsVals.countTexts[mySubString] +
        " & ";
    }
    toggleClubsButtonString = toggleClubsButtonString
      .trim()
      .substring(0, toggleClubsButtonString.length - 2);

    if (selectedButtons.length == buttonCount.countTexts.length)
      toggleClubsButtonString = "All";

    setToggleClubsButtonText(toggleClubsButtonString);

    console.log("setFilterClubs___resArray");
    console.log(resArray);
    setFilterClubs(resArray);
  }, [selectedButtons]);

  const handleClubsFilter = (param) => {
    console.log("handleClubsFilter");
    console.log(param);
    setShowClubButtonsToggler(!showClubButtonsToggler);
    setShowClubButtons(!showClubButtons);
    document.getElementById("AreaBumpFiltersHolderClubs").focus();
  };

  let i;
  for (i = 0; i < buttonCount.countTexts.length; i++) {
    console.log("TEST_BUTTON");
    console.log(buttonCount);
    console.log(buttonCount.countTexts[i]);
    buttons.push(
      <ToggleButton
        //selected={selected}
        value={buttonCount.ariaLabels[i]}
        data={buttonCount.countValues[i]}
        key={buttonCount.ariaLabels[i]}
        color="primary"
        //className={classes.clubButton}
        aria-label={buttonCount.ariaLabels[i]}
        className="clubsFilterButton"
      >
        {buttonCount.countTexts[i]}
      </ToggleButton>
    );
  }

  console.log("init_TESTING");
  console.log(buttonCount.countTexts.length);

  useEffect(() => {
    console.log("init_TESTING!!!");
    console.log(buttonCount);
    console.log(buttonCount.countTexts);

    console.log(buttonCount.countTexts);
    if (buttonCount.countTexts == null) {
      return;
    }

    if (buttonCount.countTexts.length == 0) {
      return;
    }
    setSelectedButtons(buttonCount.ariaLabels);
    setSelectedButtonsVals(buttonCount);
  }, [buttonCount.ariaLabels]);

  console.log(buttons);

  const onBlurHandler = (e) => {
    console.log(e);
    console.log("onBlurHandler");
  };

  return (
    <div id="AreaBumpFiltersHolder" className={classes.root}>
      <div style={{ alignItems: "center", justifyContent: "center" }}>
        <p
          style={{
            fontSize: "0.8rem",
            textAlign: "center",
            width: "inherit",
            alignItems: "center",
            margin: 0,
            padding: 0,
          }}
        >
          {" "}
          Clubs{" "}
        </p>
        <div
          onBlur={(e) => {
            console.log(e);
            console.log(e.relatedTarget);
            console.log(e.currentTarget);
            console.log(e.target);
            console.log(e.target.className);
            console.log("BlurHandler");
            let elClassNames = e.target.className;
            let stringArray = elClassNames.split(" ");

            /* console.log(stringArray);
            for (const i in stringArray) {
              if (stringArray[i] == "clubsFilterButton") return;
            } */

            if (e.relatedTarget != null) return;

            setShowClubButtonsToggler(true);
            setShowClubButtons(false);
          }}
          className={classes.root}
          className="clubsFilterButton"
          id="AreaBumpFiltersHolderClubs"
          tabIndex="0"
        >
          {showClubButtonsToggler && (
            <Button variant="contained" onClick={handleClubsFilter}>
              {toggleClubsButtonText}
            </Button>
          )}
          {showClubButtons && (
            <ToggleButtonGroup
              orientation="horizontal"
              size="small"
              value={selectedButtons}
              onChange={handleselectedButtons}
              /* onBlur={
                (console.log("ToggleButtonGroup_NOT_BLUR"),
                setShowClubButtonsToggler(true),
                setShowClubButtons(false))
              } */
              aria-label="clubsFilter"
              style={{ marginTop: 0 }}
              className="clubsFilterButton"
            >
              {buttons}
            </ToggleButtonGroup>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 
 * <Button>One</Button>
          <Button
            onClick={() => {
              alert("clicked2");
            }}
          >
            Two
          </Button>
          <Button
            selected={true}
            onClick={() => {
              alert("clicked3");
            }}
          >
            Three
          </Button>

          
 *  <Button>Default</Button>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button disabled>Disabled</Button>
      <Button href="#text-buttons" color="primary">
        Link
      </Button>
 */
