"use client";
import { Application } from "@/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  activeApplication: number;
  setActiveApplication: React.Dispatch<React.SetStateAction<number>>;
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeApplication, setActiveApplication] = useState<number>(0);

  const [applications, setApplications] = useState<Application[]>([]);

  return (
    <AppContext.Provider
      value={{
        activeApplication,
        setActiveApplication,
        applications,
        setApplications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
