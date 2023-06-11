import React from "react";

const FeedbackCard = ({feedbackItem}) => {
  return (
    <div> 
      <div className=" bg-[#0B0C10] rounded-lg shadow-lg p-4 w-4/5 m-auto my-4">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0">
          <img
            src={feedbackItem.itemImage}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="ml-2">
          <h4 className="text-lg font-semibold text-white">{feedbackItem.className}</h4>
        </div>
      </div>
      <h2 className="text-white text-xl font-bold">{feedbackItem.feedbackTitle}</h2>
      <p className="text-gray-300">{feedbackItem.feedbackText}</p>
    </div>
    </div>
  );
};

export default FeedbackCard;
