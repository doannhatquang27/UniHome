import dotenv from "dotenv";
import {
  GenerateConfirmPaymentSignature,
  GenerateCreatePaymentSignature,
} from "../../interfaces/PaymentInformation";
import { addTransactionForUpdatePayment } from "../payment-services";
dotenv.config();

var CryptoJS = require("crypto-js");

const secretKey = process.env.REACT_APP_MOMO_SECRET_KEY;

export const generateCreatePaymentSignature = (
  data: GenerateCreatePaymentSignature
) => {
  const {
    accessKey,
    amount,
    extraData,
    ipnUrl,
    orderId,
    orderInfo,
    partnerCode,
    redirectUrl,
    requestId,
    requestType,
  } = data;
  const message = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  var hash = CryptoJS.HmacSHA256(message, secretKey!);
  return hash.toString();
};

export const generateConfirmPaymentSignature = (
  data: GenerateConfirmPaymentSignature
) => {
  const {
    accessKey,
    amount,
    extraData,
    message,
    orderId,
    orderInfo,
    orderType,
    partnerCode,
    payType,
    requestId,
    responseTime,
    resultCode,
    transId,
  } = data;
  const sendMessage = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;
  var hash = CryptoJS.HmacSHA256(sendMessage, secretKey!);
  return hash.toString();
};

export const handleConfirmPayment = async (
  data: GenerateConfirmPaymentSignature,
  signature: string,
  accessToken: string
) => {
  const newSignature = generateConfirmPaymentSignature(data);
  let saveDataSuccessfully = false;
  if (newSignature === signature) {
    const saveDataSuccessfully = await addTransactionForUpdatePayment(
      data.transId,
      1,
      data.orderId,
      accessToken
    );
    return saveDataSuccessfully;
  }
  return saveDataSuccessfully;
};
