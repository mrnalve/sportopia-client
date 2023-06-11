import React, { useState, useEffect, useContext } from "react";
import { Circles } from "react-loader-spinner";
import { AuthContext } from "../../../../Authentication/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Slide } from "react-awesome-reveal";

const PaymentHistory = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const {
      data: paymentHistory = [],
      refetch,
      loading: isLoading,
    } = useQuery({
      queryKey: ["selectedClasses", user?.email],
      enabled: !loading,
      queryFn: async () => {
        const response = await axiosSecure.get(
          `/paymentHistory?email=${user?.email}`
        );
        return response.data;
      },
    });
    if (isLoading)
      return (
        <Circles
          height="80"
          width="80"
          color="#66FCF1"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      );

  return (
    <Slide direction="left">
      <div className="container mx-auto p-4">
     <h2 className="text-3xl font-semibold text-white mb-6 text-left">
        <span className="text-[#45A29E]">Payment </span> History
      </h2>
      {paymentHistory.length === 0 ? (
        <p className="text-gray-500">No payment history available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paymentHistory.map((payment) => (
            <div
              key={payment._id}
              className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold mb-2 text-gray-800">
                  {payment.className}
                </h2>
                <p className="text-gray-600">
                  Transaction ID: {payment.TransactionId}
                </p>
                <p className="text-gray-600">Price: ${payment.price}</p>
              </div>
              <div className="mt-4">
                <p className="text-gray-500 text-sm">{payment.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </Slide>
  );
};

export default PaymentHistory;
