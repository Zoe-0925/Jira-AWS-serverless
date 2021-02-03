import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Form, withFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid'
import {
    Button,
    Divider,
    Typography,
    DialogActions, Dialog
} from '@material-ui/core';
import * as Yup from 'yup';
import { FormSelectField, FormTextField, FormTextAreaField } from "../Shared/FormFields"
import { selectAllProjects, selectFirstStatus } from "../../Reducers/Selectors"
import { chainCreateIssueAndUpdateIssueOrder } from "../../Actions/issue.actions"
import { DialogCloseIcon } from "../Shared/Tabs"
import { SuccessfulFeedback } from "../Shared/Feedback"

const IssueForm = props => {
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

    return <Fragment>
        <DialogCloseIcon handleClose={handleClose} />
        <div className="issue-form-in-modal">
            <p className="title">Create issue</p>
            <br />
            <Form className="form" onSubmit={handleSubmit}>
                <FormSelectField className="field" id="project" inputLabel="Project Name*" options={projectOptions}
                    handleChange={(e) => setFieldValue("project", e.value)} />
                <FormSelectField className="field" id="issueType" inputLabel="Issue Type*" options={issueTypeOptions}
                    handleChange={(e) => setFieldValue("issueType", e.value)} />
                <Typography className="field" variant="caption">Some issue types are unavailable due to incompatible field configuration and/or workflow associations.</Typography>
                <Divider />
                <FormTextField className="field" id="summary" inputLabel="Summary*" value={values.summary}
                    handleChange={handleChange} />
                <FormTextAreaField  className="field" id="description" inputLabel="Description" handleChange={(e) => setFieldValue("description", e.target.value)} rowsMin={8}
                />
                <DialogActions>
                    <Button className="cancel-btn" disabled={isSubmitting} onClick={handleClose}>Cancel</Button>
                    <Button className="navbar-create-btn" disabled={isSubmitting} onClick={handleSubmit}>Create</Button>
                </DialogActions>
            </Form>
        </div>
    </Fragment>
}

const IssueCreateContent = withFormik({
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
})(IssueForm);

export default function IssueCreate() {
    const dispatch = useDispatch()
    const defaultStatusId = useSelector(selectFirstStatus)
    const [open, setOpen] = useState(false)
    const [sucessful, setSuccessful] = useState(false)
    const projects = useSelector(selectAllProjects)

    const submitCreateIssue = (value) => {
        let issue = {
            _id: uuidv4(), status: defaultStatusId, issueType: "task",
            labels: [], assignee: "", reporter: "", ...value
        }
        if (issue.issueTye === "epic") {
            const today = new Date()
            issue.startDate = JSON.stringify(today)
            issue.dueDate = JSON.stringify(today.setMonth(today.getMonth() + 1))
            if (issue.project === "") { issue.project = projects[0]._id }
            dispatch(chainCreateIssueAndUpdateIssueOrder(issue)).then(
                result => {
                    if (result) {
                        setSuccessful(true)
                    }
                }
            )
            setOpen(false)
        }
    }

    return (
        <Fragment>
            {projects && <Button className="navbar-create-btn" onClick={() => setOpen(true)}>Create</Button>}
            {projects && <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="max-width-dialog-title"
                maxWidth="lg"
                className="dialog-container"
            >
                <IssueCreateContent onContinue={submitCreateIssue} handleClose={() => setOpen(false)} />
            </Dialog>}
            {sucessful && <SuccessfulFeedback open={sucessful} message="Issue created successfully!" />}
        </Fragment>
    )
}
