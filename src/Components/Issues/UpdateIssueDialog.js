import React from 'react';
import IssueUpdateSkeleton from "./IssueUpdateSkeleton"
import IssueDetailForm from "../Forms/IssueDetailForm"
import { MyDialog } from "../Shared/Dialog"

export const UpdateIssueDialog = ({ issueId = "", open, handleClose }) => {

    return (<MyDialog open={open} handleClose={handleClose} maxWidth="md">
        {issueId === "" ? <IssueUpdateSkeleton handleClose={handleClose} />
            : <IssueDetailForm issue={issueId} handleClose={handleClose} />}
    </MyDialog>)
}

export default UpdateIssueDialog


