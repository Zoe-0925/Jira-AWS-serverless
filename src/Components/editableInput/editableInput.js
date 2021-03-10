import React from 'react'
import { TextareaAutosize } from '@material-ui/core';
import { Container, Row } from "reactstrap"
import { SubmitCancelButtonSet } from "../buttons/buttons"

export function Input({ state, setState, setEdit, handleSubmit }) {

    return (
        <input
            name={state.name}
            type={state.type}
            value={state.value}
            className="editable-input"
            autoFocus
            onChange={event => {
                setState({ ...state, value: event.target.value })
            }}
            onBlur={event => {
                setEdit(false)
                setState({ ...state, value: state.backup })
            }}
            onKeyUp={event => {
                if (event.key === 'Escape') {
                    setEdit(false)
                    setState({ ...state, value: state.backup })
                }
                if (event.key === 'Enter') {
                    setEdit(false)
                    handleSubmit(event.target.value)
                }
            }}
        />
    )
}

export function TextareaWithActionBtns({ isSubmitting, handleChange, handleCancel, handleSave, value }) {
    return (
        <Container>
            <Row>
                <TextareaAutosize
                    className="textarea"
                    name="description"
                    type="text"
                    variant="outlined"
                    onChange={(e) =>  handleChange(e.target.value) }
                    aria-label="minimum height"
                    rowsMin={5}
                    defaultValue={value}
                />
            </Row>
            <SubmitCancelButtonSet rowClassName="action-btns" isSubmitting={isSubmitting} handleSave={handleSave} handleCancel={handleCancel} submitLabel="Save" />
        </Container>
    )
}

//Accepts an input or textare and returns an editable text box
export function EditableText({ edit, text, setEdit, className, ...props }) {

    return (
        <div className={"editable " + className}>
            {edit ? props.children : <p onClick={() => setEdit(true)}>{text}</p>}
        </div>
    )
}




export const EditableInput = ({
    state,
    edit,
    setEdit,
    className,
    name,
    handleUpdate,
    handleSubmit
}) => (
    <EditableText className={className} name={name}
        setEdit={setEdit} edit={edit} text={state.value}>
        <Input state={state} setState={handleUpdate} setEdit={setEdit} handleSubmit={handleSubmit} />
    </EditableText>
)