import React, { useState } from "react";

import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import { Layout } from "../hocs/Layout";

const activationRequest = async (uid, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ uid, token });

  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
      body,
      config
    );
  } catch (err) {
    console.log("Invalid token.");
  }
};

export const Activate = () => {
  let { uid, token } = useParams();

  const [redirect, setReditect] = useState(false);
  activationRequest(uid, token);

  setTimeout(() => {
    setReditect(true);
  }, 5000);

  return (
    <Layout>
      {redirect === true ? (
        <Navigate to="/login" />
      ) : (
        <p>Your account has successfully been activated, you may now log in.</p>
      )}
    </Layout>
  );
};
