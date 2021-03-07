import React, { useState } from 'react'
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import { useSelector, useDispatch } from "react-redux"
import { createStatus } from "../../Actions/status.actions"
import { selectCurrentProjectId, selectLoading } from "../../Reducers/Selectors"
import { v4 as uuidv4 } from 'uuid'
import { CircularProgress } from '@material-ui/core';

export function EmptyColumn({ hide }) {
    const dispatch = useDispatch()
    const loading = useSelector(selectLoading)
    const currentProjectId = useSelector(selectCurrentProjectId)

    const handleSubmit = (value) => {
        dispatch(createStatus({
            _id: uuidv4(), name: value, project: currentProjectId, issues: []
        }))
        hide()
    }

    return (<div className="column">
        <div className="flex-row column-title" >
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

const CreateStatusTab = () => {
    const [showNewEditable, setShowEditable] = useState(false)

    return (
        <div className="add-column-icon">
            {!showNewEditable && <AddBoxRoundedIcon style={{ cursor: "pointer" }} onClick={() => setShowEditable(true)} />}
            {showNewEditable && <EmptyColumn hide={() => setShowEditable(false)} />}
        </div>
    )
}

export default React.memo(CreateStatusTab);