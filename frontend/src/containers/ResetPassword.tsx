import axios from "axios";
import React, { useEffect } from "react";
import { Layout } from "../hocs/Layout";
import { useContext } from "react";
import { UserContext } from "../components/userContext";

export const ResetPassword = () => {
  let { user, setUser } = useContext(UserContext);
  const resetPassword = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const email = localStorage.getItem("email");
    const body = JSON.stringify({ email });
    await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,
      body,
      config
    );

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("email");
    setUser(null);
  };
  useEffect(() => {
    resetPassword();
  }, []);

  return (
    <Layout>
      <h1>An email has been sent to reset your password.</h1>
    </Layout>
  );
};
