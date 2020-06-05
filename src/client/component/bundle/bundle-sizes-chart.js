import { ResponsiveBar } from "@nivo/bar";
import React from "react";
import { formatValue } from "../../util/sizeUtil";

/**
 * Display bundle sizes in a chart (bar chart).
 */
export default function BundleSizesChart({ sizes }) {
  const dataset = formatData(sizes);

  return (
    <ResponsiveBar
      data={dataset}
      keys={["initial", "minify", "gzip"]}
      indexBy="version"
      colors={["rgb(65, 182, 196)", "rgb(127, 205, 187)", "rgb(199, 233, 180)"]}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      label={(d) => formatValue(d.value) + "kB"}
      isInteractive={false}
      margin={{ bottom: 100 }}
      enableGridX={false}
      enableGridY={false}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 90,
        legendPosition: "middle",
      }}
      axisLeft={null}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom",
          direction: "row",
          itemWidth: 100,
          itemHeight: 20,
          translateX: 25,
          translateY: 80,
        },
      ]}
      animate={true}
    />
  );
}

function formatData(sizes) {
  return sizes.map((size) => {
    return {
      version: size.version,
      initial: size.initialSize,
      minify: size.minifySize,
      gzip: size.gzipSize,
    };
  });
}
