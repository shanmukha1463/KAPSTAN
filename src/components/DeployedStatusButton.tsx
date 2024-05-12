export enum DeployedStatusButton {
  "Successful",
  "In Progress",
  "Failed",
}

interface DeployedStatusButtonProps {
  status: DeployedStatusButton;
  text?: string;
}

const DeployedStatusButtonComponent: React.FC<DeployedStatusButtonProps> = ({
  status,
  text,
}) => {
  const getcolor: (operand1: DeployedStatusButton) => string = (x) => {
    switch (x) {
      case DeployedStatusButton.Successful:
        return "green";
      case DeployedStatusButton["In Progress"]:
        return "orange";
      case DeployedStatusButton.Failed:
        return "red";
    }
  };
  return (
    <div
      className={`border-[2px] border-${getcolor(status)}-600 bg-${getcolor(
        status
      )}-100 pl-[0.5rem] pr-[0.5rem] justify-start items-center rounded  pt-1 pb-1 inline-flex`}
    >
      <div
        className={`bg-${getcolor(
          status
        )}-600 w-[10px] h-[10px] rounded-full mr-[0.5rem]`}
      ></div>
      <h1
        className={`text-${getcolor(
          status
        )}-600 text-[12px] leading-[18px] font-medium  ${
          text ? "text-[14px] leading-[20px]" : ""
        } `}
      >
        {text ?? DeployedStatusButton[status]}
      </h1>
    </div>
  );
};

export default DeployedStatusButtonComponent;
