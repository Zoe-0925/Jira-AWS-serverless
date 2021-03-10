import React from 'react'
/**--------------Redux-------------- */
import { useDispatch } from "react-redux"
import { updateStatusAttribute } from "../../Actions/status.actions"
/**--------------UI-------------- */
import { EditableText, Input } from "../EditableInput/EditableInput"
/**--------------Util-------------- */
import { useEditText } from '../Hooks/Hooks';

const ColumnTitle = ({ id = "", name = "" }) => {
    const { state, setState, edit, setEdit } = useEditText(name)
    const dispatch = useDispatch()

    return (
        <div className="flex-row column-title" id={id}>
            <EditableText name="column-summary" className="column-summary"
                edit={edit} text={state.value || name} setEdit={setEdit}>
                <Input name="status-title-input" state={state} setState={setState} setEdit={setEdit} handleSubmit={() => {
                    dispatch(updateStatusAttribute({ _id: id, value: state.value, attribute: "name" }))
                }} />
            </EditableText>
        </div>
    )
}

export default React.memo(ColumnTitle, (prev, next) => prev.name !== next.name);