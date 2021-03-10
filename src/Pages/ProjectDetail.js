import React, { useEffect, Suspense } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentProject, selectUsers } from "../reducers/Selectors"
import { updateProjectDetail } from "../Actions/project.actions"
import DrawerContainer from "../Components/Drawer/DrawerContainer"
import history from "../history"
const UpdateProjectFormHOC = React.lazy(() => import("../Components/Forms/UpdateProjectForm"))

const ProjectDetail = () => {
    const dispatch = useDispatch()
    const project = useSelector(selectCurrentProject)
    const members = useSelector(selectUsers)

    useEffect(() => {
        if (!project) { history.push("/") }
    }, [project])

    const submitForm = values => {
        const formattedValues = { ...values, members: project.members }
        dispatch(updateProjectDetail(formattedValues))
    }

    return (
        <DrawerContainer type="projectDetail" currentLocation="detail">
            <Suspense fallback={<div>loading...</div>}>
                {!project ? <p>Loading</p> : <UpdateProjectFormHOC members={members} project={project} onContinue={submitForm} />}
            </Suspense>
        </DrawerContainer>
    )
}

export default ProjectDetail;