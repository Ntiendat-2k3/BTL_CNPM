import React from 'react';
import PropTypes from 'prop-types';

const SeatMap = ({ seatRows, selectedSeats, onSeatSelect, isLoading }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-4">Chọn ghế</h2>
    {isLoading ? (
      <div className="text-center">Đang tải ghế...</div>
    ) : (
      <div className="bg-gray-50 p-4 rounded-xl">
        {Object.entries(seatRows).map(([row, seats]) => (
          <div key={row} className="mb-4">
            <div className="flex items-center gap-4 mb-2 overflow-x-auto">
              <div className="font-semibold w-8 shrink-0">{row}</div>
              <div className="flex gap-2 flex-1">
                {seats.map(seat => (
                  <button
                    key={seat.id}
                    onClick={() => onSeatSelect(seat)}
                    disabled={seat.status}
                    className={`shrink-0 w-8 h-8 rounded text-xs flex items-center justify-center transition-all ${
                      seat.status
                        ? "bg-gray-300 cursor-not-allowed"
                        : selectedSeats.some(s => s.id === seat.id)
                        ? "bg-green-500 text-white"
                        : "bg-white border-2 border-gray-300 hover:border-blue-500"
                    }`}
                    aria-label={`Ghế ${row}${seat.number}`}
                  >
                    {seat.number}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="flex flex-wrap gap-4 justify-center mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded-sm" />
            Đã đặt
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-sm" />
            Còn trống
          </div>
        </div>
      </div>
    )}
  </div>
);

SeatMap.propTypes = {
  seatRows: PropTypes.object.isRequired,
  selectedSeats: PropTypes.array.isRequired,
  onSeatSelect: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default React.memo(SeatMap);