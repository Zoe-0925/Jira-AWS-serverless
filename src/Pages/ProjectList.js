import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import API from '@aws-amplify/api';
import { Typography, Breadcrumbs } from '@material-ui/core';
import { getAllProjects, setCurrentProject } from "../Actions/project.actions"
import { saveProjectIssues } from "../Actions/issue.actions"
import { saveProjectStatus } from "../Actions/status.actions"
import { saveProjectLabels } from "../Actions/labels.actions"
import { selectAllProjects } from "../Reducers/Selectors"
import NavBar from "../Components/NavBar/NavBar"

export default function ProjectList() {
    const dispatch = useDispatch()
    const projects = useSelector(selectAllProjects)

    const fetchBoardPage = (projectId) => {
        const [issues, status, labels] = await Promise.all(
            API.get("IssueApi", "/issues/project/" + projectId),
            API.get("StatusApi", "/status/project/" + projectId),
            API.get("LabelApi", "/labels/project/" + projectId)
        )
        await Promise.all([
            dispatch(setCurrentProject(projectId)),
            dispatch(saveProjectIssues(issues)),
            dispatch(saveProjectStatus(status, projects.statusOrder)), //TODO need status order from the project object,
            dispatch(saveProjectLabels(labels))
        ]);
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
