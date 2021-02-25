import React from 'react';
import IssueUpdateSkeleton from "../Issues/IssueUpdateSkeleton"
import IssueDetailForm from "./UpdateIssueForm"
import { MyDialog } from "../Shared/Dialog"

export const UpdateIssueDialog = ({ issue, open, handleClose }) => (
<MyDialog open={open} handleClose={handleClose} maxWidth={false} fullWidth={true}>
    {!issue ? <IssueUpdateSkeleton handleClose={handleClose} />
        : <IssueDetailForm issue={issue} handleClose={handleClose} />}
</MyDialog>)


export default UpdateIssueDialog


