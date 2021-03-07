import React, { useCallback } from 'react'
import { useDispatch } from "react-redux"
import { useEditText } from '../shared/hooks';
import { EditableText, TextareaWithActionBtns } from "../shared/editableText"

export default function CommentInput() {
    const dispatch = useDispatch()
    const { state, setState, edit, setEdit } = useEditText("Add a comment...")
    const isSubmitting = false

    const handleSave = () => {
        //TODO
        //state is a text,
        //so _id, issue, 
       // dispatch(createComment(state))
        //) create comment, 
        //isSubmitting is selected from loading

        //leave the rest of the save state par to the redux

        setEdit(false)
    }


    return (
        <div className="CommentInput">
            <EditableText name="comment-input" className="comment-input"
                edit={edit} text="Add a comment..." setEdit={setEdit}>
                <TextareaWithActionBtns isSubmitting={isSubmitting} handleChange={value => setState(value)}
                    handleCancel={() => { setEdit(false) }} handleSave={handleSave} />
            </EditableText>
        </div>
    )
}
