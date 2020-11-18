import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Drawer from "../Components/Drawer/Drawer"
import { DrawerInner } from "../Components/Drawer/DrawerInner"
import { useEditText } from "../Components/Shared/CustomHooks"
import { EditableText, Input } from "../Components/Shared/EditableText"
import DragContext from "../Components/DragDrop/DragContext"
import NavBar from "../Components/NavBar/NavBar"
import { selectCurrentProject, selectCurrentUserId, selectCurrentProjectId, selectLoading } from '../Reducers/Selectors';
import { Typography, Link, Breadcrumbs } from "@material-ui/core"
import { getUserAndProjectData } from "../Actions/user.actions"
import { chainGetProjectData } from "../Actions/project.actions"
import Skeleton from '@material-ui/lab/Skeleton';

export default function Board() {
    const dispatch = useDispatch()
    const currentProjectId = useSelector(selectCurrentProjectId)
    const projectName = useSelector(selectCurrentProject) ? useSelector(selectCurrentProject).name : ""
    const currentUserId = useSelector(selectCurrentUserId)
    const loading = useSelector(selectLoading)

    const { state, setState, edit, setEdit } = useEditText(projectName || "")
    const [open, setOpen] = React.useState(true);

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
            <NavBar />
            <Drawer handleClick={setOpen} open={open}>
                <DrawerInner currentLocation="board" />
            </Drawer>
            <Breadcrumbs aria-label="breadcrumb" className="bread-crumbs" >
                <Link color="inherit" href="/">Projects</Link>
                <Typography color="textPrimary">{projectName ? projectName : ""}</Typography>
            </Breadcrumbs>
            {!loading ? <EditableText name="epic-summary" className="board-name"
                setEdit={setEdit} edit={edit} value={state}>
                <Input state={state} setState={setState} setEdit={setEdit} />
            </EditableText> : <Skeleton variant="text" />}
            <DragContext />
        </div>
    )
}
