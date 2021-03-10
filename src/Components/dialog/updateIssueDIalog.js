import React from "react";
import IssueUpdateSkeleton from "../forms/issueUpdateSkeleton"
import IssueDetailForm from "../forms/updateIssueForm"
import { Dialog } from '@material-ui/core';

const IssueDetailDialog = ({ currentIssue, handleClose, open }) => (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        fullWidth={true}
        maxWidth="md"
    >
        {!currentIssue ? <IssueUpdateSkeleton handleClose={handleClose} />
            : <IssueDetailForm issue={currentIssue} handleClose={handleClose} />
        }
    </Dialog>
)

export default IssueDetailDialog