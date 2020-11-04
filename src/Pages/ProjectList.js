import React, { useState } from 'react'
import ProjectListTable from "../Components/Project/ProjectListTable"
import NavBar from "../Components/NavBar/NavBar"
import { ProjectCreateHOC } from "../Components/Project/ProjectCreate"

const ProjectList = () => {
    const [isCreateProjectOpen, setOpenCreateProject] = useState(false)

    return (<div className="main drawer-open">
        <NavBar />
        <p align="left" className="project-list-title">Project</p>
        <Button align="right" className="create-pj-btn" onClick={() => setOpenCreateProject(true)}>Create project</Button>
        <ProjectListTable />
        <ProjectCreateHOC open={isCreateProjectOpen} setOpen={setOpenCreateProject} />
    </div>)
}

export default ProjectList