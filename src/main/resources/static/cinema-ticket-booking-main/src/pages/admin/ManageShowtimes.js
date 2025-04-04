import { useState, useEffect } from "react";
import Container from "../../components/admin/Container";

const ManageShowtimes = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    movieId: "",
    room: "",
    time: "",
  });

  useEffect(() => {
    // Fake data
    setMovies([{ id: 1, title: "Movie 1" }]);
    setShowtimes([{ id: 1, movieTitle: "Movie 1", room: "A1", time: "18:00" }]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Container title="Quản lý suất chiếu">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-2">Phim</label>
            <select
              className="w-full bg-gray-700 rounded p-2 text-white focus:ring-2 focus:ring-blue-500"
              value={form.movieId}
              onChange={(e) => setForm({ ...form, movieId: e.target.value })}
              required
            >
              <option value="">Chọn phim</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2">Phòng chiếu</label>
            <input
              type="text"
              className="w-full bg-gray-700 rounded p-2 text-white focus:ring-2 focus:ring-blue-500"
              value={form.room}
              onChange={(e) => setForm({ ...form, room: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-2">Thời gian</label>
            <input
              type="time"
              className="w-full bg-gray-700 rounded p-2 text-white focus:ring-2 focus:ring-blue-500"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Thêm suất chiếu
        </button>
      </form>

      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3 text-left">Phim</th>
              <th className="p-3 text-left">Phòng</th>
              <th className="p-3 text-left">Thời gian</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {showtimes.map((showtime) => (
              <tr
                key={showtime.id}
                className="border-b border-gray-700 hover:bg-gray-750"
              >
                <td className="p-3">{showtime.movieTitle}</td>
                <td className="p-3">{showtime.room}</td>
                <td className="p-3">{showtime.time}</td>
                <td className="p-3 text-center">
                  <button className="mr-2 text-blue-400 hover:text-blue-300">
                    Sửa
                  </button>
                  <button className="text-red-400 hover:text-red-300">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default ManageShowtimes;
