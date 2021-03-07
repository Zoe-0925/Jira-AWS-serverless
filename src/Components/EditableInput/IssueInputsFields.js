import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { EditableText, TextareaWithActionBtns } from "../EditableInput/EditableInput"
import { useEditText } from "../Hooks/Hooks"
import { selectLoading } from '../../Reducers/Selectors';
import { updateTaskAttribute } from '../../Actions/issue.actions';
import { EditableInput } from "./EditableInput"
import { generateDateString } from "../Util"
import RichTextArea from "./RichTextArea"
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';

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
            edit={edit} text={state.value} state={state} handleUpdate={updateSummary} />
    )
}

export function IssueDescriptionInput({ id, description }) {
    const { state, setState, edit, setEdit } = useEditText(description !== "" ? description : "Add a description...")
    const dispatch = useDispatch()

    const updateDesciption = () => dispatch(updateTaskAttribute({ _id: id, attribute: "description", updatedAt: generateDateString(), value: state.value }))

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


export function NewIssueDescriptionInput({ id, description }) {
    const dispatch = useDispatch()

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty())

    useEffect(() => {
        if (description && description !== "") {
            setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(description))))
        }
    }, [description])

    const submit = () => {
        let newDescription = convertToRaw(editorState.getCurrentContent())
        newDescription = JSON.stringify(newDescription)
        dispatch(updateTaskAttribute({ _id: id, attribute: "description", updatedAt: generateDateString(), value: newDescription }))
    }

    const loading = useSelector(selectLoading)

    return (
        <>
            <RichTextArea editorState={editorState} setEditorState={setEditorState} />

        </>
    )
}
