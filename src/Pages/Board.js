import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Drawer from "../components/drawer/drawer"
import { DrawerLinks } from "../components/drawer/drawerLinks"
import DragContext from "../components/dragDrop/dragContext"
import NavBar from "../components/shared/navBar"
import { selectCurrentProjectName } from '../reducers/selectors';
import { Typography, Link, Breadcrumbs } from "@material-ui/core"
import { mockgetUserAndProjectData } from "../actions/user.actions"
//import BoardFilterList from "../components/filters/BoardFilterList"

export default function Board() {
    const dispatch = useDispatch()
    const projectName = useSelector(selectCurrentProjectName)
    const [open, setOpen] = useState(true);

    useEffect(() => {
        dispatch(mockgetUserAndProjectData())
        // eslint-disable-next-line
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

//    <BoardFilterList />