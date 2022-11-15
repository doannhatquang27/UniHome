import { DialogProps, IconButton } from "@material-ui/core";
import React from "react";
import IAppointment from "../../../../../../interfaces/UniHouseApiInterfaces/IAppointment";
import CancelDialog from "../CancelDialog";

interface Props {
  handleClickOpen: (scrollType: DialogProps["scroll"]) => void;
  handleClose: () => void;
  open: boolean;
  scroll: string | undefined;
  appointment: IAppointment;
  appointmentList: IAppointment[];
  setAppointmentList: any;
}

const AbsoluteCancelButton: React.FC<Props> = ({
  appointment,
  appointmentList,
  handleClickOpen,
  handleClose,
  open,
  scroll,
  setAppointmentList,
}) => {
  return (
    <React.Fragment>
      <IconButton
        aria-label="previous"
        size="small"
        style={{
          float: "right",
          backgroundColor: "rgb(255, 68, 72)",
          position: "absolute",
          right: 8,
        }}
        onClick={() => handleClickOpen("paper")}
      >
        <i
          className="la la-remove"
          style={{ fontSize: "16px", color: "white" }}
        ></i>
      </IconButton>
      <CancelDialog
        open={open}
        handleClose={handleClose}
        scroll={scroll}
        appointmentId={appointment.appointmentId}
        appointmentList={appointmentList}
        setAppointmentList={setAppointmentList}
      ></CancelDialog>
    </React.Fragment>
  );
};

export default AbsoluteCancelButton;
