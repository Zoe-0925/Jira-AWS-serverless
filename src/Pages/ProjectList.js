import React, { useState } from 'react'
import ProjectListTable from "../Components/Project/ProjectListTable"
import NavBar from "../Components/NavBar/NavBar"
import { ProjectCreateHOC } from "../Components/Project/ProjectCreate"
import { Button } from '@material-ui/core'
import { Row, Col } from "reactstrap"

const ProjectList = () => {
    const [isCreateProjectOpen, setOpenCreateProject] = useState(false)

    return (<div className="main">
        <NavBar />
        <div className="body">
            <Row>
                <Col md="1">  <p align="left" className="project-list-title">Project</p></Col>
                <Col ></Col>
                <Col md="2">  <Button align="right" className="create-pj-btn" onClick={() => setOpenCreateProject(true)}>Create project</Button></Col>
            </Row>
            <ProjectListTable />
            <ProjectCreateHOC open={isCreateProjectOpen} setOpen={setOpenCreateProject} />
        </div>
    </div>)
}

export default ProjectList