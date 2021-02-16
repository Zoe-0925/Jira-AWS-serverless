import React, { useState } from 'react'
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import { useSelector, useDispatch } from "react-redux"
import { chainCreateStatus } from "../../Actions/status.actions"
import { selectCurrentProjectId, selectLoading } from "../../Reducers/Selectors"
import { v4 as uuidv4 } from 'uuid'
import {  CircularProgress } from '@material-ui/core';

export function EmptyColumn({ hide }) {
    const dispatch = useDispatch()
    const loading = useSelector(selectLoading)
    const currentProjectId = useSelector(selectCurrentProjectId)

    const handleSubmit = (value) => {
        dispatch(chainCreateStatus({
            _id: uuidv4(), name: value, project: currentProjectId, issues: []
        }))
        hide()
    }

    return (<div className="epic-box">
        <div className="flex-row epic-title" >
            <input
                name="create-status-input"
                type="text"
                className="editable-input"
                autoFocus
                onBlur={event => {
                    hide()
                }}
                onKeyUp={event => {
                    if (event.key === 'Escape') {
                        hide()
                    }
                    if (event.key === 'Enter') {
                        hide()
                        handleSubmit(event.target.value)
                    }
                }}
            />
        </div>
        {loading && <CircularProgress className="editable-input" />}
    </div>)
}

export default function CreateStatusTab() {
    const [showNewEditable, setShowEditable] = useState(false)

    return (
        <div className="add-column-icon">
            {!showNewEditable && <AddBoxRoundedIcon style={{ cursor: "pointer" }} onClick={() => setShowEditable(true)} />}
            {showNewEditable && <EmptyColumn hide={() => setShowEditable(false)} />}
        </div>
    )
}
