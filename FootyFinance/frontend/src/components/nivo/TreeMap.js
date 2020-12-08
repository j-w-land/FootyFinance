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
import { ResponsiveSunburst } from "@nivo/sunburst";
import { ResponsiveTreeMap } from "@nivo/treemap";
import { useTooltip, BasicTooltip } from "@nivo/tooltip";
import store from "../../store";
import { formatTreeMap } from "./formatData";
import PropTypes from "prop-types";
import MyCustomTooltip from "./MyCustomTooltip";
import { ThemeProvider } from "@nivo/core";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export default function MyTreeMap(props) {
  //const [dataFake, setDataFake] = useState(dataFakeSet);

  console.log("TreeMap_PROPS___XXXXX");
  //console.log(props);
  console.log("TREEMAP_DATA");

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

  let fsliStatus = "idle";

  try {
    fsdataStatus = store.getState().fs_data.fslis.status;
  } catch (error) {
    console.log(error);
    fsliStatus = "idle";
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

    let fslisData = store.getState().fs_data.fslis.data;

    console.log(getData);

    let dataRes = formatTreeMap(getData, {
      structure: setUp.structure,
      years: setUp.years,
      dataKey: setUp.dataKey,
      clubsArray: setUp.clubsSelected,
      fslis: setUp.fslis,
      fslisData: fslisData,
    });

    setDataFormatted(dataRes);
    setDataCurrent(dataRes);
  }, [fsliStatus, fsdataStatus, setUp.clubsArray]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveTreeMap
        /* {...props} */
        data={data}
        identity="name"
        value="loc"
        valueFormat=".02s"
        /* leavesOnly={true} */
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelSkipSize={6}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.2]] }}
        parentLabelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        borderColor={{ from: "color", modifiers: [["darker", 0.1]] }}
        tooltip={({ node }) => (
          <strong style={{ color: node.color }}>
            {node.pathComponents.join(" / ")}: {node.formattedValue}
          </strong>
        )}
        theme={{
          tooltip: {
            container: {
              background: "#333",
            },
          },
        }}
      />
    </div>
  );
}

