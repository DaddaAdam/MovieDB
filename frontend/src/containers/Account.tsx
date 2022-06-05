import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Layout } from "../hocs/Layout";
import { Grid, Typography } from "@mui/material";
import { UserContext } from "../components/userContext";
import Button from "@mui/material/Button";

export interface Response {
  pk: number;
  fields: Fields;
}
export interface Fields {
  email: string;
  name: string;
  is_active: boolean;
}
export const Account = () => {
  const { user, setUser } = useContext(UserContext);

  console.log(user);
  if (!localStorage.getItem("access")) return <Navigate to="/login" />;

  return (
    <Layout>
      {user ? (
        <Grid container direction="row" alignItems="center">
          <Grid item xs={5} alignItems="center"></Grid>
          <Grid item xs={5} alignItems="center">
            <Typography variant="h3">
              Welcome {user.fields.name ? user.fields.name : ""}
            </Typography>
          </Grid>
          <Grid item xs={5} alignItems="flex-start"></Grid>
          <Grid item xs={5} alignItems="center">
            <Typography variant="h4">
              Your account is {user.fields.is_active ? "active" : "inactive"}
            </Typography>
          </Grid>
          <Grid item xs={5} alignItems="flex-start"></Grid>
          <Grid item xs={5} alignItems="center">
            <Typography variant="h4">ID: {user.pk ? user.pk : ""}</Typography>
          </Grid>
          <Grid item xs={5} alignItems="flex-start"></Grid>
          <Button variant="contained" disableElevation href="/reset-password">
            Reset Password
          </Button>
        </Grid>
      ) : (
        <></>
      )}
    </Layout>
  );
};
