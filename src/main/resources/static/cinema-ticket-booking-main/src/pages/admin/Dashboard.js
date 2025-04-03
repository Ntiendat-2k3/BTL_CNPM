import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { stats } from "../../constants/stats";

const Dashboard = () => {
  return (
    <div className="text-gray-100 pl-20">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} p-6 rounded-xl flex items-center justify-between`}
          >
            <div>
              <p className="text-2xl font-bold mb-2">{stat.value}</p>
              <p className="text-gray-200">{stat.title}</p>
            </div>
            <div className="text-gray-200 bg-black/20 p-3 rounded-full">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Thao tác nhanh</h2>
          <div className="space-y-3">
            <Link
              to="/admin/movies/add"
              className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              <span>Thêm phim mới</span>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="h-5 w-5"
              />
            </Link>
            <Link
              to="/admin/showtimes/add"
              className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              <span>Tạo suất chiếu</span>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="h-5 w-5"
              />
            </Link>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Hoạt động gần đây</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
              <span>Vé bán hôm nay</span>
              <span className="font-bold">56</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
              <span>Phim mới thêm</span>
              <span className="font-bold">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
