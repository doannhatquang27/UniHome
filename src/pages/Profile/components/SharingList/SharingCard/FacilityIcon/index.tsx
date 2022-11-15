import React, { useEffect, useState } from "react";
import { getIconTextFromCode } from "../../../../../../constants/facility-service-icons";
import IRentFacility from "../../../../../../interfaces/UniHouseApiInterfaces/IRentFacility";
interface Props {
  facility: IRentFacility;
}
const FacilityIcon: React.FC<Props> = ({ facility }) => {
  const [iconCode, setIconCode] = useState<string>();
  const [iconText, setIconText] = useState<string>();

  useEffect(() => {
    const iconCode = facility.facility?.icon;
    const iconText = iconCode
      ? getIconTextFromCode(iconCode)
      : getIconTextFromCode("default");
    setIconCode(iconCode!);
    setIconText(iconText!);
  }, []);
  return (
    <div className="icon">
      <span className={`lab ${iconText}`} style={{ fontSize: 32 }}></span>
      <span>{facility.facility?.name}</span>
    </div>
  );
};

export default FacilityIcon;
