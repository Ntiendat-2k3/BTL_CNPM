import React from 'react';
import PropTypes from 'prop-types';

const PaymentFooter = ({ selectedSeats, onPayment, visible }) => (
  <div className={`sticky bottom-0 bg-white p-4 border-t shadow-lg transition-transform duration-300 ${
    visible ? "translate-y-0" : "translate-y-full"
  }`}>
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex-1">
        <p className="font-semibold truncate">
          Đã chọn {selectedSeats.length} ghế:{" "}
          {selectedSeats.map(s => `${s.seatRow}${s.number}`).join(", ")}
        </p>
        <p className="text-blue-600 font-bold">
          Tổng: {(selectedSeats.length * 70000).toLocaleString()} VND
        </p>
      </div>
      <button
        onClick={onPayment}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg w-full md:w-auto transition-colors"
      >
        Thanh toán
      </button>
    </div>
  </div>
);

PaymentFooter.propTypes = {
  selectedSeats: PropTypes.array.isRequired,
  onPayment: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default React.memo(PaymentFooter);