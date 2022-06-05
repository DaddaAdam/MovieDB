import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { UserContext } from "../components/userContext";

export const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isAuthenticated, setIsAuthenticated] = React.useState<Boolean>(false);

  const { user, setUser } = React.useContext(UserContext);

  React.useEffect(() => {
    setIsAuthenticated(Boolean(!localStorage.getItem("access")));
  }, [isAuthenticated]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {!isAuthenticated ? (
              <MenuItem onClick={handleClose}>
                <Button color="inherit" href="/account">
                  Account
                </Button>
              </MenuItem>
            ) : (
              <></>
            )}
            <MenuItem onClick={handleClose}>
              <Button color="inherit" href="/trending">
                Popular
              </Button>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Button color="inherit" href="/search">
                Search
              </Button>
            </MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MovieDB
          </Typography>
          {isAuthenticated ? (
            <>
              <Button color="inherit" href="/signup">
                Sign Up
              </Button>
              <Button color="inherit" href="/login">
                Login
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                localStorage.removeItem("email");
                setIsAuthenticated(false);
                setUser(null);
                window.location.href = "/login";
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
