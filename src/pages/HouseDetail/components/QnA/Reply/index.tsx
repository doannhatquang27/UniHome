import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { COLORS } from "../../../../../constants/color";
import "./index.scss";

interface Props {
  isDisplay: boolean;
  handleClose: () => void;
  handleSubmit: (content: string) => void;
}

const Reply: React.FC<Props> = ({ isDisplay, handleClose, handleSubmit }) => {
  const [replyValue, setReplyValue] = useState("");

  const handleOnChangeReplyContent = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReplyValue(event.target.value);
  };

  const onSubmit = () => {
    handleSubmit(replyValue);
    setReplyValue("");
  };

  return (
    <div
      className="reply-section"
      style={{ display: isDisplay ? "block" : "none" }}
    >
      <TextField
        value={replyValue}
        onChange={handleOnChangeReplyContent}
        variant="outlined"
        minRows={4}
        hiddenLabel
        multiline
        className="reply-section_text-area"
      />
      <div className="reply-section_button-group">
        <Button
          variant="contained"
          size="small"
          disableElevation
          className="reply-section_button reply-section_button--cancel"
          onClick={handleClose}
        >
          Hủy
        </Button>
        <Button
          variant="contained"
          size="small"
          disableElevation
          onClick={onSubmit}
          className="reply-section_button reply-section_button--submit"
          style={{ backgroundColor: COLORS.appMainColor }}
        >
          Trả lời
        </Button>
      </div>
    </div>
  );
};

export default Reply;
