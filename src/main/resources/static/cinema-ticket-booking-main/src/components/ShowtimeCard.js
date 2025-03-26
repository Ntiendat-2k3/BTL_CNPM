import React from "react";

const ShowtimeCard = ({ showtime }) => {
  return (
    <div className="p-4 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-700 transform transition duration-300">
      <p>
        Room {showtime.idroom} | Time: {showtime.time}
      </p>
    </div>
  );
};

export default ShowtimeCard;
