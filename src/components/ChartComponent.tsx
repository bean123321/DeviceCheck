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
      style: {
        fontSize: "22px",
        fontWeight: "700",
        color: "#333",
      },
    },
    colorAxis: {
      min: 0, // Minimum population value
      max: 6000000, // Maximum population value
      stops: [
        [0, "#d9d9d9"], // Light grey for population below 1 million
        [0.2, "#f2d1c9"], // Light pink for population 1-2 million
        [0.4, "#f4a299"], // Pink for population 2-3 million
        [0.6, "#e25d51"], // Red for population 3-4 million
        [0.8, "#b41d0d"], // Dark red for population above 4 million
      ],
      labels: {
        formatter: function () {
          const value = this.value as number;
          if (value < 1000000) return "Dưới 1 triệu";
          if (value < 2000000) return "1-2 triệu";
          if (value < 3000000) return "2-3 triệu";
          if (value < 4000000) return "3-4 triệu";
          return "Trên 4 triệu";
        },
      },
    },
    legend: {
      enabled: false, // Disable the default legend
    },
    series: [
      {
        type: "map",
        data: data.map((item) => [item["hc-key"], item.value]),
        name: "Dân số các tỉnh",
        states: {
          hover: {
            color: "#00FF00",
          },
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
      },
    ],
    tooltip: {
      formatter: function (): string {
        const pointKey = (this as any).point["hc-key"];
        const pointData = dataMap.get(pointKey);

        const area = pointData ? pointData.area : "Unknown";
        const name = nameMap.get(pointKey) || "Unknown";
        const value = (this as any).point.value;

        return `<b>${name}</b><br/>Dân số : ${(value / 1000000).toFixed(
          1
        )} triệu người<br/>Diện tích: ${area} km²`;
      },
    },
    // Enable map navigation for zooming and panning
    mapNavigation: {
      enabled: true, // Enable zooming
      enableButtons: true, // Show zoom buttons
      buttonOptions: {
        verticalAlign: "bottom", // Position the buttons vertically
        align: "left", // Move buttons to the right (can be 'left', 'center', or 'right')
        x: 50, // Adjust the horizontal position (negative moves left, positive moves right)
      },
    },
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-4 lg:space-y-0 space-y-4">
      {/* Custom legend */}
      <div className="w-full lg:w-1/4 p-4">
        <h3 className="text-xl font-bold mb-2 mt-[5px]">
          Nhóm dân số (Đơn vị: Người)
        </h3>
        <ul className="space-y-2 pl-4">
          {/* Below 1 million */}
          <li className="flex items-center">
            <span className="w-6 h-6 bg-gray-300 mr-2 block"></span>
            <span className="text-sm">Dưới 1 triệu</span>
          </li>
          {/* 1-2 million */}
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#f2d1c9] mr-2 block"></span>
            <span className="text-sm">1 triệu đến dưới 2 triệu</span>
          </li>
          {/* 2-3 million */}
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#f4a299] mr-2 block"></span>
            <span className="text-sm">2 triệu đến dưới 3 triệu</span>
          </li>
          {/* 3-4 million */}
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#e25d51] mr-2 block"></span>
            <span className="text-sm">3 triệu đến dưới 4 triệu</span>
          </li>
          {/* Above 4 million */}
          <li className="flex items-center">
            <span className="w-6 h-6 bg-[#b41d0d] mr-2 block"></span>
            <span className="text-sm">Từ 4 triệu trở lên</span>
          </li>
        </ul>
      </div>

      {/* Chart */}
      <div className="w-full lg:w-2/4 p-4">
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"mapChart"}
          options={options}
        />
      </div>

      {/* Population and Area Table */}
      <div className="w-full lg:w-1/4 p-4">
        <h3 className="text-xl font-bold mt-[5px] mb-[5px]">
          Bảng dân số và diện tích
        </h3>
        <table className="w-full border-collapse text-xs md:text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 p-2 text-gray-700 font-medium">
                Tỉnh/TP
              </th>
              <th className="border-b border-gray-300 p-2 text-gray-700 font-medium">
                Dân số (triệu người)
              </th>
              <th className="border-b border-gray-300 p-2 text-gray-700 font-medium">
                Diện tích (km²)
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr
                key={item["hc-key"]}
                className="even:bg-gray-50 odd:bg-white hover:bg-gray-100 transition"
              >
                <td className="border-b border-gray-300 p-2 text-gray-800">
                  {nameMap.get(item["hc-key"]) || "Unknown"}
                </td>
                <td className="border-b border-gray-300 p-2 text-gray-800">
                  {(item.value / 1000000).toFixed(1)}
                </td>
                <td className="border-b border-gray-300 p-2 text-gray-800">
                  {item.area}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex items-center justify-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded disabled:opacity-50 hover:bg-gray-400 transition text-xs md:text-sm"
          >
            {"<"}
          </button>
          <span className="text-sm md:text-base">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded disabled:opacity-50 hover:bg-gray-400 transition text-xs md:text-sm"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
