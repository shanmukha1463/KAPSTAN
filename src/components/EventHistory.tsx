"use client";
import { getEventHistory } from "@/actions";
import { eventHistoryMetric } from "@/types";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import DeployedStatusButtonComponent, {
  DeployedStatusButton,
} from "./DeployedStatusButton";
import { useAppContext } from "@/contexts";

const TimestampComponent = ({ timestamp }: { timestamp: string }) => {
  const date = new Date(Number(timestamp) * 1000);
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });

  return <p className="text-[12px] leading-[18px] text-[#A5A5A5]">{timeAgo}</p>;
};

const EventHistory: React.FC = () => {
  const { applications, activeApplication } = useAppContext();
  const fetchEventHistory: () => void = async () => {
    try {
      const eventHistory = await getEventHistory();
      setEvents(eventHistory);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEventHistory();
  }, []);

  const [events, setEvents] = useState<eventHistoryMetric[]>([]);

  return (
    <div className="w-full lg:w-[49%] h-[400px] bg-foreground rounded flex flex-col">
      <div className="font-bold text-[16px] leading-[24px] text-[#595959] mt-4 pl-4">
        Event History
      </div>
      <div className="flex flex-row font-bold mt-4">
        {["Event", "Version", "Status"].map((item, index) => (
          <p className="w-[33%] pl-14 text-[14px] leading-[20px]" key={index}>
            {item}
          </p>
        ))}
      </div>

      {events
        .filter((event) => {
          return (
            event.applicationId === String(applications[activeApplication]?.id)
          );
        })
        .slice(0, 4)
        .map((event) => (
          <div
            key={event.id}
            className="flex flex-row justify-between items-center mt-4 mb-4"
          >
            <div className="w-[33%] pl-14 text-[14px] leading-[20px]">
              {event.event}
              <TimestampComponent timestamp={event.timestamp} />
            </div>
            <div className="w-[33%] pl-14 text-[14px] leading-[20px]">
              {event.version}
            </div>
            <div className="w-[33%] pl-14 text-[14px] leading-[20px]">
              <DeployedStatusButtonComponent
                status={
                  event.status === "successful"
                    ? DeployedStatusButton.Successful
                    : event.status === "failed"
                    ? DeployedStatusButton.Failed
                    : DeployedStatusButton["In Progress"]
                }
              />
            </div>
          </div>
        ))}
      {events?.length > 4 && (
        <div className="pl-14 text-[#6E27D5] text-[14px] leading-[20px]  underline">
          View more
        </div>
      )}
    </div>
  );
};

export default EventHistory;
