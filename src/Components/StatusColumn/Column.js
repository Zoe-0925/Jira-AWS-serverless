import React from 'react'
/**--------------Redux-------------- */
import { useDispatch, useSelector } from "react-redux"
import { updateStatusName, chaninDeleteStatus } from "../../Actions/status.actions"
import { chainCreateIssueAndUpdateIssueOrder } from "../../Actions/issue.actions"
import { selectLoading } from '../../Reducers/Selectors';
/**--------------UI-------------- */
import { MenuItem, CircularProgress } from '@material-ui/core';
import { AddTab, DotIconMenu } from "../Shared/Tabs"
import { EditableText, Input } from "../Shared/EditableText"
import { WarningFeedback } from "../Shared/Feedback"
/**--------------Util-------------- */
import { useEditText, useDotIconMenu } from '../Shared/CustomHooks';
import { v4 as uuidv4 } from 'uuid'

export function ColumnTitle({ id = "", name = "" }) {
    const { state, setState, edit, setEdit } = useEditText(name)
    const dispatch = useDispatch()
    const [showWarning, setShowWarning] = React.useState(false)

    const { anchorEl, isOpen, anchorRef, handleMenuClose, handleMenuOpen } = useDotIconMenu()

    // , displayNumber 
    //Filter:
    // props.displayNumber? {props.displayNumber + " of " + status.issues.length


    return (
        <div className="flex-row epic-title" id={id}>
            <EditableText name="epic-summary" className="epic-summary"
                edit={edit} text={state.value || name} setEdit={setEdit}>
                <Input name="status-title-input" state={state} setState={setState} setEdit={setEdit} handleSubmit={() => {
                    dispatch(updateStatusName({ _id: id, value: state.value, attribute: "name" }))
                }} />
            </EditableText>
            <DotIconMenu className="dot-icon" anchorEl={anchorEl} isOpen={isOpen} anchorRef={anchorRef}
                handleMenuClose={handleMenuClose} handleMenuOpen={handleMenuOpen}>
                <MenuItem>Set column limit</MenuItem>
                <MenuItem onClick={() => setShowWarning(true)}>Delete</MenuItem>
            </DotIconMenu>
            {
                showWarning && <WarningFeedback title="Deleting this column will remove all issues inside" message="Do you want to delete all issues?"
                    handleClose={() => setShowWarning(false)} handleConfirm={() => dispatch(chaninDeleteStatus(id))} />
            }
        </div>
    )
}

export const Column = ({ loading, initialStatus = { _id: "", name: "" }, state, setState, edit, setEdit, handleSubmit, children }) => (
    <div className="epic-box" key={uuidv4()}>
        <ColumnTitle id={initialStatus._id} name={initialStatus.name} />
        {children}
        {loading ? <CircularProgress className="editable-input" /> : !edit ? <AddTab operationName="Create issue" handleClick={() => { setEdit(true) }} className="create-issue-tab" />
            : <Input state={state} name="create-task-input" setState={setState} setEdit={setEdit} handleSubmit={() => handleSubmit(state.value)} />}
    </div>
)

export default function ColumnContainer({ initialStatus = { _id: "", project: "", issues: [] }, children }) {
    const dispatch = useDispatch()
    const { state, setState, edit, setEdit } = useEditText("")
    const loading = useSelector(selectLoading)

    const handleSubmit = (value) => {
        let issue = {
            _id: uuidv4(), description: "", issueType: "task", labels: [], assignee: "", reporter: "",
            status: initialStatus._id, project: initialStatus.project, summary: value
        }
        dispatch(chainCreateIssueAndUpdateIssueOrder(issue, initialStatus.issues))
        setEdit(false)
    }

    return <Column loading={loading} initialStatus={initialStatus} state={state} setState={setState}
        edit={edit} setEdit={setEdit} handleSubmit={handleSubmit} children={children} />
}
