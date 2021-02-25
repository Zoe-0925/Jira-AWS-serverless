import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import DragContext from "../Components/DragDrop/DragContext"
import { selectCurrentProjectName } from '../Reducers/Selectors';
import { Typography, Link, Breadcrumbs } from "@material-ui/core"
import { mockgetUserAndProjectData } from "../Actions/user.actions"
import DrawerContainer from "../Components/Drawer/DrawerContainer"
//import BoardFilterList from "../Components/Filters/BoardFilterList"

export default function Board() {
    const dispatch = useDispatch()
    const projectName = useSelector(selectCurrentProjectName)
 
    useEffect(() => {
        dispatch(mockgetUserAndProjectData())
        // eslint-disable-next-line
    }, [])

    return (
        <DrawerContainer type ="board" currentLocation="board">
            <Breadcrumbs aria-label="breadcrumb" className="bread-crumbs" >
                <Link color="inherit" href="/projects">Projects</Link>
                <Typography color="textPrimary">{projectName ? projectName : ""}</Typography>
            </Breadcrumbs>
            <p>{projectName} Board</p>
            <DragContext />
        </DrawerContainer>
    )
}

//    <BoardFilterList />