import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import ProjectListTableHOC from "../components/projectTable/projectTableHOC"
import NavBar from "../components/shared/navBar"
import { Row, Col } from "reactstrap"
import { selectCurrentUserId } from "../reducers/selectors"
import { mockgetUserAndProjectData } from "../actions/user.actions"
import { loadProjectTablePage } from "../actions/loading.actions"

const ProjectTable = () => {
    const dispatch = useDispatch()
    const currentUserId = useSelector(selectCurrentUserId)

    useEffect(() => {
        if (currentUserId === "") {
            dispatch(mockgetUserAndProjectData())

            //TODO: Uncomment to switch
            //dispatch(loadProjectTablePage())
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
                <ProjectListTableHOC />
            </div>
        </div>
    )
}

export default ProjectTable