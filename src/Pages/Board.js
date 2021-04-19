import React, { useEffect, Suspense } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { mockgetUserAndProjectData } from "../actions/user.actions"
import { selectCurrentProjectName, selectCurrentUserId } from '../reducers/selectors';
import { Typography, Link, Breadcrumbs } from "@material-ui/core"
import DrawerContainer from "../components/drawer/drawerContainer"
const DragContext = React.lazy(() => import("../components/dragDrop/dragContext"))

export default function Board() {
    const dispatch = useDispatch()
    const projectName = useSelector(selectCurrentProjectName)
    const currentUserId = useSelector(selectCurrentUserId)

    useEffect(() => {
        if (currentUserId === "") {
            dispatch(mockgetUserAndProjectData())
        }
        // eslint-disable-next-line
    }, [])

    return (
        <DrawerContainer type="board" currentLocation="board">
            <Breadcrumbs aria-label="breadcrumb" className="bread-crumbs" >
                <Link color="inherit" href="/projects">Projects</Link>
                <Typography color="textPrimary">{projectName ? projectName : ""}</Typography>
            </Breadcrumbs>
            <p>{projectName} Board</p>
            <Suspense fallback={<div>loading...</div>}>
                <DragContext />
            </Suspense>
        </DrawerContainer>
    )
}