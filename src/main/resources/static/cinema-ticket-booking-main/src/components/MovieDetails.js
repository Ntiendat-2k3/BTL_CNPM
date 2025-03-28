import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  buyTickets,
  getMovieDetails,
  getShowtimes,
  getSeats,
  getSeatDetail,
  getBookedSeats,
} from "../api/movieApi"; // Đảm bảo bạn đã import getBookedSeats từ movieApi
import LoadingHamster from "../utils/LoadingHamster";
import {
  showSuccessNotification,
  showErrorNotification,
  showInfoNotification,
} from "../utils/Notification";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [seatLoading, setSeatLoading] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết phim:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const data = await getShowtimes(id);
        setShowtimes(data);
      } catch (error) {
        console.error("Lỗi khi lấy suất chiếu:", error);
      }
    };
    if (id) fetchShowtimes();
  }, [id]);

  const loadSeats = async (showtime) => {
    setSeatLoading(true);
    setSelectedShowtime(showtime);
    try {
      const allSeats = await getSeats();
      // Lấy chi tiết ghế cho một showtime nhất định
      const seatDetails = await getSeatDetail(showtime.id);

      if (typeof seatDetails === "object" && seatDetails !== null) {
        const roomSeats = allSeats
          .filter((seat) => seat.idroom === showtime.idroom)
          .map((seat) => {
            return {
              ...seat,
              status:
                seat.id === seatDetails.id ? seatDetails.status : seat.status,
            };
          });

        // Lấy các ghế đã đặt từ API
        const bookedSeats = await getBookedSeats(showtime.idroom, showtime.id);
        roomSeats.forEach((seat) => {
          // Đánh dấu ghế đã đặt
          if (bookedSeats.some((bookedSeat) => bookedSeat.idSeat === seat.id)) {
            seat.status = "booked";
          }
        });

        setSeats(roomSeats);
      } else {
        showErrorNotification("Lỗi khi lấy trạng thái ghế. Vui lòng thử lại.");
      }
    } catch (error) {
      showErrorNotification("Không thể tải danh sách ghế");
      console.error("Lỗi khi lấy ghế:", error);
    } finally {
      setSeatLoading(false);
    }
  };

  const handleSeatSelection = (seat) => {
    setSelectedSeats((prev) =>
      prev.some((s) => s.id === seat.id)
        ? prev.filter((s) => s.id !== seat.id)
        : [...prev, seat]
    );
  };

  const handlePayment = async () => {
    if (!selectedShowtime) {
      showInfoNotification("Vui lòng chọn suất chiếu trước");
      return;
    }

    try {
      const seatIds = selectedSeats.map((s) => s.id);
      const seatData = {
        showtimeId: selectedShowtime.id,
        seatIds: seatIds,
        movieId: id,
      };

      console.log("Dữ liệu gửi đi:", seatData);

      const response = await buyTickets(seatData); // Gọi hàm mua vé

      if (response.success) {
        showSuccessNotification("Đặt vé thành công!");
        loadSeats(selectedShowtime); // Làm mới ghế sau khi thanh toán
        setSelectedSeats([]); // Reset ghế đã chọn
      } else {
        showErrorNotification("Đặt vé thất bại: " + response.message);
      }
    } catch (error) {
      console.error("Lỗi thanh toán:", error);
      showErrorNotification(
        "Đặt vé thất bại: " + (error.message || "Có lỗi xảy ra")
      );
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingHamster />
      </div>
    );

  const organizeSeatsByRow = (seats) => {
    const rows = {};
    seats.forEach((seat) => {
      if (!rows[seat.seatRow]) {
        rows[seat.seatRow] = [];
      }
      rows[seat.seatRow].push(seat);
    });
    return rows;
  };

  const seatRows = organizeSeatsByRow(seats);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Movie Info - Left Side */}
      <div className="md:w-1/3">
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="w-full rounded-xl shadow-lg mb-6"
        />
        <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>
        <div className="space-y-2 bg-[#242831]  p-4 rounded-lg text-gray-200">
          <p>Thể loại: {movie.genre}</p>
          <p>Năm phát hành: {movie.releaseYear}</p>
          <p>{movie.description}</p>
        </div>
      </div>

      {/* Booking Section - Right Side */}
      <div className="flex-1">
        {/* Showtimes */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Suất chiếu</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {showtimes.map((showtime) => (
              <button
                key={showtime.id}
                onClick={() => loadSeats(showtime)}
                className={`p-3 rounded-lg ${
                  selectedShowtime?.id === showtime.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-500"
                }`}
              >
                {showtime.time}
                <br />
                Phòng {showtime.idroom}
              </button>
            ))}
          </div>
        </div>

        {/* Seat Map */}
        {selectedShowtime && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              Chọn ghế - Phòng {selectedShowtime.idroom}
            </h2>

            {seatLoading ? (
              <div className="text-center">Đang tải ghế...</div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-xl w-full">
                {Object.keys(seatRows).map((row) => (
                  <div key={row} className="mb-4">
                    <div className="flex items-center justify-center mb-2">
                      <div className="font-semibold text-gray-700 mr-2">
                        {row}
                      </div>
                      <div className="flex gap-2">
                        {seatRows[row].map((seat) => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatSelection(seat)}
                            disabled={seat.status === "booked"}
                            className={`w-10 h-10 rounded-lg text-xs flex items-center justify-center ${
                              seat.status === "booked"
                                ? "bg-gray-300 cursor-not-allowed"
                                : selectedSeats.some((s) => s.id === seat.id)
                                ? "bg-green-500 text-white"
                                : "bg-white border-2 border-gray-300 hover:border-blue-500"
                            }`}
                          >
                            {seat.number}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex gap-4 text-sm text-gray-600 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                    Đã đặt
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-sm"></div>
                    Còn trống
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Payment Section */}
        {selectedSeats.length > 0 && (
          <div className="sticky bottom-0 bg-white p-4 border-t shadow-lg rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  Đã chọn {selectedSeats.length} ghế:{" "}
                  {selectedSeats
                    .map((s) => `${s.seatRow}${s.number}`)
                    .join(", ")}
                </p>
                <p className="text-blue-600 font-bold">
                  Tổng: {(selectedSeats.length * 70000).toLocaleString()} VND
                </p>
              </div>
              <button
                onClick={handlePayment}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                Thanh toán
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
