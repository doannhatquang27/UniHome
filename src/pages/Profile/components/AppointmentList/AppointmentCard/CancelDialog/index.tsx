import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { AbortAppointmentDto } from "../../../../../../dtos/appointmentDtos/AbortAppointmentDto";
import IAppointment, {
  AppointmentStatusEnum,
} from "../../../../../../interfaces/UniHouseApiInterfaces/IAppointment";
import { abortAppointmentAPI } from "../../../../../../services/appointment-services";

const CancelDialog = ({
  open,
  handleClose,
  scroll,
  appointmentId,
  appointmentList,
  setAppointmentList,
}: {
  open: boolean;
  handleClose: any;
  scroll: any;
  appointmentId: string;
  appointmentList: IAppointment[];
  setAppointmentList: any;
}) => {
  const { accessToken } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  const [isShow, setIsShow] = React.useState(false);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = (event.target as HTMLInputElement).value;
    setValue(selected);
    setHelperText("");
    setError(false);
    if (selected === "Khác") {
      setIsShow(true);
      setReason("");
    } else {
      setReason(selected);
      setIsShow(false);
    }
  };

  const onInputReason = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value);
  };

  const rejectAppointment = async () => {
    if (accessToken) {
      const data: AbortAppointmentDto = {
        appointmentId,
        abortReason: reason,
        status: AppointmentStatusEnum.Aborted_Renter,
      };
      const result = await abortAppointmentAPI(data, accessToken);
      if (result) {
        enqueueSnackbar("Hủy hẹn thành công", {
          variant: "success",
          transitionDuration: { enter: 400, exit: 200 },
        });
        const list = appointmentList.filter(
          (appointment) => appointment.appointmentId !== appointmentId
        );
        setAppointmentList(list);
      } else {
        enqueueSnackbar("Hủy hẹn không thành công", {
          variant: "error",
          transitionDuration: { enter: 400, exit: 200 },
        });
      }
    } else {
      enqueueSnackbar("Xảy ra lỗi, vui lòng thử lại", {
        variant: "error",
        transitionDuration: { enter: 400, exit: 200 },
      });
    }
  };

  const validate = () => {
    switch (value) {
      case "":
        setHelperText("Bạn chưa chọn lý do");
        setError(true);
        return true;
      case "Khác":
        if (reason === "") {
          setHelperText("Vui lòng nhập lý do");
          setError(true);
          return true;
        } else {
          setHelperText("");
          setError(false);
          return false;
        }
      default:
        setError(false);
        return false;
    }
  };

  const handleSubmit = () => {
    const isValidated = validate();
    if (!isValidated) {
      rejectAppointment();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        <IconButton
          aria-label="previous"
          size="small"
          style={{
            float: "right",
            backgroundColor: "rgb(255, 68, 72)",
          }}
          onClick={handleClose}
        >
          <i
            className="la la-remove"
            style={{ fontSize: "16px", color: "white" }}
          ></i>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <FormControl component="fieldset" error={error}>
          <RadioGroup value={value} onChange={handleRadioChange}>
            <FormControlLabel
              value="Tôi có việc bận"
              control={<Radio />}
              label="Tôi có công việc bận"
            />
            <FormControlLabel
              value="Thời gian không phù hợp"
              control={<Radio />}
              label="Thời gian không phù hợp"
            />
            <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
          </RadioGroup>
          {isShow ? (
            <TextField
              error={error}
              multiline
              variant="outlined"
              name="reason"
              onChange={onInputReason}
            ></TextField>
          ) : null}
          {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
          <Button
            type="submit"
            variant="contained"
            style={{
              color: "white",
              backgroundColor: "#f44336",
              marginTop: "3%",
            }}
            onClick={handleSubmit}
          >
            Hủy cuộc hẹn
          </Button>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default CancelDialog;
