import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Drawer from "../Components/Drawer/Drawer"
import { DrawerInner } from "../Components/Drawer/DrawerInner"
import DragContext from "../Components/DragDrop/DragContext"
import NavBar from "../Components/NavBar/NavBar"
import { selectCurrentProject, selectCurrentUserId, selectCurrentProjectId } from '../Reducers/Selectors';
import { Typography, Link, Breadcrumbs } from "@material-ui/core"
import { getUserAndProjectData } from "../Actions/user.actions"
import { chainGetProjectData } from "../Actions/project.actions"


export default function Board() {
    const dispatch = useDispatch()
    const currentProjectId = useSelector(selectCurrentProjectId)
    const projectName = useSelector(selectCurrentProject) ? useSelector(selectCurrentProject).name : ""
    const currentUserId = useSelector(selectCurrentUserId)

    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (currentUserId === "") {
            dispatch(getUserAndProjectData())
        }
    }, [])

    useEffect(() => {
        if (currentUserId !== "" && projectName) {
            dispatch(chainGetProjectData(currentProjectId))
        }
    }, [projectName])


    return (
        <div className={open ? "main drawer-close" : "main drawer-open"}>
            <NavBar openDrawer={() => setOpen(true)} />
            <Drawer handleClick={setOpen} open={open}>
                <DrawerInner currentLocation="board" />
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
