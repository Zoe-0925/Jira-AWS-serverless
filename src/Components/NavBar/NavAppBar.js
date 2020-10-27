import React, { useState } from 'react';
import { useSelector } from "react-redux"
import { fade, makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid'
import {
    AppBar, Button, Tab, Menu, MenuItem, Badge, Divider, InputBase, Typography, IconButton, Toolbar,
} from '@material-ui/core'
import history from "../../history"
import { selectAllProjects } from "../../Reducers/Selectors"
/***** Icons ****/
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import IssueCreateDialogue from "../Issues/IssueCreate"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
/*******/

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "white",
        color: "black"
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function NavAppBar() {
    const classes = useStyles();
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [projectAnchorEl, setProjectAnchorEl] = useState(null);
    const [accountAnchorEl, setAccountAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isProfileMenuOpen = Boolean(profileAnchorEl);
    const isProjectMenuOpen = Boolean(projectAnchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isAccountMenuOpen = Boolean(accountAnchorEl);

    //TODO
    const projects = useSelector(selectAllProjects)

    /**
     *                            {projects.map(each => {
                                    return <MenuItem onClick={() => { }}>{each}</MenuItem>
                                })
                                }
     */

    const handleAccountMenuClose = () => {
        setAccountAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleAccountMenuOpen = (event) => {
        setAccountAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleProfileMenuOpen = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleProjectMenuClose = () => {
        setProjectAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleProjectMenuOpen = (event) => {
        setProjectAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const projectMenu = (
        <Menu
            anchorEl={projectAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={uuidv4()}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isProjectMenuOpen}
            onClose={handleProjectMenuClose}
        >
            <div className="menu-container">
                <p className="menu-title">RECENT</p>
                <Divider />
                <MenuItem onClick={() => history.push("/projects")}>View All Projects</MenuItem>
                <MenuItem onClick={() => history.push("/projects/create")}>Create Project</MenuItem>
            </div>
        </Menu>
    )

    const renderMenu = (
        <Menu
            anchorEl={profileAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={uuidv4()}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isProfileMenuOpen}
            onClose={handleProfileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
        </Menu>
    );

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={uuidv4()}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );


    const accountMenu = (
        <Menu
            anchorEl={accountAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={uuidv4()}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isAccountMenuOpen}
            onClose={handleAccountMenuClose}
        >
            <div className="menu-container">
                <p className="menu-title">MY ACCOUNT</p>
                <Divider />
                <MenuItem onClick={() => history.push("/projects")}>Profile</MenuItem>
                <Divider />
                <MenuItem onClick={() => { }}>Log Out</MenuItem>
            </div>
        </Menu>
    );


    return (
        <div className={classes.grow + " nav-bar"} >
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Button onClick={() => history.push("/projects")} className="nav-title">Jira Mock </Button>
                    <Button className="nav-tab" onClick={handleProjectMenuOpen}>Projects <ExpandMoreIcon /></Button>
                    {projectMenu}



                    <IssueCreateDialogue />
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}


                            />
                        </div>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <SettingsIcon style={{ "cursor": "pointer" }} className="icon" />
                        </IconButton>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleAccountMenuOpen}
                        >
                            <AccountCircle style={{ "cursor": "pointer" }} />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={uuidv4()}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            {accountMenu}
        </div>
    );
}