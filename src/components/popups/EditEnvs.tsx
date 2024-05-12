"use client";

import Image from "next/image";
import { useState } from "react";

interface Env {
  env: string;
  value: string;
}

interface EditEnvsProps {
  setEditPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setEnvs: React.Dispatch<React.SetStateAction<Env[]>>;
  envs: Env[];
}

interface EditEnvsChildProps {
  envs: Env[];
  setEnvs: React.Dispatch<React.SetStateAction<Env[]>>;
  oldEnvs: Env[];
}

const UploadFileEnvs: React.FC<EditEnvsChildProps> = ({
  envs,
  setEnvs,
  oldEnvs,
}) => {
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const content = e.target.result;
        setFileContent(content);
      };
      reader.readAsText(file);
    }
  };

  const parseEnvVariables = (content: string) => {
    const lines = content.split(/\r?\n/);
    const envVars = lines.reduce((acc: any, line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || "";

        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1);
          value = value.replace(/\\n/g, "\n");
        }

        acc[key] = value;
      }
      return acc;
    }, {});

    setEnvs(
      Object.keys(envVars).map((key) => {
        return {
          env: key,
          value: envVars[key] || "",
        };
      })
    );
  };

  const handleCancel = () => {
    setFileName("");
    setEnvs(oldEnvs);
  };

  return (
    <div className="flex flex-col w-[95%] ml-auto mr-auto mt-8 border-[#EBEBEB] border-2 rounded pt-2 pb-2">
      <div className="h-[80px] w-[95%] ml-auto mr-auto rounded flex">
        <div className=" flex-1 relative flex-col bg-[#F8F8F8]  border-[1px] border-dashed border-gray-300 rounded cursor-pointer hover:border-gray-500">
          {!fileName && (
            <>
              <input
                type="file"
                className="absolute opacity-0 w-full h-full  cursor-pointer"
                onChange={handleFileChange}
                multiple={false}
              />
              <Image
                src={"/icons/upload.svg"}
                alt="upload"
                width={20}
                height={20}
                className="ml-auto mr-auto mt-6"
              />
              <p className="text-[14px] leading-[20px] font-bold ml-auto mr-auto text-center">
                Click or drag file(s) here to upload
              </p>
            </>
          )}
          {fileName && (
            <div className="text-center text-sm text-gray-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span>{fileName}</span>
            </div>
          )}
        </div>
      </div>
      <div className="text-[12px] leading-[18px] text-[#595959] w-[95%] ml-auto mr-auto mt-2">
        Upload a .env file. It should not be greater than 5KB.
      </div>
      <div className="w-[95%] ml-auto mr-auto flex flex-row justify-end mt-8">
        <button
          className="h-[40px] rounded border-[1px] border-black bg-foreground pl-6 pr-6 font-bold"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="h-[40px] rounded border-2 border-primary bg-primary ml-2 text-foreground pl-6 pr-6 font-bold"
          onClick={() => {
            parseEnvVariables(fileContent);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

const ManualEditEnvs: React.FC<EditEnvsChildProps> = ({
  envs,
  setEnvs,
  oldEnvs,
}) => {
  return (
    <div className="flex flex-col w-[95%] ml-auto mr-auto mt-8 border-[#EBEBEB] border-2 rounded pt-2 pb-2">
      {[...envs].map((env, index) => (
        <div
          className="flex flex-row justify-between w-[95%] ml-auto mr-auto mt-2 mb-2 flex-wrap gap-y-1"
          key={index}
        >
          <div className="flex flex-row flex-1 justify-start items-center flex-wrap">
            <div className="text-[14px] leading-[20px] mr-4 text-[#595959]">
              Name
            </div>
            <input
              type="text"
              defaultValue={env.env}
              className="text-[14px] leading-[20px] border-[1px] border-black h-[40px] pl-2 rounded w-[80%]"
              onChange={(e) => {
                setEnvs((envs) =>
                  envs.map((env, i) =>
                    i === index ? { ...env, env: e.target.value } : env
                  )
                );
              }}
            />
          </div>
          <div className="flex flex-row flex-1 justify-start  items-center flex-wrap">
            <div className="text-[14px] leading-[20px] mr-4 text-[#595959]">
              Value
            </div>
            <input
              type="text"
              defaultValue={env.value}
              className="text-[14px] leading-[20px] border-[1px] border-black h-[40px] pl-2 rounded w-[80%]"
              onChange={(e) => {
                setEnvs((envs) =>
                  envs.map((env, i) =>
                    i === index ? { ...env, value: e.target.value } : env
                  )
                );
              }}
            />
          </div>
          <Image
            src="/icons/delete.svg"
            className="flex-[0.05]"
            alt="delete"
            width={20}
            height={20}
            onClick={() =>
              setEnvs((envs) => envs.filter((_, i) => i !== index))
            }
          />
        </div>
      ))}

      <div className="w-[95%] ml-auto mr-auto flex flex-row justify-end mt-8">
        <button
          className="h-[40px] rounded border-[1px] border-black bg-foreground pl-6 pr-6 font-bold"
          onClick={() => {
            setEnvs(oldEnvs);
          }}
        >
          Cancel
        </button>
        <button
          className="h-[40px] rounded border-2 border-primary bg-primary ml-2 text-foreground pl-6 pr-6 font-bold"
          onClick={() => setEnvs((envs) => [...envs, { env: "", value: "" }])}
        >
          Add
        </button>
      </div>
    </div>
  );
};

const EditEnvs: React.FC<EditEnvsProps> = ({ setEditPopup, envs, setEnvs }) => {
  const [tempEnvs, setTempEnvs] = useState(envs);
  return (
    <div
      className="absolute top-0 right-0 h-screen w-[50%] bg-foreground flex flex-col "
      style={{ boxShadow: "-16px 0px 12px 0px #00000014" }}
    >
      <div className="flex flex-row justify-end">
        <Image
          src="/icons/close.svg"
          alt="close"
          width={20}
          height={20}
          className="mr-4 mt-4"
          onClick={() => {
            setEditPopup(false);
            setEnvs(tempEnvs);
          }}
        />
      </div>
      {tempEnvs.length === 0 ? (
        <UploadFileEnvs envs={tempEnvs} setEnvs={setTempEnvs} oldEnvs={envs} />
      ) : (
        <ManualEditEnvs envs={tempEnvs} setEnvs={setTempEnvs} oldEnvs={envs} />
      )}
    </div>
  );
};

export default EditEnvs;
