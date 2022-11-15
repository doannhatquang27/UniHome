import dotenv from "dotenv";
import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import AppBar from "../../../components/AppBar";
import { AuthContext } from "../../../contexts/AuthContext";
import { GenerateConfirmPaymentSignature } from "../../../interfaces/PaymentInformation";
import "./index.scss";
dotenv.config();

const AccessKey = process.env.REACT_APP_MOMO_ACCESS_KEY;
const PartnerCode = process.env.REACT_APP_MOMO_PARTNER_CODE;

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const PaymentSuccess = () => {
  const { accessToken } = useContext(AuthContext);
  let query = useQuery();
  let history = useHistory();

  const partnerCode = query.get("partnerCode");
  const orderId = query.get("orderId");
  const requestId = query.get("requestId");
  const amount = query.get("amount");
  const orderInfo = query.get("orderInfo");
  const orderType = query.get("orderType"); //momo_wallet
  const transId = query.get("transId");
  const resultCode = query.get("resultCode"); //0
  const message = query.get("message"); //Successful.
  const payType = query.get("payType"); //qr
  const responseTime = query.get("responseTime");
  const extraData = query.get("extraData"); //String.empty
  const signature = query.get("signature");

  useEffect(() => {
    if (
      AccessKey &&
      PartnerCode &&
      amount &&
      extraData &&
      message &&
      orderId &&
      orderInfo &&
      orderType &&
      payType &&
      requestId &&
      responseTime &&
      resultCode &&
      transId &&
      signature &&
      accessToken
    ) {
      const data: GenerateConfirmPaymentSignature = {
        accessKey: AccessKey,
        amount: parseInt(amount),
        extraData,
        message,
        orderId,
        orderInfo,
        orderType,
        partnerCode: PartnerCode,
        payType,
        requestId,
        responseTime: parseInt(responseTime),
        resultCode: parseInt(resultCode),
        transId,
      };
      history.replace({
        pathname: `/house-detail/${extraData}`,
        state: { confirmPaymentData: data, signature },
      });
    }
  }, [
    accessToken,
    amount,
    extraData,
    history,
    message,
    orderId,
    orderInfo,
    orderType,
    partnerCode,
    payType,
    requestId,
    responseTime,
    resultCode,
    signature,
    transId,
  ]);

  return (
    <React.Fragment>
      <div className="payment-success">
        <AppBar />
        <div className="waiting-background"></div>
      </div>
    </React.Fragment>
  );
};

export default PaymentSuccess;
