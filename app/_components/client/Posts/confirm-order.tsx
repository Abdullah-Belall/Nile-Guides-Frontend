"use client";
import PaymentForm from "@/app/_components/client/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
const stripePromise = loadStripe(
  `pk_test_51QNlFcRrwPdPHRsE7m10h98O58OxyPEJ43HPsjM6kX8wFNVx6Xj62ph1rOCQQn2SU3BEOsbTdUWht9AdMpXt912t00uteZDACO`
);
export default function ConfirmOrderComponent({ params }: any) {
  const [data, setdata] = useState<any>();

  useEffect(() => {
    const handleWrap = async () => {
      const params_ = await params;
      const data = params_?.details.split("faselhere");
      setdata(data);
    };
    handleWrap();
  }, []);
  if (data) {
    const orderId = data[0];
    const price = data[1];
    const clientSecret = data[2];

    return (
      <div>
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
            <PaymentForm clientSecret={clientSecret} price={price} orderId={orderId} />
          </Elements>
        )}
      </div>
    );
  }
  return <h1>Loading...</h1>;
}
