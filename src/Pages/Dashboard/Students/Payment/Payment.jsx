import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const itemString = queryParams.get("item");
  const item = JSON.parse(atob(itemString))
  console.log(item);
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Payment Form */}
      <Elements stripe={stripePromise}>
        <CheckoutForm item={item}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
