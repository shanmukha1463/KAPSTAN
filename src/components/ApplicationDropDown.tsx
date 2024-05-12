"use client";

import { fetchApplications } from "@/actions";
import { DropDown } from "@/components/clientComponents/DropDown";
import { Application } from "@/types";
import React, { useEffect } from "react";
import { useAppContext } from "@/contexts";

const DropDownPage: React.FC = () => {
  const { setApplications } = useAppContext();

  useEffect(() => {
    fetchApplications().then((applications: Application[]) =>
      setApplications(applications)
    );
  }, [setApplications]);
  return <DropDown />;
};

export default DropDownPage;
