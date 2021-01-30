import React, { SetStateAction } from "react";
import clsx from "clsx";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  fade,
  makeStyles,
  Theme,
  createStyles,
  MuiThemeProvider,
  createMuiTheme,
  Tooltip,
  ButtonGroup,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
// import SearchIcon from "@material-ui/icons/Search";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CodeIcon from "@material-ui/icons/Code";
import { Shadows } from "@material-ui/core/styles/shadows";
import ShareIcon from "@material-ui/icons/Share";
import { deepPurple, green } from "@material-ui/core/colors";
import { decodeToString } from "../../utils/en-decoder";
import { createShareURL } from "../createShareURL";
import VerticalSplitIcon from "@material-ui/icons/VerticalSplit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { modeTypes } from "../MDEditor";
// import DescriptionIcon from "@material-ui/icons/Description";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";

const drawerWidth = 240;

export declare interface IAppTopBar {
  content: Uint8Array | undefined;
  setMode: React.Dispatch<SetStateAction<modeTypes>>;
}

export const AppTopBar = ({ content, setMode }: IAppTopBar) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClickViewMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMode(event.currentTarget.id as modeTypes);
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.grow}>
        <AppBar
          position="static"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              edge="start"
              // className={classes.menuButton}
              className={clsx(classes.menuButton, open && classes.hide)}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Monaco Editor Markdown Github Style Preview
            </Typography>
            {/* <div className={classes.search}> */}
            {/* <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              /> */}
            <ButtonGroup variant="contained" color="inherit">
              <Tooltip title="Editor Mode" placement="bottom">
                <IconButton id="editMode" onClick={handleClickViewMenu}>
                  <CodeIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Split Mode" placement="bottom">
                <IconButton id="splitMode" onClick={handleClickViewMenu}>
                  <VerticalSplitIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Viewer Mode" placement="bottom">
                <IconButton id="viewMode" onClick={handleClickViewMenu}>
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
            </ButtonGroup>
            {/* </div> */}
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Tooltip title="Copy to clipboard" placement="bottom">
                <IconButton
                  color="inherit"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(decodeToString(content));
                    }
                  }}
                >
                  <FileCopyIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Experiment: Share by Query Parameter"
                placement="bottom"
              >
                <IconButton color="inherit">
                  <ShareIcon
                    onClick={() =>
                      (async () => {
                        const URL = await createShareURL(
                          decodeToString(content)
                        );
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(URL);
                        }
                      })()
                    }
                  />
                </IconButton>
              </Tooltip>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {/* <ListItem button key={1}>
              <ListItemIcon>
                <DescriptionIcon />
                <ListItemText primary="ドキュメント1" />
              </ListItemIcon>
            </ListItem> */}
            {/* {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
          </List>
          <Divider />
          {/* <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
        </Drawer>
        {renderMenu}
      </div>
    </MuiThemeProvider>
  );
};

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: green,
  },
  shadows: Array(25).fill("none") as Shadows,
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    hide: {
      display: "none",
    },
  })
);
