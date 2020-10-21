import React from 'react'
import NavBreadcrumbs from "../Components/NavBar/NavBreadcrumbs"
import FilterManager from "../Components/Filters/FilterManager"
import Drawer from "../Components/SideDrawer/Drawer"
import { DrawerInner } from "../Components/SideDrawer/DrawerInner"
import { useEditText } from "../Components/Shared/CustomHooks"
import { EditableText, Input } from "../Components/Shared/EditableText"
import DragContext from "../Components/Column/DragContext"
import NavAppBar from "../Components/NavBar/NavAppBar"


export default function Board() {
    //TODO get project id and name, and then replace the "My EC"
    const { state, setState, edit, setEdit } = useEditText("My EC")
    const [open, setOpen] = React.useState(true);

    return (
        <div className={open ? "main drawer-close" : "main drawer-open"}>
                <NavAppBar/>
            <Drawer handleClick={setOpen} open={open}>
                <DrawerInner currentLocation="board" />
            </Drawer>
            <NavBreadcrumbs/>
            <EditableText name="epic-summary" className="board-name"
                setEdit={setEdit} edit={edit} value={state}>
                <Input state={state} setState={setState} setEdit={setEdit} />
            </EditableText>
            <FilterManager />
            <DragContext />
        </div>
    )
}
