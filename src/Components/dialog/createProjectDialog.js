import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUserId } from "../../Reducers/selectors"
import { chainCreactProject } from "../../actions/project.actions"
import { initiateProjectAndStatus } from "../util"
import CreateProjectFormHOC from "../forms/createProjectForm"
import { MyDialog } from "./dialog"

const CreateProjectDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch()
    const userId = useSelector(selectCurrentUserId)

    //TODO fix
    const submitForm = values => {
        const { project, statusList } = initiateProjectAndStatus(values, userId)
        dispatch(chainCreactProject(project, statusList))
        setOpen(false)
    }

    return <MyDialog fullScreen={true} open={open} handleClose={() => setOpen(false)}    >
        <CreateProjectFormHOC onContinue={submitForm} handleClose={() => setOpen(false)} />
    </MyDialog>
}

export default CreateProjectDialog