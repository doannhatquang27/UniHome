import {
  GenerateMomoPaymentQrCode,
  GenerateMomoPaymentQrCodeResponse,
} from "../interfaces/PaymentInformation";
import IPaymentCreateRequest from "../interfaces/UniHouseApiInterfaces/IPaymentCreateRequest";
import IPaymentRes from "../interfaces/UniHouseApiInterfaces/IPaymentRes";
import axiosInstance from "./axios-instance";

export const createPaymentAPI = async (
  data: IPaymentCreateRequest,
  accessToken: string
) => {
  const url = "/payments";
  let result: IPaymentRes | undefined;
  await axiosInstance
    .post(url, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => (result = res.data as IPaymentRes))
    .catch((error) => console.error(error));
  return result;
};

export const generateMomoPaymentQrCode = async (
  data: GenerateMomoPaymentQrCode,
  accessToken: string
) => {
  const url = "/third-parties/momo";
  let result: GenerateMomoPaymentQrCodeResponse | undefined;
  await axiosInstance
    .post(url, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => (result = res.data as GenerateMomoPaymentQrCodeResponse))
    .catch((err) => console.error(err));
  return result;
};

export const addTransactionForUpdatePayment = async (
  tptransId: string,
  status: number,
  paymentId: string,
  accessToken: string
) => {
  const url = `/payments/${paymentId}/transaction`;
  let result = false;
  const data = {
    tptransId,
    status,
  };
  await axiosInstance
    .post(url, data, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then((_) => (result = true))
    .catch((err) => console.error(err));
  return result;
};
