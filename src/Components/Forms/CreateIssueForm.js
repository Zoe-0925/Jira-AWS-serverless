import React from 'react';
import { useSelector } from "react-redux"
import { withFormik } from 'formik';
import { Divider, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { FormSelectField, FormTextField, FormTextAreaField } from "../Shared/FormFields"
import { selectAllProjects } from "../../Reducers/Selectors"
import { DialogContentContainer } from "../Shared/Dialog"

const CreateIssueForm = props => {
    const {
        values,
        handleChange,
        handleSubmit,
        handleClose,
        setFieldValue,
        isSubmitting,
    } = props

    const projects = useSelector(selectAllProjects)

    const projectOptions = projects.map(each => {
        return {
            value: each._id, label: each.name
        }
    })

    const issueTypeOptions = [
        { value: 'task', label: 'task' },
        { value: 'epic', label: 'epic' },
    ]

    return (
        <DialogContentContainer handleClose={handleClose} dialogClassName="issue-form-in-modal" title="Create issue"
           isSubmitting={isSubmitting} handleSubmit={handleSubmit} handleCancel={handleClose} submitLabel="Create">
            <FormSelectField className="field" id="project" inputLabel="Project Name*" options={projectOptions}
                handleChange={(e) => setFieldValue("project", e.value)} />
            <FormSelectField className="field" id="issueType" inputLabel="Issue Type*" options={issueTypeOptions}
                handleChange={(e) => setFieldValue("issueType", e.value)} />
            <Typography className="field" variant="caption">Some issue types are unavailable due to incompatible field configuration and/or workflow associations.</Typography>
            <Divider />
            <FormTextField className="field" id="summary" inputLabel="Summary*" value={values.summary}
                handleChange={handleChange} />
            <FormTextAreaField className="field" id="description" inputLabel="Description" handleChange={(e) => setFieldValue("description", e.target.value)} rowsMin={8} />

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
