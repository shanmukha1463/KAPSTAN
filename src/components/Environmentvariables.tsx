import Image from "next/image";
import { useState } from "react";
import EditEnvs from "./popups/EditEnvs";

const EnvironmentVariables: React.FC = () => {
  const [editPopup, setEditPopup] = useState(false);
  const [envs, setEnvs] = useState([
    { env: "shanmukha", value: "srinivas" },
    { env: "shanmukha", value: "srinivas" },
  ]);
  return (
    <div className="h-[500px] m-4 bg-foreground flex flex-col">
      <div className="flex flex-row justify-between mt-4 ml-4 mr-4">
        <h1 className="font-bold text-[16px] leading-[24px] text-[#595959] ">
          Environment Variables
        </h1>
        <div className="flex flex-row justify-center ">
          <Image
            src="/icons/add.svg"
            alt="options"
            width={20}
            height={20}
            className="mr-2 cursor-pointer"
            onClick={() => setEditPopup(!editPopup)}
          />

          <Image
            src="/icons/download.svg"
            alt="options"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </div>
      </div>
      {envs.length === 0 ? (
        <p className="font-medium text-[14px] leading-[20px] text-[#595959] mt-4 ml-4">
          No environment variable created.
        </p>
      ) : (
        envs.map((env, index) => {
          return (
            <div
              className="w-[50%] flex flex-row border-[1px] border-[#EBEBEB] rounded h-[60px] ml-4 mr-4 mt-4 pl-2 pr-2 justify-between items-center"
              key={index}
            >
              <div className="font-bold w-[45%]">{env.env}</div>
              <div className="w-[45%]">{env.value}</div>
              <div className="w-[10%]">
                <Image
                  src={"/icons/delete.svg"}
                  alt="delete"
                  width={20}
                  height={20}
                  onClick={() => setEnvs(envs.filter((e) => e !== env))}
                />
              </div>
            </div>
          );
        })
      )}
      {editPopup && (
        <EditEnvs setEditPopup={setEditPopup} setEnvs={setEnvs} envs={envs} />
      )}
    </div>
  );
};

export default EnvironmentVariables;
