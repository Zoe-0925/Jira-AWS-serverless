import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { createStatus } from "../../Actions/mockStatusActions"
//TODO swap
//import {createStatus} from "../../Actions/StatusActions"
import { getUserByIds } from "../../Actions/mockUserActions"
import { selectCurrentProject, selectCurrentUser } from "../../Reducers/Selectors"




export function useCreateStatus(statusId) {
    const dispatch = useDispatch()
    const currentProject = useSelector(selectCurrentProject)

    const createNewColumn = (statusName) => {
        const status = {
            name: statusName,
            project: currentProject,
            issues: []
        }
        dispatch(createStatus(status))
    }

    return { createNewColumn }
}

export function useTaskController() {
    const openTaskDetail = (id) => {
        //TODO
        //get the task object from the state
        //change the modal open status
        //and pop the task data into the modal
    }

    //Handle issue modal state

    return { openTaskDetail }
}

export const useIssueDetailModal = () => {
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [issueOpened, setIssue] = useState("")
    
    const openTaskDetail = (task) => {
        setOpen(true)
        setIssue(task)
        if (task.assignee === task._id && task.reportee === task._id) { return }
        dispatch(getUserByIds([task.assignee, task.reportee]))
    }

    return { open, setOpen, issueOpened,  openTaskDetail}

}