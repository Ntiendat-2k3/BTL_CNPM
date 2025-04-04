import { useState, useEffect } from "react";
import Container from "../../components/admin/Container";

const ManageMovies = () => {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    // Fake API call
    setMovies([
      {
        id: 1,
        title: "Movie 1",
        genre: "Action",
        releaseYear: "2023",
        imageUrl: "https://via.placeholder.com/150",
      },
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Container title="Quản lý phim">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Tên phim</label>
            <input
              type="text"
              className="w-full bg-gray-700 rounded p-2 text-white focus:ring-2 focus:ring-blue-500"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-2">Thể loại</label>
            <input
              type="text"
              className="w-full bg-gray-700 rounded p-2 text-white focus:ring-2 focus:ring-blue-500"
              value={form.genre}
              onChange={(e) => setForm({ ...form, genre: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-2">Năm phát hành</label>
            <input
              type="number"
              className="w-full bg-gray-700 rounded p-2 text-white focus:ring-2 focus:ring-blue-500"
              value={form.releaseYear}
              onChange={(e) =>
                setForm({ ...form, releaseYear: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block mb-2">Hình ảnh</label>
            <input
              type="text"
              className="w-full bg-gray-700 rounded p-2 text-white focus:ring-2 focus:ring-blue-500"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2">Mô tả</label>
            <textarea
              className="w-full bg-gray-700 rounded p-2 text-white focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Lưu phim
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition"
          >
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
            <div className="flex justify-between text-gray-400">
              <span>{movie.genre}</span>
              <span>{movie.releaseYear}</span>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">
                Sửa
              </button>
              <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ManageMovies;
