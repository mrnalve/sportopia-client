import React from "react";

const FeedbackCard = ({ name, comment }) => {
  return (
    <div className=" bg-[#0B0C10] rounded-lg shadow-lg p-4 w-4/5 m-auto my-4">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0">
          <img
            src="avatar.png"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="ml-2">
          <h4 className="text-lg font-semibold text-white">MD Rubayat</h4>
        </div>
      </div>
      <p className="text-gray-300">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, placeat labore hic blanditiis nostrum impedit autem atque! Vitae architecto facere ipsa non ducimus, sunt dolor praesentium deserunt quibusdam iure veniam.</p>
    </div>
  );
};

export default FeedbackCard;
