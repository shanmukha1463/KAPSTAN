import Image from "next/image";
import { useState } from "react";

const ServiceInfo: React.FC = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="mt-4 bg-foreground rounded pl-4 pr-4">
      <div className="flex flex-row justify-between items-center mt-4 mb-4">
        <h1 className="font-bold text-[16px] leading-[24px] text-[#595959]">
          Service info
        </h1>
        {open ? (
          <Image
            src="/icons/down-arrow.svg"
            alt="Up Arrow"
            width={24}
            height={24}
            onClick={() => setOpen(!open)}
            style={{ transform: "rotate(180deg)" }}
          />
        ) : (
          <Image
            src="/icons/down-arrow.svg"
            alt="Down Arrow"
            width={24}
            height={24}
            onClick={() => setOpen(!open)}
          />
        )}
      </div>

      {open && (
        <>
          <div className=" flex flex-row">
            <div className="flex flex-col mr-[100px]">
              <p className="text-[12px] leading-[18px] text-[#595959] font-medium">
                Current version
              </p>
              <div className="flex flex-row mt-2">
                <Image
                  src={"/icons/greentick.svg"}
                  alt="Tick Logo"
                  width={20}
                  height={20}
                />
                <p className="text-[14px] leading-[20px] ml-2">In Sync</p>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-[12px] leading-[18px] text-[#595959] font-medium">
                Desired version
              </p>
              <p className="mt-2 text-[16px] leading-[24px]">1.2.1</p>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center mt-8 mb-4 h-[40px]">
            <button className="text-foreground bg-[#6E27D5] font-bold text-[14px] leading-[20px] h-full pl-6 pr-6 rounded">
              Deploy
            </button>
            <p className="font-medium text-[12px] leading-[18px] text-[#595959]">
              Last updated 5 hours ago
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceInfo;
