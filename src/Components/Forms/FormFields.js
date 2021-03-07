import React from 'react';
import Select from 'react-select';
import { InputLabel, TextareaAutosize } from '@material-ui/core';
import { Field } from 'formik';
import { TextField, } from 'formik-material-ui';
import RichTextArea from "../EditableInput/RichTextArea"
import Button from '@material-ui/core/Button';
import { Menu, ClickAwayListener } from '@material-ui/core';
import { ListItem } from 'semantic-ui-react';

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

export const FormSelectMenuField = ({ id, inputLabel, children, selectInput = "selectInput", options }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };




    return (
        <FieldContainer id={id} inputLabel={inputLabel} >
            <div>
                <Button
                    className={selectInput}
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                >
                    {inputLabel}
                </Button>
                <ClickAwayListener onClickAway={handleClose}>
                    <Menu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        elevation={0}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        {children}
                    </Menu>
                </ClickAwayListener>
            </div>
        </FieldContainer>
    )
}


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

export const FormTextAreaField = ({ id, inputLabel, rowsMin, handleChange,value }) => {
    return (
        <FieldContainer id={id} inputLabel={inputLabel} >
            <TextareaAutosize
                className="field"
                name={id}
                type="text"
                variant="outlined"
                size="small"
                onChange={handleChange}
                margin="normal"
                value={value}
                aria-label="minimum height" rowsMin={rowsMin}
            />
        </FieldContainer>)
}

export const FormRichTextAreaField = ({ id, inputLabel, editorState, setEditorState }) => {
    return (
        <FieldContainer id={id} inputLabel={inputLabel} >
            <RichTextArea editorState={editorState} setEditorState={setEditorState} />
        </FieldContainer>
    )
}