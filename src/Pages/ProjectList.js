import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Typography, Breadcrumbs } from '@material-ui/core';
import { getAllProjects, setCurrentProject } from "../Actions/project.actions"
import { addStatusOrder } from "../Actions/Status.actions"
import { selectAllProjects } from "../Reducers/Selectors"
import NavBar from "../Components/NavBar/NavBar"

export default function ProjectList() {
    const dispatch = useDispatch()
    const projects = useSelector(selectAllProjects)

    const fetchBoardPage = (projectId) => {
        await Promise.all(
            dispatch(setCurrentProject(projectId)),
            dispatch(addStatusOrder(projectId))
        )
        history.push("/board")
    }

    useEffect(() => {
        if (projects.length === 0) {
            dispatch(getAllProjects())
        }
    }, []
    )

    return (
        <div className={open ? "main drawer-close" : "main drawer-open"}>
            <NavBar />
            <Drawer handleClick={setOpen} open={open}>
                <DrawerInner currentLocation="board" />
            </Drawer>
            <Breadcrumbs aria-label="breadcrumb" className="bread-crumbs" >
                <Typography color="textPrimary">Projects</Typography>
            </Breadcrumbs>
            <p>Project list</p>
        </div>
    )
}
