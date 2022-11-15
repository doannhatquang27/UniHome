import { Avatar } from "@material-ui/core";
import React from "react";
import { COLORS } from "../../../../../constants/color";
import IQnA from "../../../../../interfaces/UniHouseApiInterfaces/IConversation";
import {
  convertDateTimeToGMT7,
  countTimeGap,
} from "../../../../../services/utils/datetime";
import "./index.scss";

interface Props {
  qna: IQnA;
}

const Answer: React.FC<Props> = ({ qna }) => {
  function renderTime(dateString: string) {
    const date = convertDateTimeToGMT7(dateString);
    const text = countTimeGap(date);
    return <span className="question_date">{text}</span>;
  }

  return (
    <div className="answer-margin">
      <div style={{ display: "flex" }} className="answer">
        <Avatar
          className="answer_avatar"
          style={{
            backgroundColor: COLORS.appSecondColor,
            color: COLORS.appMainColor,
          }}
          src={qna.userAvatar}
          alt="avatar"
        >
          {qna.fullName![0]}
        </Avatar>
        <div>
          <div>
            <span className="answer_user-name">{qna.fullName}&nbsp; </span>
            {renderTime(qna.time)}
          </div>
          <div className="answer_content">{qna.content}</div>
        </div>
      </div>
    </div>
  );
};

export default Answer;
