import React from 'react';
import PropTypes from 'prop-types';

const ShowtimeSelector = ({ showtimes, selectedShowtime, onSelect }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-4">Suất chiếu</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {showtimes.map(showtime => (
        <button
          key={showtime.id}
          onClick={() => onSelect(showtime)}
          className={`p-3 rounded-lg text-sm transition-colors ${
            selectedShowtime?.id === showtime.id
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600"
          }`}
        >
          {new Date(showtime.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          <div className="mt-1 text-xs">Phòng {showtime.idroom}</div>
        </button>
      ))}
    </div>
  </div>
);

ShowtimeSelector.propTypes = {
  showtimes: PropTypes.array.isRequired,
  selectedShowtime: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
};

export default React.memo(ShowtimeSelector);