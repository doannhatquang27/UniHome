import { AxiosError } from "axios";
import PostConversationDTO from "../dtos/conversationDto/PostConversationDTO";
import IConversation from "../interfaces/UniHouseApiInterfaces/IConversation";
import axiosInstance from "./axios-instance";

export const getConversationListByHouseId = async (houseId: string) => {
  const url = `/houses/${houseId}/conversations`;
  let result: IConversation[] = [];
  await axiosInstance
    .get(url)
    .then((response) => {
      result = response.data as IConversation[];
    })
    .catch((error: AxiosError) => console.error(error.response));
  return result;
};

export const postQuestionOrAnswerAPI = async (
  newQuestionOrAnswerDTO: PostConversationDTO,
  accessToken: string | null
) => {
  const url = "/conversations";
  let result = false;
  await axiosInstance
    .post(url, newQuestionOrAnswerDTO, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then(() => (result = true))
    .catch((error) => console.error(error));
  return result;
};
