import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setCurrentProject, chainDeleteProject } from "../../Actions/project.actions"
import { selectAllUsers, selectAllProjects, selectLoading } from "../../Reducers/Selectors"
import history from "../../history"
import { v4 as uuidv4 } from 'uuid'
import ProjectTable from "./ProjectTable"

export default function ProjectTableHOC() {
    const loading = useSelector(selectLoading)
    let projects = useSelector(selectAllProjects)
    const users = useSelector(selectAllUsers)

    const dispatch = useDispatch()

    const goToBoardPage = (projectId) => {
        dispatch(setCurrentProject(projectId))
        history.push("/projects/board")
    }

    const goToProjectDetail = (projectId) => {
        dispatch(setCurrentProject(projectId))
        history.push("/projects/settings/details")
    }

    const deleteProject = (id) => {
        dispatch(chainDeleteProject(id))
    }

    const tableHeader = ["Name", "Key", "Type", "Lead", ""]

    return <ProjectTable key={uuidv4()} loading={loading} projects={projects} users={users} goToBoardPage={goToBoardPage}
        goToProjectDetail={goToProjectDetail} tableHeader={tableHeader} deleteProject={deleteProject} />
}
