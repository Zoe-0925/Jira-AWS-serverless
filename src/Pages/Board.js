import React from 'react'
import { useSelector } from "react-redux"
import NavBreadcrumbs from "../Components/NavBar/NavBreadcrumbs"
import FilterManager from "../Components/Filters/FilterManager"
import Drawer from "../Components/SideDrawer/Drawer"
import { DrawerInner } from "../Components/SideDrawer/DrawerInner"
import { useEditText } from "../Components/Shared/CustomHooks"
import { EditableText, Input } from "../Components/Shared/EditableText"
import DragContext from "../Components/Column/DragContext"
import NavBar from "../Components/NavBar/NavBar"
import { selectCurrentProjectName } from '../Reducers/Selectors';

export default function Board() {
    const projectName = useSelector(selectCurrentProjectName)
    const { state, setState, edit, setEdit } = useEditText(projectName || "")//project name
    const [open, setOpen] = React.useState(true);

    return (
        <div className={open ? "main drawer-close" : "main drawer-open"}>
            <NavBar />
            <Drawer handleClick={setOpen} open={open}>
                <DrawerInner currentLocation="board" />
            </Drawer>
            <Breadcrumbs aria-label="breadcrumb" className="bread-crumbs" >
                <Link color="inherit" href="/">Projects</Link>
                <Typography color="textPrimary">{projectName}</Typography>
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
