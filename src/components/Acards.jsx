import React from "react";

const Acards = () => {
  return (
    <div className="py-3 cursor-pointer flex px-3">
      <div className="w-[400px] h-auto shadow-lg shadow-gray-600 rounded overflow-hidden">
        <h1 className="text-md font-semibold p-2">Location:</h1>
        <h1 className="text-md font-semibold p-2">From Date:</h1>
        <h1 className="text-md font-semibold p-2">To Date:</h1>
        <h1 className="text-md font-semibold p-2">Status:</h1>
        <div className="flex justify-end px-6 py-2">
          <button className="bg-blue-400 text-lg p-2 rounded-full font-bold">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Acards;
