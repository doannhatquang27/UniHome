import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { FC, useContext } from "react";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { deleteHouseAPI } from "../../../../../../services/house-services";

interface Props {
  open: boolean;
  handleClose: () => void;
  scroll: any;
  houseId: string;
}

const CancelDialog: FC<Props> = ({ open, scroll, houseId, handleClose }) => {
  const { accessToken } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleApprove = async () => {
    if (accessToken) {
      const result = await deleteHouseAPI(houseId, accessToken);
      if (result) {
        enqueueSnackbar("Xóa bài thành công", {
          variant: "success",
          transitionDuration: { enter: 400, exit: 200 },
        });
      } else {
        enqueueSnackbar("Xóa bài thất bại", {
          variant: "error",
          transitionDuration: { enter: 400, exit: 200 },
        });
      }
    } else {
      enqueueSnackbar("Đăng nhập lại để thực hiện", {
        variant: "error",
        transitionDuration: { enter: 400, exit: 200 },
      });
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Hủy bài đăng</DialogTitle>
      <DialogContent dividers>
        Bài đăng của bạn sẽ bị xóa vĩnh viễn. Bạn chắc chắn rằng bạn muốn xóa
        bài đăng này chứ?
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          variant="outlined"
          style={{
            color: "#f44336",
          }}
          onClick={handleClose}
        >
          Hủy bỏ
        </Button>
        <Button
          type="submit"
          variant="contained"
          style={{
            color: "white",
            backgroundColor: "#f44336",
            float: "right",
          }}
          onClick={handleApprove}
        >
          Xóa bài
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelDialog;
