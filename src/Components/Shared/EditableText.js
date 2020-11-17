import React, { Fragment } from 'react'
import { ListItem, Button, TextareaAutosize } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid'
import { Container, Row } from "reactstrap"

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

//TODO: update this to accept an initial edit
//And then it's togglable

export function Textarea({ state, setState, setEdit, handleSubmit }) {
    return (
        <textarea
            name={state.name}
            value={state.value}
            className="editable-textarea"
            autoFocus
            onFocus={event => {
                const value = event.target.value
                event.target.value = ''
                event.target.value = value
                setState({ ...state, backup: state.value })
            }}
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
            rows="5" cols="33" />
    )
}

export function TextareaWithActionBtns({ isSubmitting, handleChange, handleCancel, handleSave }) {
    return (
        <Container>
            <Row>
                <TextareaAutosize
                    className="input-form"
                    name="description"
                    type="text"
                    variant="outlined"
                    onChange={(e) => handleChange(e.target.value)}
                    aria-label="minimum height" rowsMin={5}
                />
            </Row>
            <Row className="action-btns">
                <Button className="navbar-create-btn" disabled={isSubmitting} onClick={handleSave}>Save</Button>
                <Button className="cancel-btn" disabled={isSubmitting} onClick={handleCancel}>Cancel</Button>
            </Row>
        </Container>
    )
}

//Accepts an input or textare and returns an editable text box
export function EditableText({ edit, text, setEdit, className, ...props }) {

    return (
        <Fragment>
            {edit ? props.children : <ListItem button key={uuidv4()} onClick={() => {
                setEdit(true)
            }}>
                <p className={className ? className : "no-class"}> {text}</p>
            </ListItem>
            }
        </Fragment>
    )
}
