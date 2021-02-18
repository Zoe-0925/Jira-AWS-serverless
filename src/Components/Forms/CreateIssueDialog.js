import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@material-ui/core';
import { selectAllProjects, selectFirstStatus } from "../../Reducers/Selectors"
import { chainCreateIssueAndUpdateIssueOrder } from "../../Actions/issue.actions"
import { SuccessfulFeedback } from "../Shared/Feedback"
import CreateIssueForm from "./CreateIssueForm"
import { MyDialog } from "../Shared/Dialog"

export default function CreatIssueDialog() {
    const dispatch = useDispatch()
    const defaultStatusId = useSelector(selectFirstStatus)
    const [open, setOpen] = useState(false)
    const [sucessful, setSuccessful] = useState(false)
    const projects = useSelector(selectAllProjects)

    const submitCreateIssue = (value) => {
        let issue = {
            _id: uuidv4(), status: defaultStatusId, issueType: "task",
            labels: [], assignee: "", reporter: "", ...value
        }
        if (issue.issueTye === "epic") {
            const today = new Date()
            issue.startDate = JSON.stringify(today)
            issue.dueDate = JSON.stringify(today.setMonth(today.getMonth() + 1))
            if (issue.project === "") { issue.project = projects[0]._id }
            dispatch(chainCreateIssueAndUpdateIssueOrder(issue)).then(
                result => {
                    if (result) {
                        setSuccessful(true)
                    }
                }
            )
            setOpen(false)
        }
    }

    return (
        <Fragment>
            {projects && (
                <Fragment>
                    <Button className="navbar-create-btn" onClick={() => setOpen(true)}>Create</Button>
                    <MyDialog open={open} handleClose={() => setOpen(false)} maxWidth="lg">
                        <CreateIssueForm onContinue={submitCreateIssue} handleClose={() => setOpen(false)} />
                    </MyDialog>
                    {sucessful && <SuccessfulFeedback open={sucessful} message="Issue created successfully!" />}
                </Fragment>
            )}
            {sucessful && <SuccessfulFeedback open={sucessful} message="Issue created successfully!" />}
        </Fragment>
    )
}
