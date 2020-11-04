import React, { Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUserId } from "../../Reducers/Selectors"
import { createSuccessfulMultipleStatus } from "../../Actions/status.actions"
import { createSuccessfulProject } from "../../Actions/project.actions"
import { Form, Field } from 'formik';
import { withFormik } from 'formik';
import {
    Link, Typography, Breadcrumbs, Button, InputLabel, Divider, Dialog
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';

export const ProjectCreateForm = ({
    values,
    handleChange,
    handleSubmit,
    handleClose
}) => {
    return <Fragment>
        <DialogCloseIcon handleClose={handleClose} />
        <Breadcrumbs aria-label="breadcrumb" className="bread-crumbs" >
            <Link color="inherit" href="/projects">
                Projects</Link>
            <Link color="inherit" href={"/project/" + values._id}>
                <Typography color="textPrimary">{values.name}</Typography>
            </Link>
        </Breadcrumbs>
        <div align="center"><Typography variant="h5">Create project</Typography></div>
        <div align="center" className="form">
            <Form onSubmit={handleSubmit}>
                <div className="input-container">
                    <InputLabel className="field-label" for="name">Name *</InputLabel>
                    <Field
                        id="name"
                        className="field"
                        component={TextField}
                        name="name"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        size="small"
                        onChange={handleChange}
                        value={values.name}
                    />
                </div>
                <div className="input-container">
                    <InputLabel className="field-label" for="key">Key *</InputLabel>
                    <Field
                        id="key-field"
                        className="field"
                        component={TextField}
                        name="key"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        size="small"
                        onChange={handleChange}
                        value={values.key}
                    />
                </div>
                <Divider />
                <Button
                    className="navbar-create-btn"
                    onClick={handleSubmit}
                >Create</Button>
            </Form>
        </div>
    </Fragment>
}

export const ProjectCreateWrapper = withFormik({

    mapPropsToValues: () => ({
        name: "",
        key: "",
    }),

    // Custom sync validation
    validate: values => {
        const errors = {}
        if (!values.name) {
            errors.name = 'Required';
        }
        return errors;
    },
    handleSubmit: (values, { 'props': { onContinue } }) => {
        onContinue({
            name: values.name,
            key: values.key,
        });
    },
    displayName: 'BasicForm',
})(ProjectCreateForm);

export const ProjectCreateHOC = ({ open, setOpen }) => {
    const dispatch = useDispatch()
    const userId = useSelector(selectCurrentUserId)

    const submitForm = values => {
        const { project, statusList } = initiateProjectAndStatus(values, userId)
        dispatch(createSuccessfulProject(project))
        dispatch(createSuccessfulMultipleStatus(statusList))
        // setOpen(false)
    }

    return <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="max-width-dialog-title"
        maxWidth="lg"
        className="dialog-container"
    >
        <ProjectCreateWrapper onContinue={submitForm} handleClose={() => setOpen(false)} />
    </Dialog>
}


