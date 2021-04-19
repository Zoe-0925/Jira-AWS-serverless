import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useEditText } from "../hooks/hooks"
import { selectLoading } from '../../reducers/selectors';
import { updateTaskAttribute } from '../../actions/issue.actions';
import { EditableInput } from "./editableInput"
import { generateDateString } from "../util"
import RichTextArea from "./richTextArea"
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { SubmitCancelButtonSet } from "../buttons/buttons"

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
    const dispatch = useDispatch()
    const [hideInput, setHide] = useState(true)
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty())
    const loading = useSelector(selectLoading)

    useEffect(() => {
        if (description && description !== "") {
            const parsed = JSON.parse(description)
            const converted = convertFromRaw(parsed)
            setEditorState(EditorState.createWithContent(converted))
        }

    }, [description])

    const submit = () => {
        let newDescription = convertToRaw(editorState.getCurrentContent())
        newDescription = JSON.stringify(newDescription)
        console.log("newDescription", newDescription)
        if (newDescription !== description) {
            dispatch(updateTaskAttribute({ _id: id, attribute: "description", updatedAt: generateDateString(), value: newDescription }))
        }
        setHide(true)
    }

    const showRichTextArea = () => {
        if (hideInput) {
            setHide(false)
        }
    }

    return (
        <>
            <RichTextArea onClick={showRichTextArea} editorState={editorState} onBlur={() => setHide(true)}
                setEditorState={setEditorState} readOnly={hideInput} />
            {!hideInput && <SubmitCancelButtonSet isSubmitting={loading} handleSave={submit} handleCancel={() => setHide(true)} />}
        </>
    )
}