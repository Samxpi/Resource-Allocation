import React from "react";
import Acards from "./Acards";

function ApprovPage() {
  return (
    <div>
      <h1 className="flex px-5 py-2 text-xl font-bold">Bookings</h1>
      <div className="bg-[#1F6E8C] flex my-6 py-3 rounded-full">
        <h1 className="px-3 text-xl font-bold">Pending</h1>
      </div>
      <Acards />
      <div className="bg-[#1F6E8C] flex my-6 py-3 rounded-full">
        <h1 className="px-3 text-xl font-bold">Confirmed</h1>
      </div>
      <Acards />
    </div>
  );
}

export default ApprovPage;
