import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import FilterManager from "../Components/Filters/FilterManager"
import Drawer from "../Components/Drawer/Drawer"
import { DrawerInner } from "../Components/Drawer/DrawerInner"
import { useEditText } from "../Components/Shared/CustomHooks"
import { EditableText, Input } from "../Components/Shared/EditableText"
import DragContext from "../Components/DragDrop/DragContext"
import NavBar from "../Components/NavBar/NavBar"
import { selectCurrentProjectName, selectCurrentUserId } from '../Reducers/Selectors';
import { Typography, Link, Breadcrumbs } from "@material-ui/core"
import { getUserAndProjectData } from "../Actions/user.actions"
import { chainGetProjectData } from "../Actions/project.actions"

export default function Board() {
    const dispatch = useDispatch()
    const currentProjectId = useSelector(selectCurrentUserId)
    const projectName = useSelector(selectCurrentProjectName)
    const currentUserId = useSelector(selectCurrentUserId)

    const { state, setState, edit, setEdit } = useEditText(projectName || "")
    const [open, setOpen] = React.useState(true);

    useEffect(() => {
        if (currentUserId === "") {
            dispatch(getUserAndProjectData())
        }
        if (currentUserId !== "" && projectName) {
            dispatch(chainGetProjectData(currentProjectId))
        }
    }, [])

    useEffect(() => {
        if (currentUserId !== "" && projectName) {
            dispatch(chainGetProjectData(currentProjectId))
        }
    }, [projectName])

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
