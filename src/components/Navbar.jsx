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
import { Avatar, Badge } from "@mui/material";
import {
  Menu,
  NotificationsNone,
  VideoCallOutlined,
} from "@mui/icons-material";
import SearchBar from "./SearchBar";
import "../index.css";
import { useState } from "react";
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

export default function Navbar({
  selectedCategory,
  setSelectedCategory,
  showDrawer,
}) {
  const [open, setOpen] = useState(false);
  const navstyle = {
    backgroundColor: "#ffff",
  };
  const iconcolor = {
    color: "Black",
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
              <Menu className="logo" />
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
              <IconButton>
                {" "}
                <Avatar
                  alt="profile-logo"
                  src="https://mui.com/static/images/avatar/2.jpg"
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
            </Box>
          </Toolbar>
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
            <List>
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
