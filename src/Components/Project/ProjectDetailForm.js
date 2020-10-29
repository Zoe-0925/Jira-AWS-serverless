import React, { useState, useEffect } from 'react'
import { Form, Field } from 'formik';
import { withFormik } from 'formik';
import { DotIconMenu } from "../Shared/Tabs"
import {
    Link, Typography, Breadcrumbs, Button, InputLabel, Divider, MenuItem,
} from '@material-ui/core';
import {
    TextField,
    Select,
} from 'formik-material-ui';
import { useSelector } from "react-redux"
import { selectCurrentProjectId, selectProjectReducer } from "../../Reducers/Selectors"
import { useDotIconMenu } from "../Shared/CustomHooks"

const ProjectDetailForm = ({
    values,
    handleChange,
    handleSubmit,
    removeProject
}) => {

    const [displayValues, setDisplayValues] = useState(values)
    const currentProjectId = useSelector(selectCurrentProjectId)
    const projectReducer = useSelector(selectProjectReducer)

    useEffect(() => {
        const project = projectReducer.projects.find(item => item._id === currentProjectId)
        if (project) {
            setDisplayValues({
                _id: project._id,
                name: project.name,
                key: project.key,
                default_assignee: project.default_assignee
            })
        }
    }, [currentProjectId])

    const { anchorEl, isOpen, anchorRef, handleMenuClose, handleMenuOpen } = useDotIconMenu()

    return <div className="project-detail-form">
        <div className="row">
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/projects">
                    Projects</Link>
                <Link color="inherit" href={"/project/" + displayValues._id}>
                    <Typography color="textPrimary">{displayValues.name}</Typography>
                </Link>
            </Breadcrumbs>
        </div>
        <div className="row">
            <Typography variant="h5">Details</Typography>
            <DotIconMenu className="dot-icon" anchorEl={anchorEl} isOpen={isOpen} anchorRef={anchorRef}
                handleMenuClose={handleMenuClose} handleMenuOpen={handleMenuOpen}>
                <MenuItem onClick={removeProject}>Move to Trash</MenuItem>
            </DotIconMenu>
        </div>
        <img className="project-icon" src="https://www.lovethispic.com/uploaded_images/218149-Hot-Guy-To-Wake-Up-To.jpg" alt="project icon" />
        <input className="row Tab button" accept="image/*" id="button-file" type="file" />
        <div className="form">
            <Form onSubmit={handleSubmit}>
                <InputLabel className="row" id="state">Name</InputLabel>
                <Field
                    className="row full"
                    component={TextField}
                    name="name"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                    value={displayValues.name}
                />
                <InputLabel className="row" id="state">Key</InputLabel>
                <Field
                    className="row full"
                    component={TextField}
                    name="key"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    size="small"
                    disabled={true}
                    onChange={handleChange}
                    value={displayValues.key}
                />
                <InputLabel className="row" id="default_assignee">Default Assignee</InputLabel>
                <Field
                    initialvalues={{ default_assignee: displayValues.default_assignee }}
                    className="select full"
                    component={Select}
                    labelId="default_assignee" id="default_assignee" name="default_assignee"
                    variant="outlined"
                    onChange={handleChange}
                    value="Project Lead"
                >
                    <MenuItem>Project Lead</MenuItem>
                    <MenuItem>None</MenuItem>
                </Field>
                <Divider />
                <Button
                    className="row navbar-create-btn"
                    onClick={handleSubmit}
                >Save</Button>
            </Form>
        </div>
    </div>
}

const ProjectDetailWrapper = withFormik({

    mapPropsToValues: ({ project }) => ({
        _id: project !== undefined ? project._id : "",
        name: project !== undefined ? project.name : "",
        key: project !== undefined ? project.key : "",
        default_assignee: project !== undefined ? project.default_assignee : ""
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
        onContinue(values);
    },

    displayName: 'BasicForm',
})(ProjectDetailForm);

export default ProjectDetailWrapper

