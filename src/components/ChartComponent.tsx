import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import { data, DataItem } from "./Data";

// Load Highcharts map module
HighchartsMap(Highcharts);

// Import the map data directly from a CDN or local file
const vietnamMapData = require("../assets/vn-all.geo.json");

// Create a map for quick lookup
const dataMap = new Map<string, DataItem>(
  data.map((item) => [item["hc-key"], item])
);

// Create a map to quickly find the name of the province by `hc-key`
const nameMap = new Map<string, string>();
vietnamMapData.features.forEach((feature: any) => {
  const key = feature.properties["hc-key"];
  const name = feature.properties.name; // Assuming the name is in 'properties'
  nameMap.set(key, name);
});

const ITEMS_PER_PAGE = 9;

const ChartComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  // Slice data to get items for the current page
  const currentData = data.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const options: Highcharts.Options = {
    chart: {
      map: vietnamMapData, // Use Vietnam map
      height: 700,
    },
    title: {
      text: "Dân số và diện tích các tỉnh của Việt Nam",
    },
    colorAxis: {
      min: 0, // Minimum value of the color range
      max: 6000000, // Maximum value (adjust this as needed)
      stops: [
        [0, "#EFEFFF"], // Light blue for 0-2 triệu
        [0.33, "#9CC5FF"], // Lighter blue for 2-4 triệu
        [0.67, "#4682B4"], // Medium blue for 4-6 triệu
        [1, "#000022"], // Dark blue for values above 6 triệu
      ],
      minColor: "#EFEFFF", // Color for the minimum value
      maxColor: "#000022", // Color for the maximum value
      labels: {
        formatter: function () {
          const value = this.value as number;
          if (value < 2000000) return "0-2 triệu người";
          if (value < 4000000) return "2-4 triệu người";
          if (value < 6000000) return "4-6 triệu người";
          return "Trên 6 triệu người";
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "left",
      verticalAlign: "middle",
      x: 50, // Adjust the horizontal position of the legend
      y: 0, // Adjust the vertical position of the legend
      floating: true, // Make the legend float above the chart
      borderColor: "#CCC",
      borderWidth: 1,
      title: {
        text: "Dân số", // Add a title for clarity
      },
    },
    series: [
      {
        type: "map", // Specify the type as 'map'
        data: data.map((item) => [item["hc-key"], item.value]), // Map population data
        name: "Dân số các tỉnh",
        states: {
          hover: {
            color: "#00FF00", // Green color when hovering
          },
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}", // Display city/province name
        },
      },
    ],
    tooltip: {
      formatter: function (): string {
        const pointKey = (this as any).point["hc-key"];
        const pointData = dataMap.get(pointKey);

        const area = pointData ? pointData.area : "Unknown"; // Handle undefined area case
        const name = nameMap.get(pointKey) || "Unknown"; // Use nameMap to get the name
        const value = (this as any).point.value;

        return `<b>${name}</b><br/>Dân số : ${(value / 1000000).toFixed(
          1
        )} triệu người<br/>Diện tích: ${area} km²`;
      },
    },
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 2 }}>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"mapChart"} // Specify map chart type
          options={options} // Pass the configured options
        />
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          maxHeight: "700px",
        }}
      >
        <h3>Bảng Dân số và Diện tích</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid black", padding: "8px" }}>
                Tỉnh/TP
              </th>
              <th style={{ borderBottom: "1px solid black", padding: "8px" }}>
                Dân số (triệu người)
              </th>
              <th style={{ borderBottom: "1px solid black", padding: "8px" }}>
                Diện tích (km²)
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item["hc-key"]}>
                <td style={{ borderBottom: "1px solid black", padding: "8px" }}>
                  {nameMap.get(item["hc-key"]) || "Unknown"}
                </td>
                <td style={{ borderBottom: "1px solid black", padding: "8px" }}>
                  {(item.value / 1000000).toFixed(1)}
                </td>
                <td style={{ borderBottom: "1px solid black", padding: "8px" }}>
                  {item.area}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            {"<"}
          </button>{" "}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            {">"}
          </button>
          <span>
            {" "}
            Page {currentPage + 1} of {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
