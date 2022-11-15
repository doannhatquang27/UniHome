import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import React from "react";

const ConfirmationBox = ({
  title,
  content,
  confirm,
  cancel,
  open,
  onSave,
  handleClose,
}: {
  title: any;
  content: any;
  confirm: any;
  cancel: any;
  open:any;
  onSave: any;
  handleClose: any;
}) => {
 

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          {cancel}
        </Button>
        <Button onClick={onSave} color="primary">
          {confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationBox;
