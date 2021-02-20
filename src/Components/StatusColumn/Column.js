import React from 'react'
/**--------------Redux-------------- */
import { useDispatch, useSelector } from "react-redux"
import { chainCreateIssueAndUpdateIssueOrder } from "../../actions/issue.actions"
import { selectLoading } from '../../reducers/selectors';
/**--------------UI-------------- */
import { CircularProgress } from '@material-ui/core';
import { AddTab } from "../shared/tabs"
import { Input } from "../shared/editableText"
import ColumnTitle from "./columnTitle"
/**--------------Util-------------- */
import { useEditText } from '../shared/hooks';
import { v4 as uuidv4 } from 'uuid'
import Issue from "../issues/issue"

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
        <div className="epic-box" key={uuidv4()}>
            <ColumnTitle id={status._id} name={status.name} />
            {children}
            {loading ? <CircularProgress className="editable-input" /> : !edit ? <AddTab operationName="Create issue" handleClick={() => { setEdit(true) }} className="create-issue-tab" />
                : <Input state={state} name="create-task-input" setState={setState} setEdit={setEdit} handleSubmit={() => handleSubmit(state.value)} />}
        </div>
    )
}

export default Column
