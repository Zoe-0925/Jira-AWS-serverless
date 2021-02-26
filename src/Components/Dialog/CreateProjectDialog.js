import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUserId } from "../../Reducers/Selectors"
import { chainCreactProject } from "../../Actions/project.actions"
import { initiateProjectAndStatus } from "../Util"
import CreateProjectFormHOC from "../Forms/CreateProjectForm"
import { MyDialog } from "./Dialog"

const CreateProjectDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch()
    const userId = useSelector(selectCurrentUserId)

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