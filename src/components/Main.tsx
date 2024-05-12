"use client";

import Image from "next/image";
import DeployedStatusButtonComponent, {
  DeployedStatusButton,
} from "./DeployedStatusButton";
import Tabs from "./Tabs";
import ServiceInfo from "./ServiceInfo";
import SystemMetrics from "./SystemMetrics";
import EventHistory from "./EventHistory";
import { useAppContext } from "@/contexts";
import Overview from "./Overview";

const Main: () => JSX.Element = () => {
  const { applications, activeApplication } = useAppContext();
  return (
    <main className="flex-[9] bg-background flex flex-col pr-[32px]">
      <div className="flex flex-row justify-between items-center pt-4">
        <h1 className="text-2xl font-bold">
          {applications[activeApplication]?.name}
        </h1>
        <div className="flex flex-row">
          <DeployedStatusButtonComponent
            status={DeployedStatusButton.Successful}
            text="Deployed"
          />
          <Image
            src="/icons/threedots.svg"
            alt="options"
            width={24}
            height={24}
          />
        </div>
      </div>
      <Tabs />
      
      {/* <ServiceInfo />
      <div className="mt-4 flex flex-row flex-wrap justify-between ">
        <SystemMetrics />
        <EventHistory />
      </div> */}
    </main>
  );
};

export default Main;
