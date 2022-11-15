import { Button, TextField } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { COLORS } from "../../../../constants/color";
import { AuthContext } from "../../../../contexts/AuthContext";
import PostConversationDTO from "../../../../dtos/conversationDto/PostConversationDTO";
import IHouse from "../../../../interfaces/UniHouseApiInterfaces/IHouse";
import { postQuestionOrAnswerAPI } from "../../../../services/conversation-services";
import QuestionAndAnswer from "../QnA";
import LoginButton from "./components/LoginButton";
import "./index.scss";

interface Props {
  house: IHouse;
}

const QuestionSection: React.FC<Props> = ({ house }) => {
  const { currentUser, accessToken } = useContext(AuthContext);
  const [questionContent, setQuestionContent] = useState("");
  const [render, setRender] = useState(0);

  useEffect(() => {
    setQuestionContent("");
  }, [house]);

  const handleOnChangeQuestionContent = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target.value.length <= 200) {
      setQuestionContent(event.target.value);
    }
  };

  const handleSubmitQuestion = async () => {
    if (currentUser) {
      const data: PostConversationDTO = {
        content: questionContent,
        houseId: house.houseId,
        userId: currentUser.userId,
      };
      const result = await postQuestionOrAnswerAPI(data, accessToken);
      if (result) {
        setRender(render + 1);
        setQuestionContent("");
      }
    }
  };

  const renderAnnouncement = () => {
    return (
      <div className="annoucement">
        <span style={{ flex: 1 }}>Đăng nhập hoặc đăng ký để đặt câu hỏi</span>
        <LoginButton />
        <Button
          variant="text"
          style={{ color: COLORS.appMainColor }}
          className="annoucement_button"
        >
          Đăng ký
        </Button>
      </div>
    );
  };

  const renderPostQuestionForm = () => {
    return (
      <div>
        <TextField
          variant="outlined"
          minRows={3}
          hiddenLabel
          multiline
          value={questionContent}
          onChange={handleOnChangeQuestionContent}
          className="question-section_text-field"
          placeholder="Tối đa 200 ký tự"
        />
        <div className="question-section_submit-button-area">
          <Button
            variant="contained"
            onClick={handleSubmitQuestion}
            style={{ backgroundColor: COLORS.appMainColor, color: "white" }}
            className="question-section_button"
            disabled={questionContent.trim() === ""}
            classes={{
              disabled: "question-section_submit-button-area--disable",
            }}
          >
            Gửi
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="question-section" key={render}>
      <span className="title">Hỏi đáp</span>
      <div>
        {/* Render login or signup requirement */}
        {!currentUser && renderAnnouncement()}

        {/* Render question form if current user is not house owner  */}
        {currentUser &&
          house.ownerId !== currentUser.userId &&
          renderPostQuestionForm()}

        {/* Question and Answer */}
        <div className="question-section_qna">
          <QuestionAndAnswer house={house} />
        </div>
      </div>
    </div>
  );
};

export default QuestionSection;
