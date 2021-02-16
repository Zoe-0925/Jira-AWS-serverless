import React from 'react'
/**--------------Redux-------------- */
import { useDispatch } from "react-redux"
import { updateStatusName, chaninDeleteStatus } from "../../Actions/status.actions"
/**--------------UI-------------- */
import { MenuItem } from '@material-ui/core';
import { DotIconMenu } from "../Shared/Tabs"
import { EditableText, Input } from "../Shared/EditableText"
import { WarningFeedback } from "../Shared/Feedback"
/**--------------Util-------------- */
import { useEditText, useDotIconMenu } from '../Shared/CustomHooks';

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
                    dispatch(updateStatusName({ _id: id, value: state.value, attribute: "name" }))
                }} />
            </EditableText>
            <DotIconMenu className="dot-icon" anchorEl={anchorEl} isOpen={isOpen} anchorRef={anchorRef}
                handleMenuClose={handleMenuClose} handleMenuOpen={handleMenuOpen}>
                <MenuItem onClick={() => setShowWarning(true)}>Delete</MenuItem>
            </DotIconMenu>
            {
                showWarning && <WarningFeedback title="Deleting this column will remove all issues inside" message="Do you want to delete all issues?"
                    handleClose={() => setShowWarning(false)} handleConfirm={() => dispatch(chaninDeleteStatus(id))} />
            }
        </div>
    )
}

export default ColumnTitle