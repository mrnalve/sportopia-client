import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../Authentication/AuthProvider";
import { Toaster, toast } from "react-hot-toast";

const CheckoutForm = ({ item }) => {
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const price = item?.price;
  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("[PaymentMethod]", paymentMethod);
    }
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError?.message);
    }
    setProcessing(false);
    console.log(paymentIntent);

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const payment = {
        email: user?.email,
        date: new Date(),
        TransactionId: paymentIntent.id,
        price,
        className: item.className,
        image: item.image,
        itemId: item.itemId,
        selectedItemId: item._id,
        sportsCategory: item.sportsCategory,
      };
      axiosSecure
        .post("/payment", payment)
        .then((res) => {
          console.log(res.data);
          toast.success('Payments Successfully!')
        })
        .catch((error) => {
          console.error("Error making payment:", error);
        });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-white mb-6 text-center">
        <span className="text-[#45A29E]">Payment</span> Here
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto border-2 rounded-lg p-10"
      >
        <div className="mb-4 ">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#fff",
                  "::placeholder": {
                    color: "#fff",
                  },
                },
                invalid: {
                  color: "#000",
                },
              },
            }}
          />
        </div>

        <div className="flex justify-center">
          <button
            className="btn bg-gradient-to-r from-[#232630] to-[#45A29E] text-white px-6 py-1 mt-3 rounded-lg"
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </button>
          <Toaster/>
        </div>
      </form>
      {cardError && (
        <p className="text-center text-red-700 text-xl my-4">{cardError}</p>
      )}
      {transactionId && (
        <p className="text-center text-success text-xl my-4">
          Transaction complete with transactionId : {transactionId}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;
