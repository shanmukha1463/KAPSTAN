"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Options } from "highcharts";
import { useEffect, useState } from "react";
import { getMemoryMetrics, fetchCPUMetrics } from "@/actions";
import { useAppContext } from "@/contexts";

const categories = [{ name: "CPU" }, { name: "Memory" }];

enum Tabs {
  CPU,
  Memory,
}

const SystemMetrics: React.FC = () => {
  const [options, setOptions] = useState<Options>({});
  const [currentActiveTab, setCurrentActiveTab] = useState<Tabs>(Tabs.CPU);
  const { applications } = useAppContext();
  const fetchSystemMetrics: (operand1: Tabs) => void = async (activeTab) => {
    try {
      let seriesData;
      if (activeTab === Tabs.Memory) seriesData = await getMemoryMetrics();
      else if (activeTab === Tabs.CPU) seriesData = await fetchCPUMetrics();
      seriesData = seriesData?.map((item: any) => {
        return { ...item, name: applications[Number(item.name) - 1].name };
      });
      const options: Options = {
        chart: {
          type: "spline",
        },
        title: {
          text: activeTab === Tabs.CPU ? "CPU Utilization(%)" : "Memory",
          align: "left",
          style: {
            fontSize: "14px",
            fontWeight: "600",
            lineHeight: "20px",
            letterSpacing: "-0.01em",
            color: "#333333",
          },
        },
        xAxis: {
          type: "datetime",
          tickWidth: 0,
          lineColor: "#EBEBEB",
          labels: {
            align: "center",
            y: activeTab === Tabs.CPU ? undefined : -10,
            style: {
              fontSize: "10px",
              lineHeight: "16px",
            },
          },
        },
        yAxis: {
          title: {
            text: "",
          },
        },
        series: seriesData,
        plotOptions: {
          series: {
            marker: {
              enabled: false,
            },
          },
        },
      };
      setOptions({ ...options });
    } catch (error) {
      console.log("failed to get memory metrics", error);
    }
  };

  useEffect(() => {
    fetchSystemMetrics(currentActiveTab);
  }, [currentActiveTab, applications]);

  return (
    <div className="w-full lg:w-[49%] h-[400px] bg-foreground rounded flex flex-col">
      <div className="font-bold text-[16px] leading-[24px] text-[#595959] mt-4 pl-4">
        System Metrics
      </div>
      <div className="flex flex-row items-center justify-center mt-4 mb-2 border-b-[1px] border-[#BDBDBD]">
        {categories.map((category, index) => {
          return (
            <p
              className={`w-1/2 text-center pb-4  ${
                currentActiveTab === index &&
                "border-b-[2.5px] border-solid border-[#6E27D5] text-[#6E27D5] font-bold"
              }`}
              key={index}
              onClick={() => setCurrentActiveTab(index)}
            >
              {category.name}
            </p>
          );
        })}
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SystemMetrics;
