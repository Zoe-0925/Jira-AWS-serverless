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

export const MyListItem = ({ color, handleClick, id, selected, primary, children }) => (
    <Link color={color} onClick={handleClick}>
        <ListItem button key={id} selected={selected}>
            <ListItemIcon> {children}</ListItemIcon>
            <ListItemText primary={primary} />
        </ListItem>
    </Link>
)

/**
 * @param CurentLocation: enum ("roadmap", "board", "detail")
 */
export const DrawerLinks = ({ type, currentLocation }) => {
    return type === "board" ? (
        <Fragment>
            <List>
                <MyListItem color={currentLocation !== "roadmap" ? "inherit" : "primary"} handleClick={() => history.push("/projects/roadmap")}
                    id="Roadmap" selected={currentLocation === "roadmap"} primary="Roadmap">
                    <ClearAllIcon />
                </MyListItem>
                <MyListItem color={currentLocation !== "board" ? "inherit" : "primary"} handleClick={() => history.push("/projects/board")}
                    id="Board" selected={currentLocation === "board"} primary="Board">
                    <AssignmentIcon />
                </MyListItem>
                <MyListItem color={currentLocation !== "detail" ? "inherit" : "primary"} handleClick={() => history.push("/projects/settings/details")}
                    id="Project Details" selected={currentLocation === "detail"} primary="Project Settings">
                    <SettingsIcon />
                </MyListItem>
            </List>
        </Fragment>
    ) : (
            <Fragment>
                <MyListItem color={currentLocation !== "detail" ? "inherit" : "primary"} handleClick={() => history.push("/projects")}
                    id="Project Details" selected={currentLocation === "detail"} primary="Project Settings">
                    <ArrowBackRoundedIcon />
                </MyListItem>
                <Divider />
                <ListItemText primary="Issue Types" />
                <MyListItem color="inherit" handleClick={() => { }}
                    id="Epics" selected={false} primary="Epics">
                    <OpenInBrowserIcon />
                </MyListItem>
                <Divider />
                <MyListItem className="list-item" color="inherit" handleClick={() => { }}
                    id="Tasks" selected={false} primary="Tasks">
                    <CheckBoxIcon />
                </MyListItem>
                <Divider />
                <MyListItem className="list-item" color="inherit" handleClick={() => { }}
                    id="Subtasks" selected={false} primary="Subtasks">
                    <AllInboxIcon />
                </MyListItem>
            </Fragment>)
}
