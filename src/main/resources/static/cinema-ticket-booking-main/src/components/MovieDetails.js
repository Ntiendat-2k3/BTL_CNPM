import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  buyTickets,
  getMovieDetails,
  getSeats,
  getShowtimes,
} from "../api/movieApi";

const MovieDetails = () => {
  const { id } = useParams(); // Lấy id phim từ URL params
  const [movie, setMovie] = useState(null); // Thông tin phim
  const [showtimes, setShowtimes] = useState([]); // Danh sách suất chiếu
  console.log("🚀 ~ MovieDetails ~ showtimes:", showtimes);
  const [seats, setSeats] = useState([]); // Danh sách ghế
  const [selectedSeats, setSelectedSeats] = useState([]); // Ghế đã chọn
  const [loading, setLoading] = useState(true);

  // Lấy thông tin phim khi component mount hoặc id thay đổi
  useEffect(() => {
    setLoading(true);
    getMovieDetails(id)
      .then((data) => {
      console.log(data)
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy chi tiết phim:", error);
        setLoading(false);
      });
  }, [id]);

  // Lấy danh sách suất chiếu cho phim
  useEffect(() => {
    if (!id) return;

    // Lọc showtimes để lấy đúng suất chiếu cho phim với id
    getShowtimes(id)
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data);
        const filteredShowtimes = data.filter(
          (showtime) => showtime.idmovie === parseInt(id)
        );
        console.log("🚀 ~ .then ~ filteredShowtimes:", filteredShowtimes);
        setShowtimes(filteredShowtimes);
      })
      .catch((error) => console.error("Lỗi khi lấy suất chiếu:", error));
  }, [id]);

  // Load ghế cho một suất chiếu
  const loadSeats = (showtimeId) => {
    getSeats(showtimeId)
      .then((data) => setSeats(data))
      .catch((error) => console.error("Lỗi khi lấy ghế:", error));
  };

  // Xử lý chọn ghế
  const handleSeatSelection = (seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat)) {
        return prevSelectedSeats.filter((s) => s !== seat);
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  };

  // Xử lý thanh toán
  const handlePayment = () => {
    const selectedSeatsData = selectedSeats.map((seat) => ({
      seatId: seat.id,
      movieId: movie.id,
      showtimeId: seat.showtimeId,
    }));

    buyTickets(selectedSeatsData)
      .then((data) => alert(data.message || "Thanh toán thành công!"))
      .catch((error) => {
        console.error("Lỗi trong quá trình thanh toán:", error);
        alert("Lỗi trong quá trình thanh toán. Vui lòng thử lại.");
      });
  };

  if (loading) {
    return <div className="text-center">Đang tải chi tiết phim...</div>;
  }

  return (
    <div className="container mt-5">
      {/* Movie Info Section */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={movie?.imageUrl}
          alt={movie?.title}
          className="w-full md:w-1/2 rounded-xl object-cover mb-4"
        />
        <h2 className="text-3xl font-semibold text-center">{movie?.title}</h2>
        <p className="text-xl text-gray-700 mt-2">{movie?.genre}</p>
        <p className="text-lg text-gray-500">
          Release Year: {movie?.releaseYear}
        </p>
      </div>

      {/* Showtime Selection */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-4">Chọn suất chiếu</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {showtimes.map((showtime) => (
            <button
              key={showtime.id}
              onClick={() => loadSeats(showtime.id)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              {showtime.time}
            </button>
          ))}
        </div>
      </div>

      {/* Seat Selection */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-4">Chọn ghế</h3>
        <div className="grid grid-cols-5 gap-3">
          {seats.map((seat) => (
            <button
              key={seat.id}
              className={`p-4 rounded-md ${
                selectedSeats.includes(seat)
                  ? "bg-green-500"
                  : seat.status === "booked"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500"
              }`}
              disabled={seat.status === "booked"}
              onClick={() => handleSeatSelection(seat)}
            >
              {seat.row}
              {seat.number}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Seats and Payment Button */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold">Ghế đã chọn: </h4>
        <p className="text-lg text-green-600">{selectedSeats.join(", ")}</p>
        <p className="text-xl font-semibold mt-2">
          Tổng tiền: {selectedSeats.length * 70000} VND
        </p>
        <button
          onClick={handlePayment}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-800 mt-4"
        >
          Tiến hành thanh toán
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
