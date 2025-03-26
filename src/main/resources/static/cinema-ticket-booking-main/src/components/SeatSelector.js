import React, { useEffect, useState } from "react";
import { getSeats } from "..api//movieApi";

const SeatSelector = ({ movieId }) => {
    console.log(movieId)
  const [seats, setSeats] = useState([]);
  console.log(seats)

  useEffect(() => {
    getSeats(movieId)
      .then((response) => {
        setSeats(response.data))
        console.log(response.data)
      }
      .catch((error) => console.error("Error fetching seats:", error));
  }, [movieId]);

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="grid grid-cols-10 gap-3">
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`w-10 h-10 flex items-center justify-center text-white font-bold rounded-md cursor-pointer
                            ${
                              seat.booked
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gray-600 hover:bg-gray-800"
                            } `}
            onClick={() => console.log("Seat selected:", seat.id)}
          >
            {seat.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatSelector;
