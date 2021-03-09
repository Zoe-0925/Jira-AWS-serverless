import React from 'react';
import Select from 'react-select';
import InputLabel from '@material-ui/core/InputLabel';
import { Field } from 'formik';
import { TextField, } from 'formik-material-ui';
import RichTextArea from "../EditableInput/RichTextArea"

export const FieldContainer = ({ id, inputLabel, ...props }) => (
    <div className="field-container">
        <InputLabel className="label" id={id}>{inputLabel}</InputLabel>
        {props.children}
    </div>
)


export const IssueDetailFormSelectField = ({ id, inputLabel, options, handleChange, defaultValue = "", isMulti = false }) =>
(
    <FieldContainer id={id} inputLabel={inputLabel} >
        <Select
            name={id}
            className="select"
            defaultValue={defaultValue !== "" ? defaultValue : options[0]}
            options={options}
            onChange={handleChange}
            isMulti={isMulti}
        />
    </FieldContainer>
)


export const FormSelectField = ({ id, inputLabel, options, handleChange, defaultValue = "", isMulti = false }) =>
(
    <FieldContainer id={id} inputLabel={inputLabel} >
        <Select
            name={id}
            className="select"
            defaultValue={defaultValue !== "" ? defaultValue : options[0]}
            options={options}
            onChange={handleChange}
            isMulti={isMulti}
        />
    </FieldContainer>
)


export const FormTextField = ({ id, inputLabel, value, handleChange }) => {
    return (
        <FieldContainer id={id} inputLabel={inputLabel} >
            <Field
                className="field"
                component={TextField}
                name={id}
                type="text"
                variant="outlined"
                fullWidth={true}
                size="small"
                onChange={handleChange}
                value={value}
                margin="normal"
            />
        </FieldContainer>)
}

export const FormRichTextAreaField = ({ id, inputLabel, editorState, setEditorState }) => {
    return (
        <FieldContainer id={id} inputLabel={inputLabel} >
            <RichTextArea editorState={editorState} setEditorState={setEditorState} readOnly={false} />
        </FieldContainer>
    )
}