import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUserId } from "../../Reducers/Selectors"
import { chainCreactProject } from "../../Actions/project.actions"
import { initiateProjectAndStatus } from "../Util"
import CreateProjectForm from "../Forms/CreateProjectForm"
import { MyDialog } from "../Shared/Dialog"


export const ProjectCreateHOC = ({ open, setOpen }) => {
    const dispatch = useDispatch()
    const userId = useSelector(selectCurrentUserId)

    const submitForm = values => {
        const { project, statusList } = initiateProjectAndStatus(values, userId)
        dispatch(chainCreactProject(project, statusList))
        setOpen(false)
    }

    return <MyDialog fullScreen={true} open={open} handleClose={() => setOpen(false)}    >
        <CreateProjectForm onContinue={submitForm} handleClose={() => setOpen(false)} />
    </MyDialog>
}


