import React from 'react'
import ProjectListTable from "../Components/Project/ProjectListTable"
import NavBar from "../Components/NavBar/NavBar"

const ProjectList = () => <div className="main drawer-open">
    <NavBar />
    <p className="project-list-title">Project</p>
    <ProjectListTable />
</div>

export default ProjectList