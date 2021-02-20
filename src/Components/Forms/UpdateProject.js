import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentProject, selectAllUsers } from "../../reducers/selectors"
import { updateProjectDetail } from "../../actions/project.actions"
import UpdateProjectFormHOC from "./updateProjectForm"

const UpdateProject = () => {
    const dispatch = useDispatch()
    const project = useSelector(selectCurrentProject)  //bug. Select current project
    const members = useSelector(selectAllUsers)

    const submitForm = values => {
        const formattedValues = { ...values, members: project.members }
        dispatch(updateProjectDetail(formattedValues))
    }

    return (!project ? <p>Loading</p> : <UpdateProjectFormHOC members={members} project={project} onContinue={submitForm} />
    )
}

export default UpdateProject