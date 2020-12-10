import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Drawer from "../Components/Drawer/Drawer"
import { DrawerLinks} from "../Components/Drawer/DrawerLinks"
import DragContext from "../Components/DragDrop/DragContext"
import NavBar from "../Components/NavBar/NavBar"
import { selectCurrentProject } from '../Reducers/Selectors';
import { Typography, Link, Breadcrumbs } from "@material-ui/core"
import { APPEND_ISSUES } from "../Actions/issue.actions"
import { APPEND_LABELS } from "../Actions/label.actions"

const mockUser = { _id: "testUserId", name: "Calvin Harris", projects: [], email: "calvinHarris@gmail.com" }
const mockProjects = [{
    _id: "test id",
    name: "test project name",
    key: "test key",
    lead: "testUserId",
    members: ["testUserId"],
    image: "",
    default_assignee: "Project Lead",
    start_date: "",
    statusOrder: ["1", "2", "3", "4"]
}]
const mockLabels = [{ project: "test id", name: "UI", _id: "label1" }, { project: "test id", name: "DB", _id: "label2" }, { project: "test id", name: "deployment", _id: "label3" }]
const mockIssues = {
    tasks: [{
        _id: "hdkahdjaskdh", summary: "Deploy the server on AWS", key: "test key 1", labels: ["deployment"], assignee: "testUserId",
        issueType: "task", flag: false, reporter: "Jira Outlook", project: "test id", status: "1"
    }, {
        _id: "389eahskhwe238e", summary: "Draw the wireframe", key: "test key 2", labels: ["UI"], assignee: "testUserId",
        issueType: "task", flag: false, reporter: "Jira", project: "test id", status: "1"
    }], epics: [{
        _id: "d29ehasdhwlietqwd", summary: "UI Design", key: "test epic 1", issueType: "epic", reporter: "Slack", project: "test id"
    }, {
        _id: "29898qsugdq7dt", summary: "Deployment", key: "test epic 2", issueType: "epic", reporter: "Slack", project: "test id"
    }]
}
const mockStatus = [{ _id: "1", name: "TO DO", issues: ["hdkahdjaskdh"] },
{ _id: "2", name: "IN PROGRESS", issues: [] },
{ _id: "3", name: "DONE", issues: ["389eahskhwe238e"] },
{ _id: "4", name: "TEST", issues: [] }
]


export default function BoardDemo() {
    const dispatch = useDispatch()
    const projectName = useSelector(selectCurrentProject) ? useSelector(selectCurrentProject).name : ""
    const [open, setOpen] = useState(true);

    useEffect(() => {
        Promise.all([
            dispatch(login(mockUser)),
            dispatch({
                type: APPEND_PROJECTS,
                data: mockProjects //an array
            }),
            dispatch({
                type: APPEND_ISSUES,
                data: { tasks: mockIssues.tasks, epics: mockIssues.epics, subtasks: [] }
            }),
            dispatch(appendSuccessStatus(mockStatus)),
            dispatch({
                type: APPEND_LABELS,
                data: mockLabels
            })
        ])
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
