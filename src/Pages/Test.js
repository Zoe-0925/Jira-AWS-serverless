import React, { useState } from 'react'
import IssueDetail from "../Components/Issues/IssueDetail"
import {
    Button,
} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../Actions/user.actions"
import API from '@aws-amplify/api';

const testIssue = new Map()
testIssue.set("hdkahdjaskdh", {
    _id: "hdkahdjaskdh", summary: "test 1", key: "test key 1", labels: ["test"], assignee: "testUserId",
    description: "test description", status: "1",
    issueType: "task", flag: false, reportee: "testUserId", project: "test id"
})

export default function Test() {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()


    const retrieveUser = async () => {
        // dispatch(getCurrentUser())
        console.log("clicked")
        const date = new Date()
        const status = await API.put("StatusApi", "/status", {
            body: {
                _id: "statusId",
                name: "Test Status",
                project: "projectId",
                issues: ["issueId"]
            }
        })
        const project = await API.put("StatusApi", "/status", {
            body: {
                _id: "projectId",
                name: "Test Project",
                key: "Test Key",
                lead: "userId",
                members: ["userId"],
                image: "",
                default_assignee: 'Project Lead',
                start_date: JSON.stringify(date),
                members: []
            }
        })
        const issue = await API.put("IssueApi", "/issues", {
            body: {
                _id: "issueId",
                project: "projectId",
                summary: "test summary",
                issueType: "task",
                description: "test description",
                status: "statusId",
                assignee: "userId",
                labels: [],
                flag: false,
                startDate: JSON.stringify(date),
                parent: "",
                created: JSON.stringify(date),
                updated: JSON.stringify(date)
            }
        })
        console.log("result")
    }


    return (<div>
        <Button onClick={() => retrieveUser()}>open</Button>

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

/**
 * {
               _id:"testProjectId",
               name:"Test Project",
               key:"Test key",
               lead:"test id",
               members:[],
               image:"",
               default_assignee:'Project Lead',
               start_date:JSON.stringify(date)
           }
 */

 //get project by id
 //const project = API.get("ProjectApi", "/projects/object/" + projectId)


 //get user by email
 //  const result = await API.get("UserApi", "/users/email/"+ email);

 //create label
/**
const result = await API.put("LabelApi", "/labels", {
   body: newLabel
});

*/

/*
Create status

      const result = await API.put("StatusApi", "/status", {
            body: {
                _id: "testStatusId",
                name: "Test Status",
                project: "testProjectId",
                issues: []
            }})
*/