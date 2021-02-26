import React, { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid'
import {
    Button, MenuItem, Divider, IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import history from "../../history"
/***** Icons ****/
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
/*******/
import { useDotIconMenu } from "../Hooks/Hooks"
import { DropDownMenu } from "../Buttons/IconButtons"
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';


export const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));


export const ProjectMenu = ({ handleCreateProject }) => {
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

export const MobileMenu = ({ toggleDrawer, handleSignOut }) => {
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

export const AccountMenu = ({ handleSignOut }) => {
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
