import React from 'react'
/**--------------Redux-------------- */
import { useDispatch } from "react-redux"
import { updateStatusAttribute, deleteStatus } from "../../actions/status.actions"
/**--------------UI-------------- */
import { MenuItem } from '@material-ui/core';
import { DotIconMenu } from "../shared/tabs"
import { EditableText, Input } from "../shared/editableText"
import { WarningFeedback } from "../shared/feedback"
/**--------------Util-------------- */
import { useEditText, useDotIconMenu } from '../shared/hooks';

const ColumnTitle = ({ id = "", name = "" }) => {
    const { state, setState, edit, setEdit } = useEditText(name)
    const dispatch = useDispatch()
    const [showWarning, setShowWarning] = React.useState(false)

    const { anchorEl, isOpen, anchorRef, handleMenuClose, handleMenuOpen } = useDotIconMenu()

    return (
        <div className="flex-row epic-title" id={id}>
            <EditableText name="epic-summary" className="epic-summary"
                edit={edit} text={state.value || name} setEdit={setEdit}>
                <Input name="status-title-input" state={state} setState={setState} setEdit={setEdit} handleSubmit={() => {
                    dispatch(updateStatusAttribute({ _id: id, value: state.value, attribute: "name" }))
                }} />
            </EditableText>
            <DotIconMenu className="dot-icon" anchorEl={anchorEl} isOpen={isOpen} anchorRef={anchorRef}
                handleMenuClose={handleMenuClose} handleMenuOpen={handleMenuOpen}>
                <MenuItem onClick={() => setShowWarning(true)}>Delete</MenuItem>
            </DotIconMenu>
            {
                showWarning && <WarningFeedback title="Deleting this column will remove all issues inside" message="Do you want to delete all issues?"
                    handleClose={() => setShowWarning(false)} handleConfirm={() => dispatch(deleteStatus(id))} />
            }
        </div>
    )
}

export default ColumnTitle