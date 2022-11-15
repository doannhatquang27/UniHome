import { Avatar, makeStyles } from "@material-ui/core";
import React from "react";
import { COLORS } from "../../../../../constants/color";
import IConversation from "../../../../../interfaces/UniHouseApiInterfaces/IConversation";
import IHouse from "../../../../../interfaces/UniHouseApiInterfaces/IHouse";
import {
  convertDateTimeToGMT7,
  countTimeGap,
} from "../../../../../services/utils/datetime";
import "./index.scss";

interface Props {
  house: IHouse;
  conversation: IConversation;
  reloadConversationList: () => void;
}

const useStyles = makeStyles({
  button: {
    color: COLORS.appMainColor,
    fontWeight: 600,
    padding: 0,
    minWidth: "unset",
    textTransform: "unset",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  avatarRoot: {
    width: 50,
    height: 50,
  },
});

const Question: React.FC<Props> = ({
  house,
  conversation,
  reloadConversationList,
}) => {
  const classes = useStyles();

  function renderTime(dateString: string) {
    const date = convertDateTimeToGMT7(dateString);
    const text = countTimeGap(date);
    return <span className="question_date">{text}</span>;
  }

  return (
    <div style={{ display: "flex" }} className="question">
      <Avatar
        className="question_avatar"
        style={{
          backgroundColor: COLORS.appSecondColor,
          color: COLORS.appMainColor,
        }}
        src={conversation.userAvatar}
        classes={{ root: classes.avatarRoot }}
        alt="avatar"
      >
        {conversation.fullName![0]}
      </Avatar>
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <div>
          <span className="question_user-name">
            {conversation.fullName}&nbsp;{" "}
          </span>
          {renderTime(conversation.time)}
        </div>
        <div className="question_content">{conversation.content}</div>
      </div>
    </div>
  );
};

export default Question;
