import React,{useState} from 'react'
import Column from "./Column"
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import { useSelector, useDispatch } from "react-redux"
import { createStatus } from "../../Actions/status.actions"
import { selectCurrentProjectId } from "../../Reducers/Selectors"

export default function StatusCreate() {
    //TODO
    //after editting, create a new status
    const [showNewEditable, setShowEditable] = useState(false)
    const dispatch = useDispatch()
    const currentProjectId = useSelector(selectCurrentProjectId)

    const createNewColumn = (statusName) => {
        const status = {
            name: statusName,
            project: currentProjectId,
            issues: []
        }
        dispatch(createStatus(status))
    }

    return (
        <div className="add-column-icon">
            {!showNewEditable && <AddBoxRoundedIcon onClick={() => setShowEditable(true)} />}
            {showNewEditable && <Column initialStatus={{ name: "", project: "", issues: [] }} />}
        </div>
    )   //TODO
    //Add a submit editable to the column title.....
}
