import React from "react";
import Login from "./components/Login";
import Login2 from "./components/Login2";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<Login2 />} />
          <Route
            path="/"
            element={
              <>
                <Sidebar />
                <Login />
                
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
