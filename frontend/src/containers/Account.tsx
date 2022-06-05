import React from "react";
import { Navigate } from "react-router-dom";
import { Layout } from "../hocs/Layout";
import axios from "axios";
export const Account = () => {
  if (!localStorage.getItem("access")) return <Navigate to="/login" />;

  return (
    <Layout>
      <h1>Account</h1>
    </Layout>
  );
};
