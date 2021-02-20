import React from 'react';
import IssueUpdateSkeleton from "../issues/issueUpdateSkeleton"
import IssueDetailForm from "./updateIssueForm"
import { MyDialog } from "../shared/dialog"

export const UpdateIssueDialog = ({ issue, open, handleClose }) => (
<MyDialog open={open} handleClose={handleClose} maxWidth="lg">
    {!issue ? <IssueUpdateSkeleton handleClose={handleClose} />
        : <IssueDetailForm issue={issue} handleClose={handleClose} />}
</MyDialog>)


export default UpdateIssueDialog


