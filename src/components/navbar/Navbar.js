import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authIcon from "./images/auth.png";
import "./Navbar.css";
import { AuthActions } from "../../Store/reducers/auth-reducer";
import jwtDecode from "jwt-decode";

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userLogoutHandler = () => {
    dispatch(AuthActions.logout());
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("message");
  };

  let activeStyle = {
    textDecoration: "none",
    color: "white",
    margin: "10px",
    borderBottom: "2px solid white",
  };
  let inActiveStyle = {
    textDecoration: "none",
    color: "tan",
    margin: "10px",
    borderBottom: "2px solid rgba(240, 248, 255, 0)",
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              "&:hover": { color: "white" },
            }}
          >
            Dhindhora
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <NavLink to="/services">Services</NavLink>
              <NavLink
                className={(isActive) =>
                  isActive ? "active-nav-link" : "inactive-navlink"
                }
                to="chat"
              >
                Chat
              </NavLink>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Dhindhora
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
              to="/chat"
            >
              Chat
            </NavLink>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {auth.login ? (
              <div className="d-flex align-items-center">
                <div className="mx-4 text-white ">
                  <h5 className="m-0">
                    {jwtDecode(localStorage.getItem("token")).name}
                  </h5>
                </div>
                <IconButton sx={{ p: 0 }}>
                  <Avatar
                    onClick={handleOpenUserMenu}
                    alt="Remy Sharp"
                    sx={{ bgcolor: "white", color: "black", fontWeight: "500" }}
                  >
                    {jwtDecode(localStorage.getItem("token")).name[0]}
                  </Avatar>
                </IconButton>
              </div>
            ) : (
              <IconButton
                sx={{
                  p: 0,
                  backgroundColor: "#D5D7D2",
                  "&:hover": {
                    backgroundColor: "white",
                  },
                }}
              >
                <Avatar
                  alt="Login"
                  src={authIcon}
                  onClick={() => {
                    navigate("/login");
                  }}
                />
              </IconButton>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={userLogoutHandler}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
