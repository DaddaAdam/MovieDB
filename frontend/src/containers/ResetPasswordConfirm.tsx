import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Layout } from "../hocs/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../components/userContext";

export const ResetPasswordConfirm = () => {
  const { uid, token } = useParams();
  const ResetPasswordRequest = async (
    new_password: string,
    re_new_password: string
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
        body,
        config
      );
      alert("Your password has successfully been reset, you may now log in!");
      window.location.href = "/login";
    } catch (err) {
      if (err?.response?.status === 400) {
        alert("ERROR: Make sure your password matches and is a valid one!!");
      }
    }
  };

  const { user, setUser } = useContext(UserContext);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const password = data.get("password").toString();
    const re_password = data.get("re_password").toString();

    ResetPasswordRequest(password, re_password);
  };

  return (
    <Layout>
      <Container component="main">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="re_password"
                label="Confirm Password"
                type="password"
                id="re_password"
                autoComplete="new-password"
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};