const data = {
  name: "nivo",
  color: "hsl(245, 70%, 50%)",
  children: [
    {
      name: "viz",
      color: "hsl(243, 70%, 50%)",
      children: [
        {
          name: "stack",
          color: "hsl(75, 70%, 50%)",
          children: [
            {
              name: "chart",
              color: "hsl(219, 70%, 50%)",
              loc: 152750,
            },
            {
              name: "xAxis",
              color: "hsl(224, 70%, 50%)",
              loc: 84,
            },
            {
              name: "yAxis",
              color: "hsl(324, 70%, 50%)",
              loc: 19767,
            },
            {
              name: "layers",
              color: "hsl(160, 70%, 50%)",
              loc: 57475,
            },
          ],
        },
        {
          name: "pie",
          color: "hsl(282, 70%, 50%)",
          children: [
            {
              name: "chart",
              color: "hsl(325, 70%, 50%)",
              children: [
                {
                  name: "pie",
                  color: "hsl(225, 70%, 50%)",
                  children: [
                    {
                      name: "outline",
                      color: "hsl(262, 70%, 50%)",
                      loc: 46507,
                    },
                    {
                      name: "slices",
                      color: "hsl(330, 70%, 50%)",
                      loc: 66090,
                    },
                    {
                      name: "bbox",
                      color: "hsl(275, 70%, 50%)",
                      loc: 122410,
                    },
                  ],
                },
                {
                  name: "donut",
                  color: "hsl(231, 70%, 50%)",
                  loc: 485,
                },
                {
                  name: "gauge",
                  color: "hsl(251, 70%, 50%)",
                  loc: 148024,
                },
              ],
            },
            {
              name: "legends",
              color: "hsl(222, 70%, 50%)",
              loc: 153885,
            },
          ],
        },
      ],
    },
    {
      name: "colors",
      color: "hsl(320, 70%, 50%)",
      children: [
        {
          name: "rgb",
          color: "hsl(25, 70%, 50%)",
          loc: 105143,
        },
        {
          name: "hsl",
          color: "hsl(9, 70%, 50%)",
          loc: 81535,
        },
      ],
    },
    {
      name: "utils",
      color: "hsl(170, 70%, 50%)",
      children: [
        {
          name: "randomize",
          color: "hsl(104, 70%, 50%)",
          loc: 22953,
        },
        {
          name: "resetClock",
          color: "hsl(105, 70%, 50%)",
          loc: 143985,
        },
        {
          name: "noop",
          color: "hsl(24, 70%, 50%)",
          loc: 165591,
        },
        {
          name: "tick",
          color: "hsl(85, 70%, 50%)",
          loc: 23254,
        },
        {
          name: "forceGC",
          color: "hsl(10, 70%, 50%)",
          loc: 54462,
        },
        {
          name: "stackTrace",
          color: "hsl(162, 70%, 50%)",
          loc: 14227,
        },
        {
          name: "dbg",
          color: "hsl(58, 70%, 50%)",
          loc: 197352,
        },
      ],
    },
    {
      name: "generators",
      color: "hsl(187, 70%, 50%)",
      children: [
        {
          name: "address",
          color: "hsl(320, 70%, 50%)",
          loc: 65840,
        },
        {
          name: "city",
          color: "hsl(318, 70%, 50%)",
          loc: 17202,
        },
        {
          name: "animal",
          color: "hsl(131, 70%, 50%)",
          loc: 2980,
        },
        {
          name: "movie",
          color: "hsl(232, 70%, 50%)",
          loc: 82076,
        },
        {
          name: "user",
          color: "hsl(259, 70%, 50%)",
          loc: 128621,
        },
      ],
    },
    {
      name: "set",
      color: "hsl(201, 70%, 50%)",
      children: [
        {
          name: "clone",
          color: "hsl(101, 70%, 50%)",
          loc: 19018,
        },
        {
          name: "intersect",
          color: "hsl(44, 70%, 50%)",
          loc: 14255,
        },
        {
          name: "merge",
          color: "hsl(335, 70%, 50%)",
          loc: 101144,
        },
        {
          name: "reverse",
          color: "hsl(327, 70%, 50%)",
          loc: 62283,
        },
        {
          name: "toArray",
          color: "hsl(74, 70%, 50%)",
          loc: 185473,
        },
        {
          name: "toObject",
          color: "hsl(307, 70%, 50%)",
          loc: 108460,
        },
        {
          name: "fromCSV",
          color: "hsl(123, 70%, 50%)",
          loc: 197603,
        },
        {
          name: "slice",
          color: "hsl(24, 70%, 50%)",
          loc: 63467,
        },
        {
          name: "append",
          color: "hsl(220, 70%, 50%)",
          loc: 168496,
        },
        {
          name: "prepend",
          color: "hsl(341, 70%, 50%)",
          loc: 9315,
        },
        {
          name: "shuffle",
          color: "hsl(211, 70%, 50%)",
          loc: 42503,
        },
        {
          name: "pick",
          color: "hsl(181, 70%, 50%)",
          loc: 49633,
        },
        {
          name: "plouc",
          color: "hsl(286, 70%, 50%)",
          loc: 199956,
        },
      ],
    },
    {
      name: "text",
      color: "hsl(138, 70%, 50%)",
      children: [
        {
          name: "trim",
          color: "hsl(103, 70%, 50%)",
          loc: 131072,
        },
        {
          name: "slugify",
          color: "hsl(54, 70%, 50%)",
          loc: 134404,
        },
        {
          name: "snakeCase",
          color: "hsl(115, 70%, 50%)",
          loc: 32326,
        },
        {
          name: "camelCase",
          color: "hsl(200, 70%, 50%)",
          loc: 41850,
        },
        {
          name: "repeat",
          color: "hsl(177, 70%, 50%)",
          loc: 21037,
        },
        {
          name: "padLeft",
          color: "hsl(260, 70%, 50%)",
          loc: 87139,
        },
        {
          name: "padRight",
          color: "hsl(25, 70%, 50%)",
          loc: 163646,
        },
        {
          name: "sanitize",
          color: "hsl(338, 70%, 50%)",
          loc: 17223,
        },
        {
          name: "ploucify",
          color: "hsl(294, 70%, 50%)",
          loc: 60138,
        },
      ],
    },
    {
      name: "misc",
      color: "hsl(214, 70%, 50%)",
      children: [
        {
          name: "greetings",
          color: "hsl(350, 70%, 50%)",
          children: [
            {
              name: "hey",
              color: "hsl(336, 70%, 50%)",
              loc: 129267,
            },
            {
              name: "HOWDY",
              color: "hsl(347, 70%, 50%)",
              loc: 60648,
            },
            {
              name: "aloha",
              color: "hsl(278, 70%, 50%)",
              loc: 139342,
            },
            {
              name: "AHOY",
              color: "hsl(212, 70%, 50%)",
              loc: 191021,
            },
          ],
        },
        {
          name: "other",
          color: "hsl(313, 70%, 50%)",
          loc: 98657,
        },
        {
          name: "path",
          color: "hsl(260, 70%, 50%)",
          children: [
            {
              name: "pathA",
              color: "hsl(357, 70%, 50%)",
              loc: 89374,
            },
            {
              name: "pathB",
              color: "hsl(55, 70%, 50%)",
              children: [
                {
                  name: "pathB1",
                  color: "hsl(63, 70%, 50%)",
                  loc: 37978,
                },
                {
                  name: "pathB2",
                  color: "hsl(90, 70%, 50%)",
                  loc: 547,
                },
                {
                  name: "pathB3",
                  color: "hsl(79, 70%, 50%)",
                  loc: 76243,
                },
                {
                  name: "pathB4",
                  color: "hsl(53, 70%, 50%)",
                  loc: 66629,
                },
              ],
            },
            {
              name: "pathC",
              color: "hsl(149, 70%, 50%)",
              children: [
                {
                  name: "pathC1",
                  color: "hsl(13, 70%, 50%)",
                  loc: 6233,
                },
                {
                  name: "pathC2",
                  color: "hsl(349, 70%, 50%)",
                  loc: 93708,
                },
                {
                  name: "pathC3",
                  color: "hsl(7, 70%, 50%)",
                  loc: 4024,
                },
                {
                  name: "pathC4",
                  color: "hsl(150, 70%, 50%)",
                  loc: 75213,
                },
                {
                  name: "pathC5",
                  color: "hsl(352, 70%, 50%)",
                  loc: 5096,
                },
                {
                  name: "pathC6",
                  color: "hsl(320, 70%, 50%)",
                  loc: 28543,
                },
                {
                  name: "pathC7",
                  color: "hsl(299, 70%, 50%)",
                  loc: 58311,
                },
                {
                  name: "pathC8",
                  color: "hsl(357, 70%, 50%)",
                  loc: 60772,
                },
                {
                  name: "pathC9",
                  color: "hsl(332, 70%, 50%)",
                  loc: 26192,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
