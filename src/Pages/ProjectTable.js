import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import ProjectListTable from "../Components/Project/ProjectTable"
import NavBar from "../Components/NavBar/NavBar"
import { Row, Col } from "reactstrap"
import { selectCurrentUserId } from "../Reducers/Selectors"
import { mockgetUserAndProjectData } from "../Actions/user.actions"

const ProjectTable = () => {
    const dispatch = useDispatch()
    const currentUserId = useSelector(selectCurrentUserId)

    useEffect(() => {
        if (currentUserId === "") {
            dispatch(mockgetUserAndProjectData())
        }
    }, [])

    return (
        <div className="main">
            <NavBar />
            <div className="body">
                <Row>
                    <Col md="1">  <p align="left" className="project-list-title">Project</p></Col>
                    <Col ml="auto"></Col>
                </Row>
                <ProjectListTable />
            </div>
        </div>
    )
}

export default ProjectTable