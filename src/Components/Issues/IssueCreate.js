import React, { Fragment, useState } from 'react';
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Form, Field, withFormik } from 'formik';
import Select from 'react-select';
import { Row } from 'reactstrap';
import {
    Button,
    Divider,
    Typography,
    InputLabel,
    TextareaAutosize,
    DialogActions, Dialog
} from '@material-ui/core';
import * as Yup from 'yup';
import {
    TextField,
} from 'formik-material-ui';
import { selectProjects } from "../../Reducers/Selectors"
import { createTask } from "../../Actions/mockIssueActions"
import { DialogCloseIcon } from "../Shared/Tabs"

const IssueForm = props => {
    const {
        values,
        handleChange,
        handleSubmit,
        handleClose,
        setFieldValue,
        isSubmitting,
    } = props

    const projects = useSelector(selectProjects)
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
               <br/>
                <Form onSubmit={handleSubmit}>
                    <InputLabel className="form-label" id="projectName">Project Name*</InputLabel>
                    <Select
                        className="select"
                        classNamePrefix="select"
                        name="issueType"
                        defaultValue={projectOptions[0]}
                        options={projectOptions}
                        onChange={(e) => setFieldValue("projectName", e.value)}
                    />
                    <Row>
                    </Row>
                    <InputLabel className="form-label" id="issueType">Issue Type*</InputLabel>
                    <Select
                        className="select"
                        classNamePrefix="select"
                        name="issueType"
                        defaultValue={issueTypeOptions[0]}
                        options={issueTypeOptions}
                        onChange={(e) => setFieldValue("issueType", e.value)}
                    />
                    <Typography variant="caption">Some issue types are unavailable due to incompatible field configuration and/or workflow associations.</Typography>
                    <Row>
                    </Row>
                    <Divider />
                    <Row>
                    </Row>
                    <InputLabel className="form-label" id="summary">Summary*</InputLabel>
                    <Field
                        className="field"
                        component={TextField}
                        name="summary"
                        type="text"
                        variant="outlined"
                        size="small"
                        onChange={handleChange}
                        value={values.summary}
                        margin="normal"
                    />
                    <InputLabel className="form-label" id="state">description*</InputLabel>
                    <TextareaAutosize
                        className="field"
                        name="description"
                        type="text"
                        variant="outlined"
                        size="small"
                        onChange={(e) => setFieldValue("issueType", e.target.value)}
                        margin="normal"
                        aria-label="minimum height" rowsMin={15}
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
            .required('Summary is required!')
    }),
    mapPropsToValues: () => ({
        projectName: "",
        issueType: "task",
        summary: "",
        description: ""
    }),
    handleSubmit: (values, { 'props': { onContinue } }) => {
        onContinue(values)
    },
    displayName: 'MyForm',
})(IssueForm);

const IssueCreate = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    const submitCreateIssue = (value) => {
        dispatch(createTask(value))
        setOpen(false)
    }

    return (
        <Fragment>
            <Button className="navbar-create-btn" onClick={() => setOpen(true)}>Create</Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="max-width-dialog-title"
                maxWidth="lg"
                className="dialog-container"
            >
                <IssueCreateContent onContinue={submitCreateIssue} handleClose={() => setOpen(false)} />
            </Dialog>
        </Fragment>
    )
}

export default IssueCreate