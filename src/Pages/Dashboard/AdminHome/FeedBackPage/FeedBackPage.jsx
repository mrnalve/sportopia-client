import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const FeedbackPage = () => {
  const location = useLocation();
  const [axiosSecure] = useAxiosSecure();
  const queryParams = new URLSearchParams(location.search);
  const itemString = queryParams.get("classes");
  const item = JSON.parse(atob(itemString));
  //   console.log(item);

  const handleFeedbackSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const feedbackTitle = form.feedbackTitle.value;
    const feedbackText = form.feedback.value;
    const feedback = {
      feedbackTitle,
      feedbackText,
      classId: item._id,
      instructorName: item.instructorName,
      instructorEmail: item.email,
      className: item.className,
      itemImage: item.image
    };
    axiosSecure.post("/feedback", feedback).then((data) => {
      if (data.data.insertedId) {
        toast.success("Feedback Submitted");
        form.reset();
      }
    });
  };

  return (
    <div className="bg-gradient-to-r from-[#0B0C10] to-[#616161] rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-semibold text-[#45A29E] mb-6">
        Send Feedback
      </h2>
      <form onSubmit={handleFeedbackSubmit}>
        <input
          type="text"
          name="feedbackTitle"
          className="w-full px-4 py-2 mb-4 rounded-md text-black"
          placeholder="Feedback Title"
          required
        />
        <textarea
          name="feedback"
          className="w-full h-32 px-4 py-2 mb-4 rounded-md text-black"
          placeholder="Feedback Message"
          required
        ></textarea>
        <button className="bg-[#232630] border border-[#45A29E] px-4 py-2 rounded-md text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackPage;
