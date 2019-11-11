import React, { useState, useEffect } from "react";

import Posts from "./Posts/index";

import { Link } from "react-router-dom";

import { logout, isAuthenticated } from "../../services/auth";
import api from "../../services/api";

import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Avatar
} from "@material-ui/core";

import { useStyles } from "./styles";

function Home({ history }) {
  const [user, setUser] = useState("");
  useEffect(() => {
    async function loadUser(event) {
      const response = await api.get("/home");
      setUser(response.data);
    }
    loadUser();
  }, []);

  async function logoutUser(event) {
    logout();
    isAuthenticated(false);
    history.push("/");
  }

  async function getPosts(event) {}

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <Link to="/profile" style={{ color: "#000" }}>
          {user.name}
        </Link>
      </MenuItem>
      <MenuItem onClick={logoutUser}>Sair</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link to="/profile">{user.name}</Link>
      </MenuItem>
      <MenuItem onClick={logoutUser}>Sair</MenuItem>
    </Menu>
  );

  return (
    <>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              ServIsso?
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Avatar
                alt="Remy Sharp"
                src={
                  !user.photo
                    ? "https://img.icons8.com/bubbles/64/000000/gender-neutral-user.png"
                    : user.photo_url
                }
                className={classes.avatar}
                aria-controls={menuId}
                onClick={handleProfileMenuOpen}
              />
            </div>
            <div className={classes.sectionMobile}>
              <Avatar
                alt="Remy Sharp"
                src={
                  !user.photo
                    ? "https://img.icons8.com/bubbles/64/000000/gender-neutral-user.png"
                    : user.photo_url
                }
                className={classes.avatar}
                aria-controls={mobileMenuId}
                onClick={handleMobileMenuOpen}
              />
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>

      <Posts />
    </>
  );
}

export default Home;
