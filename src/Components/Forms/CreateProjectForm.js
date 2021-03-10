import React, { Fragment } from 'react'
import { Form } from 'formik';
import { withFormik } from 'formik';
import { Typography, Button } from '@material-ui/core';
import { DialogCloseIcon } from "../buttons/iconButtons"
import { FormTextField } from "./fields"

export const CreateProjectForm = ({
    values,
    handleChange,
    handleSubmit,
    handleClose
}) => {
    return <Fragment>
        <DialogCloseIcon handleClose={handleClose} />
        <div align="center"><Typography variant="h5">Create project</Typography></div>
        <Form onSubmit={handleSubmit}>
            <div align="center" className="create-project-form">
                <FormTextField id="name" inputLabel="Name *" value={values.name} handleChange={handleChange} />
                <FormTextField id="key" inputLabel="Key *" value={values.key} handleChange={handleChange} />
                <br />
                <br />
                <Button
                    className="navbar-create-btn"
                    onClick={handleSubmit}
                >Create</Button>
            </div>
        </Form>
    </Fragment>
}

const CreateProjectFormHOC = withFormik({

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
})(CreateProjectForm);

export default CreateProjectFormHOC