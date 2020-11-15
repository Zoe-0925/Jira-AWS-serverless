import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../Actions/user.actions"
import { createMultipleStatus, createStatus } from "../Actions/status.actions"
import API from '@aws-amplify/api';
import { initiateProjectAndStatus } from "../Components/Util"
import { selectCurrentProject } from "../Reducers/Selectors"

const testIssue = new Map()
testIssue.set("hdkahdjaskdh", {
    _id: "hdkahdjaskdh", summary: "test 1", key: "test key 1", labels: ["test"], assignee: "testUserId",
    description: "test description", status: "1",
    issueType: "task", flag: false, reportee: "testUserId", project: "test id"
})

const status = [{
    _id: "test_id_1", name: "TO DO", project: "test_project_id", issues: []
},
{
    _id: "test_id_2", name: "IN PROGRESS", project: "test_project_id", issues: []
},
{
    _id: "test_id_3", name: "TEST", project: "test_project_id", issues: []
},
{
    _id: "test_id_4", name: "DONE", project: "test_project_id", issues: []
}
]

export default function Test() {
    const dispatch = useDispatch()
    const status = useSelector(selectCurrentProject)

    useEffect(() => {
        API.get("StatusApi", "/status/project/" + "7c1f9838-dbd7-4432-b52c-aae87022d578").then(
            status => console.log("status", status)
        )
    }, [])

    return (<div>
        <Button >open</Button>

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