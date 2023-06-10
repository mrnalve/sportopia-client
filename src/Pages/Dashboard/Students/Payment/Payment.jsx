import React from "react";

const Payment = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Payment Page</h1>

      {/* Payment Form */}
      <form id="payment-form" className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="card-holder-name" className="block font-medium">
            Cardholder Name
          </label>
          <input
            type="text"
            id="card-holder-name"
            className="input-field"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="card-element" className="block font-medium">
            Card Details
          </label>
          <div id="card-element" className="stripe-element"></div>
          <div id="card-errors" className="text-red-500"></div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end">
          <button
            id="submit-payment"
            className="btn bg-[#EF476F] hover:bg-[#b01237] text-white px-4 py-2 rounded-lg mb-4 sm:mb-0"
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
