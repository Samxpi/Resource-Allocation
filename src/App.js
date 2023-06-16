import React from "react";
import Login from "./components/Home";
import Login2 from "./components/Login2";
import Sidebar from "./components/Sidebar";
import Bookings from "./components/Bookings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
