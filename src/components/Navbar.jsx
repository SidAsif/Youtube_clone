import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { categories } from "../assets/material";
import { Link } from "react-router-dom";
import { Avatar, Badge, Menu, MenuItem } from "@mui/material";
import {
  MenuRounded,
  NotificationsNone,
  VideoCallOutlined,
  WatchLater,
} from "@mui/icons-material";
import SearchBar from "./SearchBar";
import "../index.css";
import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";
const drawerWidth = 240;
const provider = new GoogleAuthProvider();
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

export default function Navbar({
  selectedCategory,
  setSelectedCategory,
  showDrawer,
}) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const navstyle = {
    backgroundColor: "#ffff",
  };
  const iconcolor = {
    color: "Black",
  };
  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        if (user.photoURL) {
          setUserAvatar(user.photoURL);
        } else {
          console.warn("User photo URL not available");
        }
        toast.success("Signed in successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUserAvatar(null);
      toast.success("Signed out successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" sx={{ ...navstyle, boxShadow: "none" }}>
          <Toolbar>
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
              style={{ display: "flex", alignItems: "center", flexGrow: 0.5 }}
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
                {" "}
                <Badge color="error" badgeContent={9} sx={{ ...iconcolor }}>
                  <NotificationsNone />
                </Badge>
              </IconButton>
              <ToastContainer />
              <IconButton>
                <Avatar
                  alt="profile-logo"
                  src={
                    userAvatar ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  sx={{ width: 32, height: 32 }}
                  onClick={(e) => setMenuOpen(true)}
                />
              </IconButton>
            </Box>
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
            <MenuItem onClick={handleGoogle}>Sign In</MenuItem>
            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
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
                  onClick={() => setSelectedCategory(category.name)}
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
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  showDrawer: PropTypes.bool.isRequired,
};
