import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: "https://stg-api.unihome.vn/api",
});

export const writeLogAndReturnErrorMsg = (error: AxiosError) => {
  let errorMessage = "Có lỗi xảy ra";
  if (error.response) {
    console.error(error.response);
    if (error.response.data && typeof error.response.data === "string") {
      errorMessage = error.response.data;
    }
  } else {
    console.error(error);
  }
  return errorMessage;
};

export default instance;
