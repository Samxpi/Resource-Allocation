import React from "react";
import Login from "./components/Home";
import Login2 from "./components/Login2";
import Sidebar from "./components/Sidebar";
import Bookings from "./components/Bookings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cancellation from "./components/Cancellation";
import ApproverPage from "./components/ApprovPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login2 />} />
          <Route
            path="/home/"
            element={
              <>
                <Sidebar />
                <Login />
              </>
            }
          />
          <Route
            path="/Bookings"
            element={
              <>
                <Sidebar />
                <Bookings />
              </>
            }
          />
          <Route
            path="/Cancellation"
            element={
              <>
                <Sidebar />
                <Cancellation/>
              </>
            }
          />
          <Route
            path="/Approver"
            element={
              <>
                <Sidebar />
                <ApproverPage/>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;