import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import FilterManager from "../Components/Filters/FilterManager"
import Drawer from "../Components/SideDrawer/Drawer"
import { DrawerInner } from "../Components/SideDrawer/DrawerInner"
import { useEditText } from "../Components/Shared/CustomHooks"
import { EditableText, Input } from "../Components/Shared/EditableText"
import DragContext from "../Components/Column/DragContext"
import NavBar from "../Components/NavBar/NavBar"
import { selectCurrentProjectName, selectCurrentProjectId, selectCurrentUser, selectProjectReducer } from '../Reducers/Selectors';
import history from "../history"
import {Typography, Link,Breadcrumbs } from "@material-ui/core"

export default function Board() {
    const dispatch = useDispatch()

    const currentUser = useSelector(selectCurrentUser)
    const currentProjectId = useSelector(selectCurrentProjectId)
    const projectReducer = useSelector(selectProjectReducer)

    //TODO
    //Wnat if the project does not exist
    const projectName = currentProjectId !== undefined ? projectReducer.projects.find(item => item._id === currentProjectId).name : ""
    const { state, setState, edit, setEdit } = useEditText(projectName || "")//project name
    const [open, setOpen] = React.useState(true);

    useEffect(() => {
        if (currentUser === undefined) {
            history.push("/")
        } else if (currentProjectId === undefined) {
            history.push("/projects")
        } else if (projectName === undefined) {
            //TODO
            //fetch project resources of the project id.
        }else{
            
        }
    }, [])

    useEffect(() => {

    }, [currentProjectId])

    return (
        <div className={open ? "main drawer-close" : "main drawer-open"}>
            <NavBar />
            <Drawer handleClick={setOpen} open={open}>
                <DrawerInner currentLocation="board" />
            </Drawer>
            <Breadcrumbs aria-label="breadcrumb" className="bread-crumbs" >
                <Link color="inherit" href="/">Projects</Link>
                <Typography color="textPrimary">{projectName ? projectName : ""}</Typography>
            </Breadcrumbs>
            <EditableText name="epic-summary" className="board-name"
                setEdit={setEdit} edit={edit} value={state}>
                <Input state={state} setState={setState} setEdit={setEdit} />
            </EditableText>
            <FilterManager />
            <DragContext />
        </div>
    )
}
