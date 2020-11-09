import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentProjectId, selectProjectReducer, selectUserReducer } from "../../Reducers/Selectors"
import { updateProjectNameKeyAndAssignee } from "../../Actions/project.actions"
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
import { useDotIconMenu } from "../Shared/CustomHooks"
import { Container, Row, Col } from "reactstrap"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export const ProjectDetailForm = ({
    values,
    handleChange,
    handleSubmit,
    removeProject,
}) => {
    const { anchorEl, isOpen, anchorRef, handleMenuClose, handleMenuOpen } = useDotIconMenu()

    console.log("values",values)
    return <Fragment>
        <Breadcrumbs aria-label="breadcrumb" className="bread-crumbs" >
            <Link color="inherit" href="/projects">
                Projects</Link>
            <Link color="inherit" href={"/project/" + values._id}>
                <Typography color="textPrimary">{values.name}</Typography>
            </Link>
        </Breadcrumbs>
        <Container>
            <Row className="row">
                <Col sm="1"> <Typography variant="h5">Details</Typography></Col>
                <Col sm="10"></Col>
                <Col sm="1"> <DotIconMenu className="project-detail-dot" anchorEl={anchorEl} isOpen={isOpen} anchorRef={anchorRef}
                    handleMenuClose={handleMenuClose} handleMenuOpen={handleMenuOpen}>
                    <MenuItem onClick={removeProject}>Move to Trash</MenuItem>
                </DotIconMenu></Col>
            </Row>
        </Container>
        <img className="project-icon" src="https://www.lovethispic.com/uploaded_images/218149-Hot-Guy-To-Wake-Up-To.jpg" alt="project icon" />
        <div align="center"><Button>Change icon</Button></div>
        <div align="center" className="form">
            <Form onSubmit={handleSubmit}>
                <div className="input-container">
                    <InputLabel className="field-label">Name</InputLabel>
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
                    <InputLabel className="field-label">Key</InputLabel>
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
                <div className="input-container">
                    <InputLabel className="field-label" id="lead-label">Project Lead</InputLabel>
                    <Field
                        id="lead"
                        select
                        label="Project Lead"
                        className="field"
                        component={Select}
                        value={values.lead}
                        variant="outlined"
                        size="small"
                        name="lead"
                    >
                        {values.memberObjects.map(each => <MenuItem onClick={handleChange("lead")} key="lead" value={each._id}>
                            <AccountCircleIcon />{each.name}</MenuItem>)}
                    </Field>

                </div>
                <div className="input-container">
                    <InputLabel className="field-label">Default Assignee</InputLabel>
                    <Field
                        id="default_assignee"
                        initialvalues={{ default_assignee: values.default_assignee }}
                        className="field"
                        component={Select}
                        name="default_assignee"
                        variant="outlined"
                        size="small"
                        onChange={handleChange}
                        value="Project Lead"
                    >
                        <MenuItem>Project Lead</MenuItem>
                        <MenuItem>None</MenuItem>
                    </Field>
                </div>
                <Divider />
                <Button
                    className="navbar-create-btn"
                    onClick={handleSubmit}
                >Save</Button>
            </Form>
        </div>
    </Fragment>
}

export const ProjectDetailWrapper = withFormik({

    mapPropsToValues: ({ project, members }) => ({
        _id: project !== undefined ? project._id : "",
        name: project !== undefined ? project.name : "",
        key: project !== undefined ? project.key : "",
        default_assignee: project !== undefined ? project.default_assignee : "",
        lead: project !== undefined ? project.lead : "",
        memberObjects: members
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
            _id: values._id,
            name: values.name,
            key: values.key,
            default_assignee: values.default_assignee,
            lead: values.lead,
        });
    },
    displayName: 'BasicForm',
})(ProjectDetailForm);

export const ProjectUpdateHOC = () => {
    const dispatch = useDispatch()
    const members = useSelector(selectUserReducer).users
    const project = useSelector(selectProjectReducer).projects



    const submitForm = values => {
        const updateDate = new Date()
        const formattedValues = { ...values, updatedAt: JSON.stringtify(updateDate), members: project.members }
        dispatch(updateProjectNameKeyAndAssignee(formattedValues))
    }

    return (project === undefined ? <p>Loading</p> : <ProjectDetailWrapper members={members} project={project} onContinue={submitForm} />
    )
}


