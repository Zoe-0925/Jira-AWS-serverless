import React, { Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUserId } from "../../Reducers/Selectors"
import { chainCreactProject } from "../../Actions/project.actions"
import { Form, Field } from 'formik';
import { withFormik } from 'formik';
import { Typography, Button, Dialog } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { DialogCloseIcon } from "../Shared/Tabs"
import { initiateProjectAndStatus } from "../Util"

export const ProjectAddPeopleForm = ({
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
                <Field
                    id="people"
                    className="field"
                    component={TextField}
                    name="people"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    size="small"
                    placeholder="Type a email address of the person"
                    onChange={handleChange}
                    value={values.people}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    className="navbar-create-btn"
                    onClick={handleSubmit}
                >Add</Button>
            </Form>
        </div>
    </Fragment>
}

export const ProjectAddPeopleWrapper = withFormik({

    mapPropsToValues: () => ({
        people: ""
    }),

    // Custom sync validation
    validate: values => {
        const errors = {}
        if (!values.people) {
            errors.people = 'Required';
        }
        return errors;
    },
    handleSubmit: (values, { 'props': { onContinue } }) => {
        onContinue(values.people);
    },
    displayName: 'BasicForm',
})(ProjectAddPeopleForm);

export const ProjectCreateHOC = ({ open, setOpen }) => {
    const dispatch = useDispatch()
   


    //TODO
    //overwrite handle change
    //after the user stoppe typing,
    //search user by email
    //and show the result in the following.


    //Update the values.
    // a query string
    // and an email selected.

    //disable the button when loading
    //disable the button when no user is selected


    const submitForm = email => {

        setOpen(false)
    }

    return <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="max-width-dialog-title"
        maxWidth="sm"
        fullWidth={true}
        className="dialog-container"
    >
        <ProjectAddPeoplerapper onContinue={submitForm} handleClose={() => setOpen(false)} />
    </Dialog>
}


