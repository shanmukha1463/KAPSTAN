import Image from "next/image";
import { useState } from "react";
import Overview from "./Overview";
import EnvironmentVariables from "./Environmentvariables";
import EventHistoryFull from "./EventHistoryFull";
import Alerts from "./Alerts";

const tabItems = [
  {
    name: "Overview",
    icon: "icons/overview.svg",
    isImportant: false,
  },
  {
    name: "Environment Variables",
    icon: "icons/environment_variables.svg",
    isImportant: false,
  },
  {
    name: "Alerts",
    icon: "icons/alerts.svg",
    isImportant: true,
  },
  {
    name: "Event History",
    icon: "icons/event_history.svg",
    isImportant: false,
  },
];

const Tabs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <>
      <div className="pt-4 flex flex-row space-between">
        {tabItems.map((item, index) => (
          <div
            key={item.name}
            className="flex flex-row mr-6 align-top cursor-pointer"
            onClick={() => setSelectedTab(index)}
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={17}
              height={17}
              className="mr-1"
            />
            <div
              className={`leading-[20px] text-[14px] font-bold ${
                selectedTab == index
                  ? "text-black text-opacity-100"
                  : "text-black text-opacity-50"
              }`}
            >
              {item.name}
            </div>
            {item.isImportant && (
              <div className="w-[8px] h-[8px] bg-[#E91F04] rounded-full ml-1"></div>
            )}
          </div>
        ))}
      </div>
      {selectedTab === 0 && <Overview />}
      {selectedTab === 1 && <EnvironmentVariables />}
      {selectedTab === 2 && <Alerts />}
      {selectedTab === 3 && <EventHistoryFull />}
    </>
  );
};

export default Tabs;
