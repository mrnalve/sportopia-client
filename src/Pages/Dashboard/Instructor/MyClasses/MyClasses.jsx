import React, { useContext } from "react";
import { AuthContext } from "../../../../Authentication/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Circles } from "react-loader-spinner";
import FeedbackCard from "../FeedbackCard/FeedbackCard";

const MyClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    data: myClasses = [],
    refetch,
    loading: isLoading,
  } = useQuery({
    queryKey: ["myClasses", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(`/myClasses?email=${user?.email}`);
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

  // get feedback data
  const { data: feedback = [] } = useQuery({
    queryKey: ["feedback", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/getFeedback?email=${user?.email}`
      );
      return response.data;
    },
  });
  console.log(feedback);
  return (
    <div className="w-full px-4">
      <h3 className="text-3xl font-semibold my-2 text-center text-white">
        Total Classes: {myClasses?.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-11/12 m-auto rounded-xl">
          <thead>
            <tr className="bg-gray-800 text-white text-center">
              <th className="p-4">ID</th>
              <th className="p-4">Class Name</th>
              <th className="p-4">Available Seats</th>
              <th className="p-4">Enrolled Student</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {myClasses?.map((item, index) => (
              <tr key={item._id} className={"bg-gray-100 pl-4 text-center"}>
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{item?.className}</td>
                <td className="p-4">{item?.availableSeats}</td>
                <td className="p-4">{item?.enrolledStudents}</td>
                <td className="p-4">
                  <button
                    className={` btn-sm rounded-lg text-white ${
                      item?.status === "denied" && "bg-[#d12b25]"
                    } ${item?.status === "pending" && "bg-[#22cde4]"} ${
                      item?.status === "approve" && "bg-[#3dab45]"
                    }`}
                  >
                    {item?.status}
                  </button>
                </td>
                <td className="p-4">
                  <button className="btn btn-ghost btn-sm hover:bg-[#26dfd3] bg-gradient-to-r from-[#232630] to-[#45A29E] text-white">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border min-h-[200px] rounded-md my-3">
      <h3 className="text-3xl font-semibold my-2 text-center text-white">
        Feedback(From Admin Panel)
      </h3>
      {feedback && feedback.map(feedbackItem => <FeedbackCard feedbackItem={feedbackItem}></FeedbackCard>)}
      </div>
    </div>
  );
};

export default MyClasses;
