import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentProject, selectUsers } from "../Reducers/Selectors"
import { updateProjectDetail } from "../Actions/project.actions"
import UpdateProjectFormHOC from '../Components/Forms/UpdateProjectForm';
import DrawerContainer from "../Components/Drawer/DrawerContainer"

const ProjectDetail = () => {
    const dispatch = useDispatch()
    const project = useSelector(selectCurrentProject)  //bug. Select current project
    const members = useSelector(selectUsers)

    const submitForm = values => {
        const formattedValues = { ...values, members: project.members }
        dispatch(updateProjectDetail(formattedValues))
    }

    return (
        <DrawerContainer type="projectDetail" currentLocation="detail">
            {!project ? <p>Loading</p> : <UpdateProjectFormHOC members={members} project={project} onContinue={submitForm} />}
        </DrawerContainer>
    )
}

export default ProjectDetail;