import ApplicationDropDown from "@/components/ApplicationDropDown";
import Image from "next/image";

const Header: () => JSX.Element = () => {
  return (
    <header className="flex-[0.7] flex flex-row justify-between items-center h-full border-b border-[#EBEBEB] ">
      <ApplicationDropDown />
      <div className="h-[40px] w-[170px] flex flex-row items-center justify-around">
        <div className="bg-[#FFD07B] text-center h-full w-[40px] rounded-full text-white flex items-center justify-center">
          JD
        </div>
        <p className="pr-2">John Doe</p>
        <Image
          className="mr-2"
          src="/icons/down-arrow.svg"
          alt="Down Arrow"
          width={16}
          height={16}
        />
      </div>
    </header>
  );
};

export default Header;
