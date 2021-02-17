import React from 'react';
import IssueUpdateSkeleton from "./IssueUpdateSkeleton"
import IssueDetailForm from "../Forms/IssueDetailForm"
import { MyDialog } from "../Shared/Dialog"

export const UpdateIssueDialog = ({ issue, open, handleClose }) => (
<MyDialog open={open} handleClose={handleClose} maxWidth="lg">
    {!issue ? <IssueUpdateSkeleton handleClose={handleClose} />
        : <IssueDetailForm issue={issue} handleClose={handleClose} />}
</MyDialog>)


export default UpdateIssueDialog


