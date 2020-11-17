import React from 'react'
import { useSelector } from "react-redux"
import { EditableText, Input, TextareaWithActionBtns } from "../Shared/EditableText"
import { useEditText } from "../Shared/CustomHooks"
import { selectLoadingReducer } from '../../Reducers/Selectors';
import { updateIssueAttribute } from '../../Actions/issue.actions';

export function IssueSummaryInput({ id, summary }) {
    const { state, setState, edit, setEdit } = useEditText(summary)
    const dispatch = useDispatch()

    const updateSummary = (value) => {
        setState(value)
        dispatch(updateIssueAttribute({ _id: id, attribute: "summary", value: value }))
    }

    return (
        <EditableText name="issue-summary" className="board-name"
            setEdit={setEdit} edit={edit} text={state.value}>
            <Input state={state} setState={updateSummary} setEdit={setEdit} />
        </EditableText>
    )
}

export function IssueDescriptionInput({ id, description }) {
    const { state, setState, edit, setEdit } = useEditText(description)
    const dispatch = useDispatch()

    const updateDesciption = () => {
        setTimeout(dispatch(updateIssueAttribute({ _id: id, attribute: "description", value: state })), 1000)
    }

    const loading = useSelector(selectLoadingReducer).loading

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

