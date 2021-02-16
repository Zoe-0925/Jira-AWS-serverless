import React, { Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUserId } from "../../Reducers/Selectors"
import { chainCreactProject } from "../../Actions/project.actions"
import { Form } from 'formik';
import { withFormik } from 'formik';
import { Typography, Button, Dialog } from '@material-ui/core';
import { DialogCloseIcon } from "../Shared/Tabs"
import { initiateProjectAndStatus } from "../Util"
import { FormTextField } from "../Shared/FormFields"

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
                <FormTextField id="name" inputLabel="Name *" value={values.name} handleChange={handleChange} />
                <FormTextField id="key" inputLabel="Key *" value={values.key} handleChange={handleChange} />
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
        dispatch(chainCreactProject(project, statusList))
        setOpen(false)
    }

    return <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="max-width-dialog-title"
    >
        <ProjectCreateWrapper onContinue={submitForm} handleClose={() => setOpen(false)} />
    </Dialog>
}


