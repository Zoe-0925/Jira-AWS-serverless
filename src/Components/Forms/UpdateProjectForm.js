import React, { Fragment } from 'react'
import { useSelector } from "react-redux"
import { selectLoading } from "../../reducers/Selectors"
import { Form, withFormik } from 'formik';
import { DotIconMenu } from "../Buttons/IconButtons"
import {
    Link, Typography, Breadcrumbs, Button, Divider, MenuItem, CircularProgress
} from '@material-ui/core';
import { useDotIconMenu } from "../Hooks/Hooks"
import { Container, Row, Col } from "reactstrap"
import { FormTextField, FormSelectField } from "./FormFields"

export const UpdateProjectForm = ({
    values,
    handleChange,
    handleSubmit,
    removeProject,
    setFieldValue
}) => {
    const loading = useSelector(selectLoading)
    const leadOptions = values.memberObjects.map(each => { return { value: each._id, label: each.name } })
    const updateProjectLead = (e) => {
        setFieldValue("lead", e.value)
    }

    const updateDefaultAssignee = (e) => {
        setFieldValue("default_assignee", e.value)
    }

    return <ProjectDetailForm values={values} loading={loading} leadOptions={leadOptions} updateProjectLead={updateProjectLead}
        updateDefaultAssignee={updateDefaultAssignee} handleChange={handleChange} handleSubmit={handleSubmit} removeProject={removeProject} />
}

export const ProjectDetailForm = ({ values, loading, leadOptions, updateProjectLead, updateDefaultAssignee, handleChange, handleSubmit, removeProject }) => {
    const { anchorEl, isOpen, anchorRef, handleMenuClose, handleMenuOpen } = useDotIconMenu()

    return (
        <Fragment>
            <Breadcrumbs aria-label="breadcrumb" className="bread-crumbs" >
                <Link color="inherit" href="/projects">
                    Projects</Link>
                <Link color="inherit" href={"/project/" + values._id}>
                    <Typography color="textPrimary">{values.name}</Typography>
                </Link>
            </Breadcrumbs>
            <Container>
                <Row>
                    <Col sm="1"> <Typography variant="h5">Details</Typography></Col>
                    <Col sm="10"></Col>
                    <Col sm="1"> <DotIconMenu className="project-detail-dot" anchorEl={anchorEl} isOpen={isOpen} anchorRef={anchorRef}
                        handleMenuClose={handleMenuClose} handleMenuOpen={handleMenuOpen}>
                        <MenuItem onClick={removeProject}>Move to Trash</MenuItem>
                    </DotIconMenu></Col>
                </Row>
            </Container>
            <img className="project-icon" src="https://cdn.worldvectorlogo.com/logos/jira-1.svg" alt="project icon" />
            <div align="center" className="form">
                <Form onSubmit={handleSubmit} className="project-detail-form">
                    <FormTextField id="name" inputLabel="Name" value={values.name} handleChange={handleChange} />
                    <FormTextField id="key" inputLabel="Key" value={values.key} handleChange={handleChange} />
                    <FormSelectField id="lead" inputLabel="Project Lead" options={leadOptions} handleChange={updateProjectLead} />
                    <FormSelectField id="default_assignee" inputLabel="Default Assignee" options={[{ value: "lead", label: "Project Lead" }, { value: "", label: "None" }]} handleChange={updateDefaultAssignee} />
                    <Divider />
                    <br />
                    <Button
                        disabled={loading}
                        className="navbar-create-btn"
                        onClick={handleSubmit}
                    >  {!loading ? "Save" : <CircularProgress className="loading-btn" />}</Button>
                </Form>
            </div>
        </Fragment>
    )
}

const UpdateProjectFormHOC = withFormik({

    mapPropsToValues: ({ project = { _id: "", name: "", key: "", default_assignee: "", lead: "" }, members = [] }) => ({
        _id: project._id,
        name: project.name,
        key: project.key,
        default_assignee: project.default_assignee,
        lead: project !== project.lead,
        memberObjects: project.members
    }),

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
})(UpdateProjectForm);

export default UpdateProjectFormHOC