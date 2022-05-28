import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./hocs/Layout";
import { Login } from "./containers/Login";
import { Signup } from "./containers/Signup";
import { ResetPassword } from "./containers/ResetPassword";
import { ResetPasswordConfirm } from "./containers/ResetPasswordConfirm";
import { Activate } from "./containers/Activate";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Layout>
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
            </Routes>
          </Router>
        </Layout>
      </header>
    </div>
  );
}

export default App;
