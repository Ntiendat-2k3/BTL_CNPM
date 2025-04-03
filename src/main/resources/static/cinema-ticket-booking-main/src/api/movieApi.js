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

// Lấy tất cả các ghế trong các phòng
export const getSeats = () => fetchData(`${BASE_URL}/api/seats`);

// Lấy trạng thái ghế trong phòng theo showtimeId
export const getSeatDetail = (showtimeId) =>
  fetchData(`${BASE_URL}/api/seats/${showtimeId}`);

export const getBookedSeats = (idRoom, idShowtime) => {
  return fetch(
    `${BASE_URL}/api/tickets?&idRoom=${idRoom}&idShowtime=${idShowtime}`
  )
    .then((response) => response.json())
    .catch((error) => {
      console.error("Lỗi khi lấy ghế đã đặt:", error);
      throw error;
    });
};

// export const searchMovies = async (query) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/api/movies?title_like=${encodeURIComponent(query)}`
//     );

//     if (!response.ok) throw new Error("Lỗi kết nối server");

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Lỗi tìm kiếm:", error);
//     return [];
//   }
// };

// Mua vé (đặt vé)
export const buyTickets = (seatData) => {
  return fetch(`${BASE_URL}/api/tickets/buy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(seatData),
  })
    .then(async (response) => {
      // Kiểm tra nếu response không ok
      if (!response.ok) {
        const errorMessage = await response.text(); // Lấy lỗi từ server
        throw new Error(errorMessage || "Lỗi không xác định");
      }

      // Nếu phản hồi thành công, trả về kết quả dưới dạng JSON
      return response.json();
    })
    .catch((error) => {
      console.error("Lỗi khi đặt vé:", error);
      throw error;
    });
};

export const getUsers = () => fetchData(`${BASE_URL}/api/users`);
