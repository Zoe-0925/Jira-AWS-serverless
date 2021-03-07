import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { EditableText, TextareaWithActionBtns } from "../EditableInput/EditableInput"
import { useEditText } from "../Hooks/Hooks"
import { selectLoading } from '../../Reducers/Selectors';
import { updateTaskAttribute } from '../../Actions/issue.actions';
import { EditableInput } from "./EditableInput"
import { generateDateString } from "../Util"

export function IssueSummaryInput({ id, summary }) {
    const { state, setState, edit, setEdit } = useEditText(summary)
    const dispatch = useDispatch()

    const updateSummary = (value) => {
        if (state.value !== state.backup) {
            setState(value)
            dispatch(updateTaskAttribute({ _id: id, attribute: "summary", updatedAt: generateDateString(), value: value.value }))
        }
    }

    return (
        <EditableInput className="issue-summary" name="issue-summary" setEdit={setEdit}
            edit={edit} text={state.value} state={state} handleUpdate={updateSummary} setEdit={setEdit} />
    )
}

export function IssueDescriptionInput({ id, description }) {
    const { state, setState, edit, setEdit } = useEditText(description !== "" ? description : "Add a description...")
    const dispatch = useDispatch()

    const updateDesciption = () => {
        console.log("saved")
        dispatch(updateTaskAttribute({ _id: id, attribute: "description", updatedAt: generateDateString(), value: state.value }))
    }

    const loading = useSelector(selectLoading)

    const cancel = () => {
        setState({ ...state, value: state.backup })
        setEdit(false)
    }

    return (
        <EditableText name="issue-description" className="issue-description"
            setEdit={setEdit} edit={edit} text={state.value} >
            <TextareaWithActionBtns isSubmitting={loading} handleChange={value => setState(value)}
                handleCancel={cancel} handleSave={updateDesciption} value={description} />
        </EditableText>
    )
}

