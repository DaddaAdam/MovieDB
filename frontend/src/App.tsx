import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login } from "./containers/Login";
import { Signup } from "./containers/Signup";
import { ResetPassword } from "./containers/ResetPassword";
import { ResetPasswordConfirm } from "./containers/ResetPasswordConfirm";
import { Activate } from "./containers/Activate";
import { Search } from "./containers/Search";
import { Trending } from "./containers/Trending";
import { MediaDetails } from "./containers/MediaDetails";
import { TvDetails } from "./containers/TvDetails";
import { PersonDetails } from "./containers/PersonDetails";
import { Account, Response, Fields } from "./containers/Account";
import { UserContext } from "./components/userContext";
import { Layout } from "./hocs/Layout";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <UserContext.Provider value={{ user, setUser }}>
            <Routes>
              <Route element={<Layout />} />
              <Route
                path="/login"
                element={
                  !localStorage.getItem("access") ? (
                    <Login />
                  ) : (
                    <Navigate to="/search" />
                  )
                }
              />
              <Route path="/account" element={<Account />} />
              <Route
                path="/signup"
                element={
                  !localStorage.getItem("access") ? (
                    <Signup />
                  ) : (
                    <Navigate to="/search" />
                  )
                }
              />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/password/reset/confirm/:uid/:token"
                element={<ResetPasswordConfirm />}
              />
              <Route path="/activate/:uid/:token" element={<Activate />} />
              <Route
                path="/search"
                element={
                  !localStorage.getItem("access") ? (
                    <Navigate to="/login" />
                  ) : (
                    <Search />
                  )
                }
              />

              <Route
                path="/*"
                element={
                  !localStorage.getItem("access") ? (
                    <Navigate to="/login" />
                  ) : (
                    <Search />
                  )
                }
              />
              <Route path="/trending" element={<Trending />} />
              <Route path="/movie/:id" element={<MediaDetails />} />
              <Route path="/tv/:id" element={<TvDetails />} />
              <Route path="/person/:id" element={<PersonDetails />} />
            </Routes>
          </UserContext.Provider>
        </Router>
      </header>
    </div>
  );
}

export default App;
