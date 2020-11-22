import React, { Fragment, useState } from 'react';
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Form, withFormik } from 'formik';
import Select from 'react-select';
import {
    Button,
    InputLabel,
    DialogActions, Dialog
} from '@material-ui/core';
import * as Yup from 'yup';
import { selectEpics } from "../../Reducers/Selectors"
import { updateIssueAttribute } from "../../Actions/issue.actions"
import { DialogCloseIcon } from "../Shared/Tabs"
import {SuccessfulFeedback} from "../Shared/Feedback"
import CreateIcon from '@material-ui/icons/Create';

const IssueAddEpicForm = props => {
    const {
        handleSubmit,
        handleClose,
        setFieldValue,
        isSubmitting,
    } = props

    const epics = useSelector(selectEpics)

    const epicOptions = epics.map(each => {
        return {
            value: each._id, label: each.summary
        }
    })

    return <Fragment>
        <DialogCloseIcon handleClose={handleClose} />
        <div className="issue-form-in-modal">
            <p className="title">Add epic</p>
            <p className="sub-title">Select a parent issue for this issue. Issues can only belong to one parent issue at a time.</p>
            <br />
            <Form onSubmit={handleSubmit}>
                <InputLabel className="form-label" id="project">Epic</InputLabel>
                <Select
                    className="select"
                    classNamePrefix="select"
                    name="issueType"
                    options={epicOptions}
                    onChange={(e) => setFieldValue("epic", e.value)}
                />
                <DialogActions>
                    <Button className="navbar-create-btn" disabled={isSubmitting} onClick={handleSubmit}>Done</Button>
                    <Button className="cancel-btn" disabled={isSubmitting} onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Form>
        </div>
    </Fragment>
}

const IssueAddEpicContent = withFormik({
    validationSchema: Yup.object().shape({
        epic: Yup.string()
            .required('Please select an epic!')
    }),
    mapPropsToValues: () => ({
        epic: ""
    }),
    handleSubmit: (values, { 'props': { onContinue } }) => {
        onContinue(values)
    },
    displayName: 'MyForm',
})(IssueAddEpicForm);

const IssueAddEpic = ({ issueId }) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [sucessful, setSuccessful] = useState(false)

    const submitAddEpic = (value) => {

        //TODO 
        //Need last updated at.....
        
        dispatch(updateIssueAttribute({ _id: issueId, attribute: "epic", value: value.epic })).then(
            result => {
                if (result) {
                    setSuccessful(true)
                }
            }
        )
        setOpen(false)
    }

    return (
        <Fragment>
            <Button className="add-epic-btn" onClick={() => setOpen(true)}>
                <CreateIcon className="cursor" size="small" />
                Add epic
                        </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="max-width-dialog-title"
                maxWidth="md"
                fullWidth={true}
                className="dialog-container"
            >
                <IssueAddEpicContent onContinue={submitAddEpic} handleClose={() => setOpen(false)} />
            </Dialog>}
            {sucessful && <SuccessfulFeedback open={sucessful} message="Epic was added successfully!" />}
        </Fragment>
    )
}

export default IssueAddEpic