"use server";
import { Application, eventHistoryMetric } from "@/types";
import { Options } from "highcharts";

interface memoryMetric {
  id: number;
  timestamp: string;
  applicationId: string;
  memoryUtilization: string;
}

interface cpuMetric {
  id: number;
  timestamp: string;
  applicationId: string;
  cpuUtilization: string;
}

const getMemoryMetrics: () => Promise<Options["series"]> = async () => {
  const res = await fetch("https://retoolapi.dev/ybFVVH/memoryutilization", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch system metrics");
  }
  const memoryMetrics = await res.json();

  const series = memoryMetrics.reduce((acc: any, item: memoryMetric) => {
    const { applicationId, timestamp, memoryUtilization } = item;
    if (!acc[applicationId]) {
      acc[applicationId] = {
        name: applicationId,
        data: [],
      };
    }
    acc[applicationId].data.push({
      x: new Date(Number(timestamp) * 1000),
      y: parseFloat(memoryUtilization),
    });
    return acc;
  }, {});

  return Object.values(series);
};

const fetchCPUMetrics: () => Promise<Options["series"]> = async () => {
  const res = await fetch("https://retoolapi.dev/Ymxfa2/cpuutilization", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch system metrics");
  }
  const memoryMetrics = await res.json();

  const series = memoryMetrics.reduce((acc: any, item: cpuMetric) => {
    const { applicationId, timestamp, cpuUtilization } = item;
    if (!acc[applicationId]) {
      acc[applicationId] = {
        name: applicationId,
        data: [],
      };
    }
    acc[applicationId].data.push({
      x: new Date(Number(timestamp) * 1000),
      y: parseFloat(cpuUtilization),
    });
    return acc;
  }, {});

  return Object.values(series);
};

const getEventHistory: () => Promise<eventHistoryMetric[]> = async () => {
  const res = await fetch("https://retoolapi.dev/TYjDIe/eventhistory", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch event history");
  }

  return res.json();
};

async function fetchApplications(): Promise<Application[]> {
  const res = await fetch("https://retoolapi.dev/71NNjB/applications", {
    cache: "no-store", // Avoid caching data on build
  });
  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }
  return res.json();
}

export {
  getMemoryMetrics,
  fetchCPUMetrics,
  getEventHistory,
  fetchApplications,
};
