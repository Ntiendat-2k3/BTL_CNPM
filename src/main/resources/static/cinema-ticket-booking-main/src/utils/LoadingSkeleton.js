
const LoadingSkeleton = () => {
  return (
    <div className="w-[280px] bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 animate-pulse col-span-1">
      <div className="relative">
        <div className="w-full h-64 bg-gray-300 rounded-t-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
      </div>
      <div className="p-6">
        <div className="w-full h-6 bg-gray-300 rounded mb-4"></div>
        <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
