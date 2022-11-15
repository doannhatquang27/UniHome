import React, { useCallback, useEffect, useState } from "react";
import IConversation from "../../../../interfaces/UniHouseApiInterfaces/IConversation";
import IHouse from "../../../../interfaces/UniHouseApiInterfaces/IHouse";
import { getConversationListByHouseId } from "../../../../services/conversation-services";
import Answer from "./Answer";
import Question from "./Question";

interface Props {
  house: IHouse;
}

interface ISeparateQnA {
  question: IConversation;
  answer: IConversation | null;
}

const QuestionAndAnswer: React.FC<Props> = ({ house }) => {
  const [listOfSeparateQnA, setListOfSeparateQnA] = useState<ISeparateQnA[]>(
    []
  );

  const separateQnA = (list: IConversation[]) => {
    const questionList = list.filter((item) => item.parentId === undefined);
    const answerList = list.filter((item) => item.parentId !== undefined);
    let tempListOfSeparareQnA: ISeparateQnA[] = [];
    questionList.forEach((question) => {
      const relativeAnswer = answerList.find(
        (answer) => answer.parentId === question.conversationId
      );
      tempListOfSeparareQnA.push({
        question,
        answer: relativeAnswer ? relativeAnswer : null,
      });
    });
    setListOfSeparateQnA(tempListOfSeparareQnA);
  };

  const getListOfQnA = useCallback(async () => {
    const result = await getConversationListByHouseId(house.houseId);
    if (result) {
      separateQnA(result);
    } else {
      separateQnA([]);
    }
  }, [house]);

  const reloadConversationList = () => {
    getListOfQnA();
  };

  useEffect(() => {
    getListOfQnA();
  }, [getListOfQnA]);

  return (
    <div style={{ marginLeft: 25 }}>
      {listOfSeparateQnA.map((item, index) => (
        <React.Fragment key={index}>
          <Question
            key={index}
            house={house}
            conversation={item.question}
            reloadConversationList={reloadConversationList}
          />
          {item.answer ? <Answer qna={item.answer} /> : null}
        </React.Fragment>
      ))}
    </div>
  );
};

export default QuestionAndAnswer;
