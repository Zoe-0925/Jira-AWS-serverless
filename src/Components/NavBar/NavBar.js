import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar, Button, IconButton, Toolbar,
} from '@material-ui/core'

import history from "../../history"
import CreateProjectDialog from "../Dialog/CreateProjectDialog"
import CreateIssueDialog from "../Dialog/CreateIssueDialog"
/***** Icons ****/
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
/*******/
import { MobileMenu, ProjectMenu, AccountMenu } from "./Menus"

export const useStyles = makeStyles((theme) => ({
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
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
}));

const NavBar = ({ toggleDrawer }) => {
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

export default React.memo(NavBar, (prev, next) => prev.toggleDrawer === next.toggleDrawer)