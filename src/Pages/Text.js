import React, { useState } from 'react'
import IssueDetailForm from "../Components/Forms/UpdateIssueForm"

const Text = () => {

    const currentIssue = {
        _id: "issueId3", summary: "Code feature C", description: "", updatedAt: "", createdAt: "", issueType: "task",
        parent: "", status: "efe83b13-9255-4339-a8f5-d5703beb9ffc", project: "7c1f9838-dbd7-4432-b52c-aae87022d578"
    }

    return (
        <>
            Rich Text Editor
            <IssueDetailForm issue={currentIssue} handleClose={() => { }} />
        </>
    )
}

export default Text