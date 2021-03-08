import React from 'react'
import { useEditText } from '../Hooks/Hooks';
import { EditableText, Input } from "../EditableInput/EditableInput"
import { Row, Col } from "reactstrap"
import Avatar from '@material-ui/core/Avatar';

export default function CommentInput({ currentUser, handleSubmit }) {
    const { state, setState, edit, setEdit } = useEditText("Add a comment...")

    const handleSave = (value) => {
        setState(value)
        handleSubmit(value)
        setEdit(false)
    }

    return (
        <div className="CommentInput">
            <Row>
                <Col xs={2}>
                    <Avatar className="avatar" alt={currentUser.name || "Author"} src={currentUser.avatar} />
                </Col>
                <Col xs={10}>
                    <EditableText name="comment-input" className="comment-input"
                        edit={edit} text="Add a comment..." setEdit={setEdit}>
                      <Input name="status-title-input" state={state} setState={setState} setEdit={setEdit} 
                      handleSubmit={handleSave } />
                    </EditableText>
                </Col>
            </Row>
        </div>
    )
}
