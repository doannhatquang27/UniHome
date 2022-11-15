import React, { useEffect, useState } from "react";
import { getIconTextFromCode } from "../../../../../../constants/facility-service-icons";
import IRentService from "../../../../../../interfaces/UniHouseApiInterfaces/IRentService";


interface Props {
  service: IRentService;
}
const ServiceIcon: React.FC<Props> = ({ service }) => {
  const [iconCode, setIconCode] = useState<string>();
  const [iconText, setIconText] = useState<string>();

  useEffect(() => {
    const iconCode = service.service?.icon;
    const iconText = iconCode
      ? getIconTextFromCode(iconCode)
      : getIconTextFromCode("default");
    setIconCode(iconCode!);
    setIconText(iconText!);
  });
  return (
    <div className="icon">
      <span className={`lab ${iconText}`} style={{ fontSize: 32 }}></span>
      <span>{service.service?.name}</span>
    </div>
  );
};

export default ServiceIcon;
