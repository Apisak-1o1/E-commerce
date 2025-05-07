/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import useEcomStore from "../../store/ecom-store";
import CheckoutForm from "../../components/CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const token = useEcomStore((s) => s.token);
  const [clientSecret, setClientSecret] = useState("");
  
  useEffect(() => {
    payment(token)
    .then((res) => {
      setClientSecret(res.data.clientSecret);
      console.log("🚀 ~ stripePromise:", stripePromise)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const loader = "auto";

  return (
    <div>
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;