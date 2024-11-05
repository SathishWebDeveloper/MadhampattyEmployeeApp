import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import dashboardAct from "assets/images/icons/dashboard-activate.png";
import dashboard from "assets/images/icons/dashboard-icon.png";
import leadsAct from "assets/images/icons/leads-activate.png";
import leads from "assets/images/icons/leads-icon.png";
import reportsAct from "assets/images/icons/records-activate.png";
import reports from "assets/images/icons/reports-icon.png";
import settingsAct from "assets/images/icons/settings-activate.png";
import settings from "assets/images/icons/settings-icon.png";
import staffenrollAct from "assets/images/icons/staffroll-activate.png";
import staffenroll from "assets/images/icons/staffroll.png";
import userIcon from "assets/images/icons/userprofilepic.jpg";
import logoImage from "assets/images/logo/logo.png";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { tokenGenerate } from "../../redux/slice/authTokenSlice";

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: "#8A3A93",
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
  backgroundColor: "#8A3A93",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  minHeight: "80px !important",
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#FEF2FF",
  minHeight: "80px",
  boxShadow: "0px 4px 4px 0px #0000001F",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.down("sm")]: {
      width: `100%`,
    },
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
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const [open, setOpen] = useState(true);
  const [selectField, setSelectField] = useState(false);
  const selectMode = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(tokenGenerate(""));
  };
  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleAdminToggle = (data) => {
    if(data === 'logout'){
      handleLogout();
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectMode.current && !selectMode.current.contains(event.target)) {
        setSelectField(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  
  const handleToggle = () => setSelectField((prev) => !prev);

  const adminAccess = [
    {
      title: "Edit Profile",
      value: "editprofile",
    },
    {
      title: "Change Password",
      value: "changepassword",
    },
    {
      title: "Log Out",
      value: "logout",
    },
  ];

  const sideBarKeys = [
    {
      title: "Dashboard",
      Url: "dashboard",
      icon: dashboard,
      iconAct: dashboardAct,
    },
    {
      title: "Staff Enrollment",
      Url: "staffenrollment",
      icon: staffenroll,
      iconAct: staffenrollAct,
    },
    {
      title: "Leads",
      Url: "leads",
      icon: leads,
      iconAct: leadsAct,
    },
    {
      title: "Reports",
      Url: "reports",
      icon: reports,
      iconAct: reportsAct,
    },
    {
      title: "Settings",
      Url: "settings",
      icon: settings,
      iconAct: settingsAct,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "80px !important",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 0,
                color: "#8A3A93",
                "&:hover": {
                  background: "none",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box>
              <img
                src={logoImage}
                alt="logo"
                className="sidebar-logo"
                onClick={() => navigate(`/dashboard`)}
              />
            </Box>
          </Box>
          <Box
            sx={{ color: "#8A3A93", cursor: "pointer", marginRight: "60px" }}
          >
            <div
              ref={selectMode}
              className={`sidebar-dropdown ${selectField ? "active" : ""}`}
              onClick={() => handleToggle()}
            >
              <span className="tooltip-icon">
                <img src={userIcon} alt="user" className="user-icon" />
              </span>
              Admin
              <span className="left-icon"></span>
              <span className="right-icon"></span>
              <div className="items">
                {adminAccess.map((item, index) => {
                  return (
                    <span
                      key={`id${index}`}
                      data-value={`${item.title}`}
                      style={{ "--i": index * 2 }}
                      onClick={()=>handleAdminToggle(item.value)
                        // index === adminAccess.length - 1 && handleLogout()
                      }
                    >
                      {item.title}
                    </span>
                  );
                })}
              </div>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ minHeight: "80px !important" }}></DrawerHeader>
        <Divider />
        <List>
          {sideBarKeys.map((text, index) => (
            <ListItem key={text.title} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => navigate(`/${text.Url}`)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: pathname.includes(`/${text.Url}`)
                    ? "#8A3A93"
                    : "#ffffff",
                  borderLeft: pathname.includes(`/${text.Url}`)
                    ? "5px solid red"
                    : "",
                  backgroundColor: pathname.includes(`/${text.Url}`)
                    ? "#FEF2FF"
                    : "",
                  "&:hover": {
                    backgroundColor: pathname.includes(`/${text.Url}`)
                      ? "#FEF2FF"
                      : "",
                  },
                }}
              >
                <Box className="flex-box">
                  {" "}
                  <img
                    className={`sidebar-drawericon ${
                      pathname.includes(`/${text.Url}`) &&
                      "activate-sidebaricon"
                    }`}
                    src={
                      pathname.includes(`/${text.Url}`)
                        ? `${text.iconAct}`
                        : `${text.icon}`
                    }
                    alt="icon"
                  />{" "}
                </Box>
                <ListItemText
                  primary={text.title}
                  sx={{
                    opacity: open ? 1 : 0,
                    "& span": {
                      fontWeight: "600",
                      fontSize: "16px",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader sx={{ minHeight: "80px !important" }} />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
