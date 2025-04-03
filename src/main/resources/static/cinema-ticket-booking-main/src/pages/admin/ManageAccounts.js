import { useEffect, useState } from "react";

const ManageAccounts = () => {
  const apiUrl = "http://localhost:8080/api/users";
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    id: "",
    account: "",
    password: "",
    username: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Lỗi kết nối server");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError("Không thể tải danh sách tài khoản");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Thêm/Cập nhật tài khoản
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const method = form.id ? "PUT" : "POST";
      const url = form.id ? `${apiUrl}/${form.id}` : `${apiUrl}/register`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Lỗi không xác định");
      }

      await loadUsers();
      resetForm();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Xóa tài khoản
  const deleteUser = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa?")) return;

    try {
      const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Xóa thất bại");
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  // Sửa tài khoản
  const editUser = (user) => {
    setForm({
      id: user.id,
      account: user.account,
      password: "",
      username: user.username || "",
      role: user.role.toLowerCase(),
    });
  };

  // Reset form
  const resetForm = () => {
    setForm({ id: "", account: "", password: "", username: "", role: "user" });
  };

  return (
    <div className="text-gray-100 p-6 pl-20">
      <h2 className="text-2xl font-bold mb-6">Quản lý tài khoản</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Tài khoản</label>
            <input
              type="text"
              name="account"
              className="w-full bg-gray-700 rounded p-2 text-white focus:ring-2 focus:ring-blue-500"
              value={form.account}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-2">Mật khẩu</label>
            <input
              type="password"
              name="password"
              className="w-full bg-gray-700 rounded p-2 text-white focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-2">Họ tên</label>
            <input
              type="text"
              name="username"
              className="w-full bg-gray-700 rounded p-2 text-white focus:ring-2 focus:ring-blue-500"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-2">Vai trò</label>
            <select
              name="role"
              className="w-full bg-gray-700 rounded p-2 text-white focus:ring-2 focus:ring-blue-500"
              value={form.role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : form.id ? "Cập nhật" : "Thêm mới"}
          </button>
          <button
            type="button"
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
            onClick={resetForm}
          >
            Hủy
          </button>
        </div>
      </form>

      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3 text-left">Tài khoản</th>
              <th className="p-3 text-left">Họ tên</th>
              <th className="p-3 text-left">Vai trò</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-700 hover:bg-gray-750"
              >
                <td className="p-3">{user.account}</td>
                <td className="p-3">{user.username || "Không có"}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded ${
                      user.role === "ADMIN" ? "bg-blue-600" : "bg-gray-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => editUser(user)}
                    className="mr-2 text-blue-400 hover:text-blue-300"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAccounts;
