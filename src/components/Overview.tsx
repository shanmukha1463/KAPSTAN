import ServiceInfo from "./ServiceInfo";
import SystemMetrics from "./SystemMetrics";
import EventHistory from "./EventHistory";

const Overview: React.FC = () => {
  return (
    <>
      <ServiceInfo />
      <div className="mt-4 flex flex-row flex-wrap justify-between">
        <SystemMetrics />
        <EventHistory />
      </div>
    </>
  );
};

export default Overview;
