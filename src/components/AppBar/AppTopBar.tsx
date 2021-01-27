import React from "react";
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
import MoreIcon from "@material-ui/icons/MoreVert";
import CodeIcon from "@material-ui/icons/Code";
import { Shadows } from "@material-ui/core/styles/shadows";
import ShareIcon from "@material-ui/icons/Share";
import { deepPurple, green } from "@material-ui/core/colors";
import { decodeToString } from "../../utils/en-decoder";
import { createShareURL } from "../createShareURL";
import VerticalSplitIcon from "@material-ui/icons/VerticalSplit";
import VisibilityIcon from "@material-ui/icons/Visibility";

export declare interface IAppTopBar {
  content: Uint8Array | undefined;
}

export const AppTopBar = ({ content }: IAppTopBar) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  // const renderMobileMenu = (
  //   <Menu
  //     anchorEl={mobileMoreAnchorEl}
  //     anchorOrigin={{ vertical: "top", horizontal: "right" }}
  //     id={mobileMenuId}
  //     keepMounted
  //     transformOrigin={{ vertical: "top", horizontal: "right" }}
  //     open={isMobileMenuOpen}
  //     onClose={handleMobileMenuClose}
  //   >
  //     <MenuItem>
  //       <Tooltip title="Copy to clipboard" placement="bottom">
  //         <IconButton color="inherit">
  //           <FileCopyIcon />
  //         </IconButton>
  //       </Tooltip>
  //       <p>copy to clipboard</p>
  //     </MenuItem>
  //     <MenuItem>
  //       <IconButton aria-label="show 11 new notifications" color="inherit">
  //         <Badge badgeContent={11} color="secondary">
  //           <NotificationsIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Notifications</p>
  //     </MenuItem>
  //     <MenuItem onClick={handleProfileMenuOpen}>
  //       <IconButton
  //         aria-label="account of current user"
  //         aria-controls="primary-search-account-menu"
  //         aria-haspopup="true"
  //         color="inherit"
  //       >
  //         <AccountCircle />
  //       </IconButton>
  //       <p>Profile</p>
  //     </MenuItem>
  //   </Menu>
  // );

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
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
                <IconButton id="button" onClick={() => null}>
                  <CodeIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Split Mode" placement="bottom">
                <IconButton id="button" onClick={() => null}>
                  <VerticalSplitIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Viewer Mode" placement="bottom">
                <IconButton id="button" onClick={() => null}>
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
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {/* {renderMobileMenu} */}
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
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  })
);
