import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { EditableText, TextareaWithActionBtns } from "../EditableInput/EditableInput"
import { useEditText } from "../Hooks/Hooks"
import { selectLoading } from '../../Reducers/Selectors';
import { updateIssueAttribute } from '../../Actions/issue.actions';
import { EditableInput } from "./EditableInput"

export function IssueSummaryInput({ id, summary }) {
    const { state, setState, edit, setEdit } = useEditText(summary)
    const dispatch = useDispatch()

    const updateSummary = (value) => {
        if (state.value !== state.backup) {
            setState(value)


            //TODO
            //need updatedAt
            dispatch(updateIssueAttribute({ _id: id, attribute: "summary", value: value.value }))
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
        if (state.value !== state.backup) {


            //TODO
            //Need updatedAt
            setTimeout(dispatch(updateIssueAttribute({ _id: id, attribute: "description", value: state.value })), 1000)
        }
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
                handleCancel={cancel} handleSave={updateDesciption} />
        </EditableText>
    )
}

