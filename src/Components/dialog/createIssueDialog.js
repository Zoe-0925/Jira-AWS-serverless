import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@material-ui/core';
import { selectAllProjects, selectCurrentProjectId, selectFirstStatus } from "../../reducers/selectors"
import { chainCreateIssue} from "../../actions/issue.actions"
import { SuccessfulFeedback } from "../feedback/feedback"
import CreateIssueForm from "../forms/createIssueForm"
import { MyDialog } from "./dialog"
import { EditorState, convertToRaw } from "draft-js";

export default function CreateIssueDialog() {
    const dispatch = useDispatch()
    const defaultStatusId = useSelector(selectFirstStatus)
    const [open, setOpen] = useState(false)
    const [sucessful, setSuccessful] = useState(false)
    const projects = useSelector(selectAllProjects)
    const currentProjectId = useSelector(selectCurrentProjectId)
    const [editorState, setEditorState] = useState(
        () => { EditorState.createEmpty() });

    const submitCreateIssue = (value) => {
        let issue = {
            _id: uuidv4(), status: defaultStatusId, issueType: "task",
            assignee: "", reporter: "", ...value, project:currentProjectId
        }

        dispatch(chainCreateIssue(issue)).then(
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
            {projects && (
                <Fragment>
                    <Button className="navbar-create-btn" onClick={() => setOpen(true)}>Create</Button>
                    <MyDialog open={open} handleClose={() => setOpen(false)} maxWidth="lg">
                        <CreateIssueForm onContinue={submitCreateIssue} handleClose={() => setOpen(false)}
                            editorState={editorState} setEditorState={setEditorState}
                        />
                    </MyDialog>
                </Fragment>
            )}
            {sucessful && <SuccessfulFeedback open={sucessful} message="Issue created successfully!" />}
        </Fragment>
    )
}
