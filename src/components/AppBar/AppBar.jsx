import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import brandLogo from "../../assets/images/Viraly-logo-new1 1.png";
// import Header from '../Header/Header';

const pages = ["Try It", "Features", "Blog", "Help Docs", "Princing", "Login"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
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

  return (
    <>
      <AppBar position="static" className="nav-bg">
        <Container
          maxWidth="xl"
          sx={{
            paddingLeft: { xs: "15px", md: "45px" },
            paddingRight: { xs: "15px", md: "45px" },
            maxWidth: "100%",
          }}
        >
          <Toolbar disableGutters>
            <div className="nav-main-div">
              <div>
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
                  }}
                >
                  <Image
                    src={brandLogo}
                    width={125}
                    height={30}
                    alt="brandlogo"
                  />
                </Typography>

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
                    // fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <Image
                    src={brandLogo}
                    width={100}
                    alt="brandlogo"
                  />
                </Typography>
              </div>
              <div>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      className="nav-btns"
                    >
                      {page}
                    </Button>
                  ))}
                  <div className="right_btns">
                    <Button className="signin-btn" size="small" variant="contained" >
                      Ultimate Monthly
                    </Button>
                    <img src="/bell.png" width={24} height={24} alt="bellicon" />
                  </div>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                  >
                    {/* <MenuIcon /> */}
                    <CustomMenuIcon />
                    <div>
                      <img src="" alt="" />
                    </div>
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
                    {pages.map((page) => (
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </div>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Banner with background image and centered content */}
      {/* <Header /> */}
    </>
  );
};

const CustomMenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="20"
    viewBox="0 0 28 20"
    fill="none"
  >
    <path
      d="M2 4H26C27.104 4 28 3.104 28 2C28 0.896 27.104 0 26 0H2C0.896 0 0 0.896 0 2C0 3.104 0.896 4 2 4ZM26 8H2C0.896 8 0 8.896 0 10C0 11.104 0.896 12 2 12H26C27.104 12 28 11.104 28 10C28 8.896 27.104 8 26 8ZM26 16H2C0.896 16 0 16.896 0 18C0 19.104 0.896 20 2 20H26C27.104 20 28 19.104 28 18C28 16.896 27.104 16 26 16Z"
      fill="#555555"
    />
  </svg>
);

export default Navbar;
