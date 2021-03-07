import React from 'react';
import { withFormik } from 'formik';
import { Divider, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { FormSelectField, FormTextField, FormTextAreaField, FormRichTextAreaField } from "./FormFields"
import { DialogContentContainer } from "../Dialog/Dialog"
import { EditorState, convertToRaw } from "draft-js";
import { TaskIcon, EpicIcon } from "../IssueCard/Icons"
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const CreateIssueForm = props => {
    const {
        values,
        handleChange,
        handleSubmit,
        handleClose,
        setFieldValue,
        projects,
        editorState,
        setEditorState,
        isSubmitting
    } = props


    const onSubmit = () => {
        const description = convertToRaw(editorState)
        const descriptionJSON = JSON.stringify(description)
        setFieldValue("description", descriptionJSON)
        handleSubmit(values)
    }

    const issueTypeOptions = [
        { value: 'task', label: (<><CheckBoxIcon className="icon" style={{ color: "#5BC2F2" }} /><span>Task</span></>) },
        { value: 'epic', label: (<><CheckBoxIcon className="icon" style={{ color: "#a64bed" }} /><span>Epic</span></>) },
    ]

    return (
        <DialogContentContainer handleClose={handleClose} dialogClassName="issue-form-in-modal" title="Create issue"
            isSubmitting={isSubmitting} handleSubmit={onSubmit} handleCancel={handleClose} submitLabel="Create">
            <FormSelectField id="issueType" inputLabel="Issue Type*" options={issueTypeOptions}
                handleChange={(e) => setFieldValue("issueType", e.value)} />
                
            <Typography variant="caption">Some issue types are unavailable due to incompatible field configuration and/or workflow associations.</Typography>
            <Divider />
            <FormTextField id="summary" inputLabel="Summary*" value={values.summary} handleChange={handleChange} />
            <FormTextAreaField id="description" inputLabel="Description" handleChange={(e) => setFieldValue("description", e.target.value)} rowsMin={8} />
        </DialogContentContainer>
    )
}

const CreateIssueFormHOC = withFormik({
    validationSchema: Yup.object().shape({
        summary: Yup.string()
            .required('Summary is required!'),
        description: Yup.string()
            .required('Description is required!'),
    }),
    mapPropsToValues: () => ({
        project: "",
        issueType: "task",
        summary: "",
        description: ""
    }),
    handleSubmit: (values, { 'props': { onContinue } }) => {
        onContinue(values)
    },
    displayName: 'MyForm',
})(CreateIssueForm);

export default CreateIssueFormHOC


//  <FormTextAreaField id="description" inputLabel="Description" handleChange={(e) => setFieldValue("description", e.target.value)} rowsMin={8} />


//   <Row><FormRichTextAreaField id="description" inputLabel="Description" editorState={editorState} setEditorState={setEditorState} /></Row>
         //       <SubmitCancelButtonSet isSubmitting={isSubmitting} handleSave={onSubmit} handleCancel={handleClose} submitLabel="Create" />
