import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Drawer from "../Components/Drawer/Drawer"
import { DrawerLinks } from "../Components/Drawer/DrawerLinks"
import DragContext from "../Components/DragDrop/DragContext"
import NavBar from "../Components/NavBar/NavBar"
import { selectCurrentProjectName } from '../Reducers/Selectors';
import { Typography, Link, Breadcrumbs } from "@material-ui/core"
import {  mockgetUserAndProjectData } from "../Actions/user.actions"

export default function Board() {
    const dispatch = useDispatch()
    const projectName = useSelector(selectCurrentProjectName)
    const [open, setOpen] = useState(true);

    useEffect(() => {
        dispatch(mockgetUserAndProjectData())
    }, [])

    return (
        <div className={open ? "main drawer-close" : "main drawer-open"}>
            <NavBar openDrawer={() => setOpen(true)} />
            <Drawer handleClick={setOpen} open={open}>
                <DrawerLinks currentLocation="board" />
            </Drawer>
            <Breadcrumbs aria-label="breadcrumb" className="bread-crumbs" >
                <Link color="inherit" href="/">Projects</Link>
                <Typography color="textPrimary">{projectName ? projectName : ""}</Typography>
            </Breadcrumbs>
            <p>{projectName} Board</p>
            <DragContext />
        </div>
    )
}
