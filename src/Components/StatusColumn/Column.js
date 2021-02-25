import React from 'react'
/**--------------Redux-------------- */
import { useDispatch, useSelector } from "react-redux"
import { chainCreateIssueAndUpdateIssueOrder } from "../../Actions/issue.actions"
import { selectLoading } from '../../Reducers/Selectors';
/**--------------UI-------------- */
import { CircularProgress } from '@material-ui/core';
import { AddTab } from "../Shared/Tabs"
import { Input } from "../Shared/EditableText"
import ColumnTitle from "./ColumnTitle"
/**--------------Util-------------- */
import { useEditText } from '../Shared/CustomHooks';
import { v4 as uuidv4 } from 'uuid'
import Issue from "../Issues/Issue"

const Column = ({ status = { _id: "", project: "", issues: [], name: "" }, children }) => {
    const dispatch = useDispatch()
    const { state, setState, edit, setEdit } = useEditText("")
    const loading = useSelector(selectLoading)

    const handleSubmit = (value) => {
        let issue = Issue(value, status._id, status.project, "task")
        dispatch(chainCreateIssueAndUpdateIssueOrder(issue, status.issues))
        setEdit(false)
    }

    return (
        <div className="column" key={uuidv4()}>
            <ColumnTitle id={status._id} name={status.name} />
            {children}
            {loading ? <CircularProgress className="editable-input" /> : !edit ? <AddTab operationName="Create issue" handleClick={() => { setEdit(true) }} className="create-issue-tab" />
                : <Input state={state} name="create-task-input" setState={setState} setEdit={setEdit} handleSubmit={() => handleSubmit(state.value)} />}
       
        </div>
    )
}

export default Column
