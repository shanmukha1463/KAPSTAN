"use client";

import { useAppContext } from "@/contexts";
import Image from "next/image";
import { useState } from "react";

export const DropDown: React.FC = () => {
  const [dropdownState, setDropdownState] = useState(false);
  const { activeApplication, setActiveApplication, applications } =
    useAppContext();

  return (
    <div className="h-[40px] bg-background w-[100px]">
      <div className="text-[10px] leading-[16px] mt-[0px]">Applications</div>
      <div className="relative">
        {!dropdownState ? (
          <div
            className="flex flex-row justify-between font-medium cursor-pointer"
            onClick={() => setDropdownState(!dropdownState)}
          >
            <div className="text-[14px] leading-[20px] font-medium">
              {applications[activeApplication]?.name}
            </div>
            <Image
              className="ml-2"
              src="/icons/down-arrow.svg"
              alt="Down Arrow"
              width={16}
              height={16}
            />
          </div>
        ) : (
          <ul className="absolute top-0 left-0 w-[100px] bg-background">
            {applications.map((item, index) => (
              <li
                className="flex flex-row justify-between font-medium cursor-pointer mb-1"
                key={item.id}
                onClick={() => {
                  setActiveApplication(index);
                  setDropdownState(!dropdownState);
                }}
              >
                <div className="text-[14px] leading-[20px] font-medium">
                  {item.name}
                </div>
                {index == 0 && (
                  <Image
                    className="ml-2"
                    src="/icons/down-arrow.svg"
                    alt="Down Arrow"
                    width={16}
                    height={16}
                    style={{ transform: "rotate(180deg)" }}
                    onClick={() => setDropdownState(!dropdownState)}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
