import React, { useEffect } from "react";
import * as echarts from "echarts";

interface ChartProps {
  currentData: {
    formattedMonths: string[];
    totalProfits: any[];
    totalRevenues: any[];
  };
}

const ChartComponent: React.FC<ChartProps> = ({ currentData }) => {


  useEffect(() => {
    // Initialize echarts instance
    const chartDom = document.getElementById("main");
    const myChart = echarts.init(chartDom);

    if (currentData) {
      const { formattedMonths, totalProfits, totalRevenues } = currentData;

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["Profit", "Revenue"],
        },

        xAxis: [
          {
            type: "category",
            data: formattedMonths,
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "Profit",
            axisLabel: {
              formatter: "{value} $", // Assuming profit is in dollars
            },
          },
          {
            type: "value",
            name: "Revenue",
            axisLabel: {
              formatter: "{value} $", // Assuming revenue is in dollars
            },
          },
        ],
        series: [
          {
            name: "Profit",
            type: "bar",
            data: totalProfits, // Use 'profit' field for y-axis
          },
          {
            name: "Revenue",
            type: "line",
            data: totalRevenues, // Use 'revenue' field for y-axis
          },
        ],
      };

      // Apply the option to the chart
      option && myChart.setOption(option);
    }
    // Clean up the chart when the component unmounts
    return () => {
      myChart.dispose();
    };
  }, [currentData]); 

  return (
    <div
      id="main"
      style={{ width: "90%", height: "55vh", margin: "auto" }}
    >
      
    </div>
  );
};

export default ChartComponent;
