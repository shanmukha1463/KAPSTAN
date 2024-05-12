"use client";

import Image from "next/image";
import { useState } from "react";

const upperSideBarItems = [
  {
    name: "Applications",
    icon: "icons/applications.svg",
    isBeta: false,
    isSelected: true,
  },
  {
    name: "Connections",
    icon: "icons/connections.svg",
    isBeta: false,
    isSelected: true,
  },
  {
    name: "Cost",
    icon: "icons/cost.svg",
    isBeta: false,
  },
  {
    name: "Security",
    icon: "icons/security.svg",
    isBeta: true,
  },
];

const lowerSideBarItems = [
  {
    name: "Admin",
    icon: "icons/admin.svg",
    isBeta: false,
  },
  {
    name: "Docs",
    icon: "icons/docs.svg",
    isBeta: false,
  },
];

const Sidebar: () => JSX.Element = () => {
  const [collaspsed, setCollapsed] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <aside
      className={`${
        collaspsed ? "flex-[0.2]" : "flex-[1.5]"
      } bg-primary flex flex-col`}
    >
      <div className="flex flex-row items-center justify-start text-foreground w-[100%] h-[70px] border-b border-b-[#4D1B95] pl-[20px] pr-[20px] ">
        <Image
          className=""
          src="/icons/kaspan-logo.svg"
          alt="Logo"
          width={40}
          height={40}
        />
        {!collaspsed && <h1 className="text-2xl  ml-3 mr-14">Kapstan</h1>}
      </div>
      {upperSideBarItems.map((item, index) => (
        <div
          key={item.name}
          className="h-[70px] border-b border-b-[#4D1B95] flex justify-center items-center cursor-pointer"
          onClick={() => setSelectedIndex(index)}
        >
          <div
            className={`flex flex-row items-center ${
              collaspsed ? "justify-center" : "justify-start"
            } text-foreground h-[50px] w-[90%] ml-[5%] mr-[5%] font-medium rounded ${
              index === selectedIndex ? "bg-[#4D1B95]" : ""
            }`}
            key={item.name}
          >
            <div className="h-[40px] w-[40px] flex justify-center items-center">
              <Image src={item.icon} alt="Logo" width={16} height={16} />
            </div>
            {!collaspsed && <h1 className="ml-3">{item.name}</h1>}
            {item.isBeta && !collaspsed && (
              <h1 className="bg-[#6E27D5] ml-2 pl-2 pr-2 rounded-[4px] text-xs leading-5 font-medium">
                Beta
              </h1>
            )}
          </div>
        </div>
      ))}
      <div className="flex-1 flex w-[100%]">
        <div className="mt-auto w-[100%]">
          {lowerSideBarItems.map((item) => (
            <div
              className="flex flex-row items-center justify-start text-foreground w-[100%] h-[70px] border-b border-b-[#4D1B95] pl-[20px] pr-[20px]  font-medium"
              key={item.name}
            >
              <div className="h-[40px] w-[40px] flex justify-center items-center">
                <Image src={item.icon} alt="Logo" width={16} height={16} />
              </div>
              {!collaspsed && <h1 className="ml-3 ">{item.name}</h1>}
              {item.isBeta && (
                <h1 className="bg-[#6E27D5] ml-2 pl-2 pr-2 rounded-[4px] text-xs leading-5 font-medium">
                  Beta
                </h1>
              )}
            </div>
          ))}

          <div
            className="flex flex-row items-center justify-start text-white w-[100%] h-[70px] border-b border-b-[#4D1B95] pl-[20px] pr-[20px]  font-medium"
            key={"closeLeftSideBar"}
          >
            <div
              className="h-[40px] w-[40px] flex justify-center items-center cursor-auto"
              onClick={() => setCollapsed(!collaspsed)}
            >
              {collaspsed ? (
                <Image
                  src={"icons/swipe.svg"}
                  alt="Logo"
                  width={16}
                  height={16}
                  style={{ transform: "rotate(180deg)" }}
                />
              ) : (
                <Image
                  src={"icons/swipe.svg"}
                  alt="Logo"
                  width={16}
                  height={16}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
