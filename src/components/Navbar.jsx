import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../slices/userSlice";
import { setCategory } from "../slices/categorySlice";
import { styled } from "@mui/material/styles";
import {
  Box,
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Drawer as MuiDrawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  MenuRounded,
  NotificationsNone,
  VideoCallOutlined,
  WatchLater,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import SearchBar from "./SearchBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { categories } from "../assets/material";
import "../index.css";

// ... styles

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export default function Navbar({ showDrawer }) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
  const selectedCategory = useSelector((state) => state.category);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navstyle = {
    backgroundColor: "#ffff",
  };
  const iconcolor = {
    color: "Black",
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      toast.success("Signed out successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" sx={{ ...navstyle, boxShadow: "none" }}>
          <Toolbar>
            {!isSmallScreen ? (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  sx={{ mr: 2, ...iconcolor }}
                  className="logo"
                  aria-label="open drawer"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  <MenuRounded className="logo" />
                </IconButton>
                <Link
                  to="/"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 0.5,
                  }}
                >
                  <img
                    src="/png-transparent-google-logo-youtube-youtuber-youtube-rewind-text-area-line-removebg-preview.png"
                    alt="logo"
                    height={45}
                  />
                </Link>
                <SearchBar />
                <Box flexGrow={0.5} />
                <Box
                  sx={{
                    display: { xs: "none", md: "flex", gap: 3 },
                    alignItems: "center",
                  }}
                  className="iconss"
                >
                  <IconButton>
                    <VideoCallOutlined fontSize="large" />
                  </IconButton>
                  <IconButton>
                    <Badge color="error" badgeContent={9} sx={{ ...iconcolor }}>
                      <NotificationsNone />
                    </Badge>
                  </IconButton>
                  <ToastContainer />
                  <IconButton>
                    <Avatar
                      alt="profile-logo"
                      src={
                        user?.photoURL ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      }
                      sx={{ width: 32, height: 32 }}
                      onClick={(e) => setMenuOpen(true)}
                    />
                  </IconButton>
                </Box>
              </>
            ) : (
              <Box className="navbar-small">
                <Link to="/">
                  <img
                    src="/png-transparent-google-logo-youtube-youtuber-youtube-rewind-text-area-line-removebg-preview.png"
                    alt="logo"
                    height={45}
                  />
                </Link>
                <SearchBar />
                <IconButton>
                  <Avatar
                    alt="profile-logo"
                    src={
                      user?.photoURL ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
                    sx={{ width: 32, height: 32 }}
                    onClick={(e) => setMenuOpen(true)}
                  />
                </IconButton>
              </Box>
            )}
          </Toolbar>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={menuOpen}
            onClose={(e) => setMenuOpen(false)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            <MenuItem>Help</MenuItem>
            <MenuItem>Setting</MenuItem>
          </Menu>
        </AppBar>
        {showDrawer && (
          <Drawer
            className="drawer"
            variant="permanent"
            open={open}
            sx={{
              bgcolor: "black",
              mt: 2,
            }}
          >
            <Divider />
            <List sx={{ mt: 9 }}>
              {categories.map((category) => (
                <ListItem
                  key={category.id}
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() => dispatch(setCategory(category.name))}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      color: "black",
                      background:
                        category.name === selectedCategory && "#D3D3D3",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        marginRight: "15px",
                        color: "black",
                      }}
                    >
                      {category.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={category.name}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <IconButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                color: "black",
              }}
            >
              <WatchLater
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  marginRight: "15px",
                  color: "black",
                }}
              />{" "}
              <span style={{ fontSize: "14px", opacity: open ? 1 : 0 }}>
                Watch Later
              </span>
            </IconButton>
            <Divider />
          </Drawer>
        )}
      </Box>
    </>
  );
}

Navbar.propTypes = {
  showDrawer: PropTypes.bool.isRequired,
};
