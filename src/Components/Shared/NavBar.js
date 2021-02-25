import React, { useState, Fragment } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid'
import {
    AppBar, Button, MenuItem, Divider, IconButton, Toolbar,
} from '@material-ui/core'

import history from "../../history"
import CreateProjectDialog from "../Forms/CreateProjectDialog"
import CreateIssueDialog from "../Forms/CreateIssueDialog"
/***** Icons ****/
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
/*******/
import { useDotIconMenu } from "./CustomHooks"
import { DropDownMenu } from "./Tabs"

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

export default function NavBar({ toggleDrawer }) {
    const classes = useStyles();
    const [isCreateProjectOpen, setOpenCreateProject] = useState(false)

    const handleSignOut = async () => history.push("/projects/")

    return (
        <div className={classes.grow + " nav-bar"} >
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Button onClick={() => history.push("/projects/")} className="nav-title">Jira Clone </Button>
                    <ProjectMenu handleCreateProject={() => setOpenCreateProject(true)} />
                    <CreateIssueDialog />
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>

                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <SettingsIcon style={{ "cursor": "pointer" }} className="icon" />
                        </IconButton>
                        <AccountMenu handleSignOut={handleSignOut} />
                    </div>
                </Toolbar>
            </AppBar>
            <MobileMenu handleSignOut={handleSignOut} toggleDrawer={toggleDrawer} />
            <CreateProjectDialog open={isCreateProjectOpen} setOpen={setOpenCreateProject} />
        </div>
    );
}

const ProjectMenu = ({ handleCreateProject }) => {
    const { anchorEl, isOpen, handleMenuClose, handleMenuOpen } = useDotIconMenu()

    return (
        <Fragment>
            <Button className="nav-tab" onClick={handleMenuOpen}>Projects <ExpandMoreIcon /></Button>
            <DropDownMenu anchorEl={anchorEl} isOpen={isOpen} handleMenuClose={handleMenuClose} >
                <div className="menu-container">
                    <p className="menu-title">RECENT</p>
                    <Divider />
                    <MenuItem onClick={() => history.push("/projects/")}>View All Projects</MenuItem>
                    <MenuItem onClick={handleCreateProject}>Create Project</MenuItem>
                </div>
            </DropDownMenu>
        </Fragment>
    )
}

const MobileMenu = ({ toggleDrawer, handleSignOut }) => {
    const classes = useStyles();
    const { anchorEl, isOpen, handleMenuClose, handleMenuOpen } = useDotIconMenu()

    return (
        <Fragment>
            <div className={classes.sectionMobile}>
                <IconButton
                    aria-label="show more"
                    aria-controls={uuidv4()}
                    aria-haspopup="true"
                    onClick={toggleDrawer}
                    color="inherit"
                >
                    <MoreIcon />
                </IconButton>
            </div>
            <DropDownMenu anchorEl={anchorEl} isOpen={isOpen} handleMenuClose={handleMenuClose} >
                <MenuItem onClick={handleMenuOpen}>
                    <AccountMenu handleSignOut={handleSignOut} />
                </MenuItem>
            </DropDownMenu>
        </Fragment>
    )
}

const AccountMenu = ({ handleSignOut }) => {
    const classes = useStyles();
    const { anchorEl, isOpen, handleMenuClose, handleMenuOpen } = useDotIconMenu()

    return (
        <Fragment>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={handleMenuOpen}
            >
                <AccountCircle style={{ "cursor": "pointer" }} />
            </IconButton>
            <DropDownMenu anchorEl={anchorEl} isOpen={isOpen} handleMenuClose={handleMenuClose} >
                <div className="menu-container">
                    <p className="menu-title">MY ACCOUNT</p>
                    <Divider />
                    <MenuItem onClick={() => history.push("/projects/board")}>Profile</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
                </div>
            </DropDownMenu>
        </Fragment>
    )
}
