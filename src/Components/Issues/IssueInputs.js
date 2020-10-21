import React from 'react'
import { EditableText, Input, TextareaWithActionBtns } from "../Shared/EditableText"
import { useEditText } from "../Shared/CustomHooks"

export function IssueSummaryInput({ summary }) {
    const { state, setState, edit, setEdit } = useEditText(summary)

    //TODO
    //state.value on change, save to the state and call the api

    const updateSummary = () => {

    }

    return (
        <EditableText name="issue-summary" className="board-name" style="summary"
            setEdit={setEdit} edit={edit} text={state.value}>
            <Input state={state} setState={setState} setEdit={setEdit} handleSubmit={updateSummary} />
        </EditableText>
    )
}

export function IssueDescriptionInput({ id, description }) {
    const { state, setState, edit, setEdit } = useEditText(description)

    const updateDesciption = () => {

    }

    const isSubmitting = false
    //TODO
    // select loading from the store

    const cancel = () => {
        setState({ ...state, value: state.backup })
        setEdit(false)
    }

    return (
        <EditableText name="issue-description" className="issue-description"
            setEdit={setEdit} edit={edit} text={state.value} >
            <TextareaWithActionBtns isSubmitting={isSubmitting} handleChange={value => setState(value)}
                handleCancel={cancel} handleSave={updateDesciption} />
        </EditableText>
    )
}

