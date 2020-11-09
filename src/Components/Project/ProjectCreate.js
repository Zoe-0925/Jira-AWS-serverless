import React, { Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUserId } from "../../Reducers/Selectors"
import { createMultipleStatus } from "../../Actions/status.actions"
import { createSuccessfulProject } from "../../Actions/project.actions"
import { addProjectToUser } from "../../Actions/user.actions"
import { Form, Field } from 'formik';
import { withFormik } from 'formik';
import { Typography, Button, InputLabel, Dialog } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { DialogCloseIcon } from "../Shared/Tabs"
import { initiateProjectAndStatus } from "../Util"

export const ProjectCreateForm = ({
    values,
    handleChange,
    handleSubmit,
    handleClose
}) => {
    return <Fragment>
        <DialogCloseIcon handleClose={handleClose} />
        <div align="center"><Typography variant="h5">Create project</Typography></div>
        <div align="center" className="project-create-form">
            <Form onSubmit={handleSubmit}>
                <div className="input-container">
                    <InputLabel className="field-label">Name *</InputLabel>
                    <Field
                        id="name"
                        className="field"
                        component={TextField}
                        name="name"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        size="small"
                        placeholder="Enter a project name"
                        onChange={handleChange}
                        value={values.name}
                    />
                </div>
                <div className="input-container">
                    <InputLabel className="field-label">Key *</InputLabel>
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
                <br />
                <br />
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
        //TODO 
        //This does not work:  dispatch(createSuccessfulProject(project))
        
        
        dispatch(createSuccessfulProject(project))
        dispatch(createMultipleStatus(statusList))
        dispatch(addProjectToUser(project._id))
        setOpen(false)
    }

    return <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="max-width-dialog-title"
        maxWidth="lg"
        className="dialog-container"
    >
        <ProjectCreateWrapper onContinue={submitForm} handleClose={() => setOpen(false)} />
    </Dialog>
}


