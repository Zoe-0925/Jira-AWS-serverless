import React, {useState} from 'react'
import IssueDetail from "../Components/Issues/IssueDetail"
import {
    Button,
} from '@material-ui/core';


const testIssue = new Map()
testIssue.set("hdkahdjaskdh", {
    _id: "hdkahdjaskdh", summary: "test 1", key: "test key 1", labels: ["test"], assignee: "testUserId",
    description: "test description", status: "1",
    issueType: "task", flag: false, reportee: "testUserId", project: "test id"
})

export default function Test() {
    const [open, setOpen] = useState(false)


    return (<div>
        <Button onClick={() => setOpen(true)}>open</Button>
        <IssueDetail open={open} handleClose={() => setOpen(false)} issue={testIssue} />
    </div>
    )
}


//  <IssueModal open={true} closeModal={()=>{}} issue={testIssue}/>


/**
 *    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
 */