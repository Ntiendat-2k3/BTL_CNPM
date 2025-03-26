const BASE_URL = "http://localhost:8080";

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu");
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi fetch:", error.message);
    throw error;
  }
};

// Lấy danh sách phim
export const getMovies = () => fetchData(`${BASE_URL}/api/movies`);

// Lấy chi tiết phim
export const getMovieDetails = async (id) => {
  try {
    const movie = await fetchData(`${BASE_URL}/api/movies/${id}`);
    console.log("Movie Details:", movie);
    return movie;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết phim:", error.message);
    return null;
  }
};

// Lấy danh sách suất chiếu của phim
export const getShowtimes = (id) =>
  fetchData(`${BASE_URL}/api/movies/${id}/showtimes`);

// Lấy danh sách ghế trong phòng
export const getSeats = (showtimeId) =>
  fetchData(`${BASE_URL}/api/seats/${showtimeId}`);

// Mua vé (đặt vé)
export const buyTickets = (seatData) => {
  return fetch(`${BASE_URL}/api/tickets/buy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(seatData),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Lỗi khi đặt vé:", error);
      throw error;
    });
};
