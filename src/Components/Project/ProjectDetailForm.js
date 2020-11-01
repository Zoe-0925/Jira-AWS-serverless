import React, { useState, useEffect, Fragment } from 'react'
import {useDispatch} from "react-redux"
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
import { selectCurrentProjectId, selectProjectReducer, selectProjectMembers, selectUserReducer } from "../../Reducers/Selectors"
import { useDotIconMenu } from "../Shared/CustomHooks"
import { Container, Row, Col } from "reactstrap"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {updateProjectNameAndAssignee} from "../../Actions/project.actions"

const ProjectDetailForm = ({
    values,
    handleChange,
    handleSubmit,
    removeProject,
    memberObjects
}) => {

    console.log("memberObjects", memberObjects)
    //  const leadOptions = memberObjects.map(each => <MenuItem><AccountCircleIcon />{each.name}</MenuItem>)
    const { anchorEl, isOpen, anchorRef, handleMenuClose, handleMenuOpen } = useDotIconMenu()

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
                    <InputLabel className="field-label" for="name">Name</InputLabel>
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
                    <InputLabel className="field-label" for="key">Key</InputLabel>
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
                    <InputLabel className="field-label" for="default_assignee">Project Lead</InputLabel>
                    <Field
                        id="default_assignee"
                        initialvalues={{ default_assignee: values.lead }}
                        className="field"
                        component={Select}
                        labelId="default_assignee" id="default_assignee" name="default_assignee"
                        variant="outlined"
                        size="small"
                        onChange={handleChange}
                        value="Project Lead"
                    >
                        <MenuItem>Project Lead</MenuItem>
                        <MenuItem>None</MenuItem>
                    </Field>
                </div>
                <div className="input-container">
                    <InputLabel className="field-label" for="default_assignee">Default Assignee</InputLabel>
                    <Field
                        id="default_assignee"
                        initialvalues={{ default_assignee: values.default_assignee }}
                        className="field"
                        component={Select}
                        labelId="default_assignee" id="default_assignee" name="default_assignee"
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

const ProjectDetailWrapper = withFormik({

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

const ProjectDetailHOC = () => {
    const dispatch = useDispatch()
    const [project, setProject] = useState()
    const [members, setMembers] = useState([])
    const currentProjectId = useSelector(selectCurrentProjectId)
    const projectReducer = useSelector(selectProjectReducer)
    const userReducer = useSelector(selectUserReducer)

    useEffect(() => {
        const projectToUpdate = projectReducer.projects.find(item => item._id === currentProjectId)
        setProject(projectToUpdate)
        setMembers(userReducer.users.filter(user => !projectToUpdate.members.includes(user._id)))
    }, [currentProjectId])

    const submitForm = values => {
        const updateDate = new Date()
        //TODO
        //Use the date library to format the date.
        const formattedValues = { ...values, updatedAt: JSON.stringtify(updateDate), members: project.members }
        dispatch(updateProjectNameAndAssignee(formattedValues))
    }

    return (project === undefined ? <p>Loading</p> : <ProjectDetailWrapper members={members} project={project} onContinue={submitForm} />
    )
}

export default ProjectDetailHOC

