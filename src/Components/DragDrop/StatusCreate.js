import React, { useState } from 'react'
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import { useSelector, useDispatch } from "react-redux"
import { chainCreateStatus } from "../../Actions/status.actions"
import { selectCurrentProjectId } from "../../Reducers/Selectors"
import { v4 as uuidv4 } from 'uuid'

export function EmptyColumn({ hide }) {
    const dispatch = useDispatch()
    const { state, setState, edit, setEdit } = useEditText("")
    const loading = useSelector(selectLoading)
    const currentProjectId = useSelector(selectCurrentProjectId)

    const handleSubmit = () => {
        dispatch(chainCreateStatus({
            _id: uuidv4(), name: state.value, project: currentProjectId, issues: []
        }))
        hide()
    }

    return (<div className="epic-box">
        <div className="flex-row epic-title" id={status !== undefined ? status._id : ""}>
            <EditableText name="epic-summary" className="epic-summary"
                edit={edit} text={state.value || status.name} setEdit={setEdit}>
                <Input name="status-title-input" state={state} setState={setState} setEdit={setEdit} handleSubmit={handleSubmit} ƒ />
            </EditableText>
        </div>
        {loading && <CircularProgress className="editable-input" />}
    </div>)
}


export default function StatusCreate() {
    const [showNewEditable, setShowEditable] = useState(false)

    return (
        <div className="add-column-icon">
            {!showNewEditable && <AddBoxRoundedIcon onClick={() => setShowEditable(true)} />}
            {showNewEditable && <EmptyColumn hide={() => setShowEditable(false)} />}
        </div>
    ) 
}
