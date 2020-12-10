import React, { Fragment } from 'react';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Link } from '@material-ui/core';
import history from "../../history"
/**--------------Icons-------------- */
import AllInboxIcon from '@material-ui/icons/AllInbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ClearAllIcon from '@material-ui/icons/ClearAll'; //Roadmap
import AssignmentIcon from '@material-ui/icons/Assignment'; //Board
import SettingsIcon from '@material-ui/icons/Settings';

export const MyListItem = ({ color, handleClick, key, selected, primary, children }) => (
    <Link color={color} onClick={handleClick}>
        <ListItem button key={key} selected={selected}>
            <ListItemIcon> {children}</ListItemIcon>
            <ListItemText primary={primary} />
        </ListItem>
    </Link>
)

/**
 * @param CurentLocation: enum ("roadmap", "board", "detail")
 */
export const DrawerLinks = ({ currentLocation }) => (
    <Fragment>
        <List>
            <MyListItem color={currentLocation !== "roadmap" ? "inherit" : "primary"} handleClick={() => history.push("/projects/roadmap")}
                key="Roadmap" selected={currentLocation === "roadmap"} primary="Roadmap">
                <ClearAllIcon />
            </MyListItem>
            <MyListItem color={currentLocation !== "board" ? "inherit" : "primary"} handleClick={() => history.push("/projects/board")}
                key="Board" selected={currentLocation === "board"} primary="Board">
                <AssignmentIcon />
            </MyListItem>
            <MyListItem color={currentLocation !== "detail" ? "inherit" : "primary"} handleClick={() => history.push("/projects/settings/details")}
                key="Project Details" selected={currentLocation === "detail"} primary="Project Settings">
                <SettingsIcon />
            </MyListItem>
        </List>
    </Fragment>
)

export const ProjectSetting = ({ currentLocation }) => (
    <Fragment>
        <MyListItem color={currentLocation !== "detail" ? "inherit" : "primary"} handleClick={() => history.push("/projects")}
            key="Project Details" selected={currentLocation === "detail"} primary="Project Settings">
            <ArrowBackRoundedIcon />
        </MyListItem>
        <Divider />
        <ListItemText primary="Issue Types" />
        <MyListItem color="inherit" handleClick={() => { }}
            key="Epics" selected={false} primary="Epics">
            <OpenInBrowserIcon />
        </MyListItem>
        <Divider />
        <MyListItem className="list-item" color="inherit" handleClick={() => { }}
            key="Tasks" selected={false} primary="Tasks">
            <CheckBoxIcon />
        </MyListItem>
        <Divider />
        <MyListItem className="list-item" color="inherit" handleClick={() => { }}
            key="Subtasks" selected={false} primary="Subtasks">
            <AllInboxIcon />
        </MyListItem>
    </Fragment>
)