import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./containers/Login";
import { Signup } from "./containers/Signup";
import { ResetPassword } from "./containers/ResetPassword";
import { ResetPasswordConfirm } from "./containers/ResetPasswordConfirm";
import { Activate } from "./containers/Activate";
import { Search } from "./containers/Search";
import { Trending } from "./containers/Trending";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route
              path="/resetpasswordconfirm"
              element={<ResetPasswordConfirm />}
            />
            <Route path="/activate" element={<Activate />} />
            <Route path="/search" element={<Search />} />
            <Route path="/trending" element={<Trending />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
