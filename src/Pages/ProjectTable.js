import React, { useEffect, Suspense } from 'react'
import { useSelector, useDispatch } from "react-redux"
import NavBar from "../components/navBar/navBar"
import { Row, Col } from "reactstrap"
import { selectCurrentUserId } from "../reducers/selectors"
import { mockgetUserAndProjectData } from "../actions/user.actions"
const ProjectListTableHOC = React.lazy(() => import("../components/projectTable/projectTableHOC"))

const ProjectTable = () => {
    const dispatch = useDispatch()
    const currentUserId = useSelector(selectCurrentUserId)

    useEffect(() => {
        if (currentUserId === "") {
            dispatch(mockgetUserAndProjectData())
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="main">
            <NavBar />
            <div className="body">
                <Row>
                    <Col md="1">  <p align="left" className="project-list-title">Project</p></Col>
                    <Col ml="auto"></Col>
                </Row>
                <Suspense fallback={<div>loading...</div>}>
                    <ProjectListTableHOC />
                </Suspense>
            </div>
        </div>
    )
}

export default ProjectTable