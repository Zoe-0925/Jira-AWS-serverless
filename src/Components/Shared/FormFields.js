import React, { Fragment } from 'react';
import Select from 'react-select';
import { InputLabel, TextareaAutosize } from '@material-ui/core';
import { Field } from 'formik';
import {
    TextField,
} from 'formik-material-ui';

export const MyInputLabel = ({ id, inputLabel }) => (
    <InputLabel className="form-label" id={id}>{inputLabel}</InputLabel>
)

export const FormSelectField = ({ id, inputLabel, options, handleChange, defaultValue = "", isMulti = false }) => {
    return (
        <Fragment>
            <MyInputLabel id={id} inputLabel={inputLabel} />
            <Select
                className="select"
                classNamePrefix="select"
                name="issueType"
                defaultValue={defaultValue !== "" ? defaultValue : options[0]}
                options={options}
                onChange={handleChange}
                isMulti={isMulti}
            />
        </Fragment>)
}

export const FormTextField = ({ id, inputLabel, value, handleChange }) => {
    return (<Fragment>
        <MyInputLabel id={id} inputLabel={inputLabel} />
        <Field
            className="field"
            component={TextField}
            name={id}
            type="text"
            variant="outlined"
            size="small"
            onChange={handleChange}
            value={value}
            margin="normal"
        />
    </Fragment>)
}


export const FormTextAreaField = ({ id, inputLabel, rowsMin, handleChange }) => {
    return (<Fragment>
        <MyInputLabel id={id} inputLabel={inputLabel} />
        <TextareaAutosize
            className="field"
            name={id}
            type="text"
            variant="outlined"
            size="small"
            onChange={handleChange}
            margin="normal"
            aria-label="minimum height" rowsMin={rowsMin}
        />
    </Fragment>)
}