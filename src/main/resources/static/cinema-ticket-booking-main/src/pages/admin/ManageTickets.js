import Container from "../../components/admin/Container";

const ManageTickets = () => {
  const ticketData = [
    { movie: "Movie 1", ticketsSold: 150, revenue: 10500000 },
    { movie: "Movie 2", ticketsSold: 200, revenue: 14000000 },
  ];

  const totalTickets = ticketData.reduce(
    (sum, item) => sum + item.ticketsSold,
    0
  );
  const totalRevenue = ticketData.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <Container title="Thống kê vé bán">
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-600 p-4 rounded-lg">
            <p className="text-xl font-bold">{totalTickets}</p>
            <p className="text-gray-200">Tổng vé đã bán</p>
          </div>
          <div className="bg-green-600 p-4 rounded-lg">
            <p className="text-xl font-bold">
              {totalRevenue.toLocaleString()} VND
            </p>
            <p className="text-gray-200">Tổng doanh thu</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-3 text-left">Phim</th>
                <th className="p-3 text-left">Vé đã bán</th>
                <th className="p-3 text-left">Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {ticketData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-750"
                >
                  <td className="p-3">{item.movie}</td>
                  <td className="p-3">{item.ticketsSold}</td>
                  <td className="p-3">{item.revenue.toLocaleString()} VND</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default ManageTickets;
