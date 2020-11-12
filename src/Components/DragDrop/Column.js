import React from 'react'
import { useDispatch } from "react-redux"
import { MenuItem } from '@material-ui/core';
import { AddTab, DotIconMenu } from "../Shared/Tabs"
import { updateSuccessfulStatus, deleteSuccessfulStatus } from "../../Actions/status.actions"
import { chainCreateIssueAndUpdateIssueOrder } from "../../Actions/issue.actions"
import { addCreateAndUpdateDate } from "../Util"
import { v4 as uuidv4 } from 'uuid'
/**--------------Editable Textfiled-------------- */
import { EditableText, Input, Textarea } from "../Shared/EditableText"
/**--------------Icons-------------- */
import { useEditText, useDotIconMenu } from '../Shared/CustomHooks';

//ColumnTitle tracks the "Status" model
export function ColumnTitle({ status }) {
    const { state, setState, edit, setEdit } = useEditText(status.name || "")
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isOpen = Boolean(anchorEl);
    const anchorRef = React.useRef(null);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div className="flex-row epic-title" id={status !== undefined ? status._id : ""}>
            <EditableText name="epic-summary" className="epic-summary"
                edit={edit} text={state.value || status.name} setEdit={setEdit}>
                <Input name="status-title-input" state={state} setState={setState} setEdit={setEdit} handleSubmit={() => {
                    dispatch(updateSuccessfulStatus(state.value))
                }} />
            </EditableText>
            <DotIconMenu className="dot-icon" anchorEl={anchorEl} isOpen={isOpen} anchorRef={anchorRef}
                handleMenuClose={handleMenuClose} handleMenuOpen={handleMenuOpen}>
                <MenuItem>Set column limit</MenuItem>
                <MenuItem onClick={() => dispatch(deleteSuccessfulStatus(status.id))}>Delete</MenuItem>
            </DotIconMenu>
        </div>
    )
}

export default function Column({ initialStatus, ...props }) {
    const dispatch = useDispatch()
    const { state, setState, edit, setEdit } = useEditText("")

    const handleSubmit = (value) => {
        let issue = { ...addCreateAndUpdateDate({ _id: uuidv4(), description: "", status: initialStatus._id, project: initialStatus.project, summary: value }) }
        dispatch(chainCreateIssueAndUpdateIssueOrder(issue))
        setEdit(false)
    }

    return (<div className="epic-box">
        {initialStatus && <ColumnTitle status={initialStatus} />}
        {props.children}
        {!edit ? <AddTab operationName="Create issue" handleClick={() => { setEdit(true) }} className="create-issue-tab" />
            : <Input state={state} name="create-task-input" setState={setState} setEdit={setEdit} handleSubmit={() => handleSubmit(state.value)} />}
    </div>)
}

/**
 *         <Textarea state={state} setState={setState} setEdit={setEdit}
                handleSubmit={() => { createNewTask(state) }} />
 */