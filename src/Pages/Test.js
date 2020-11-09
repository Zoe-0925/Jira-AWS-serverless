import React, { useState } from 'react'
import IssueDetail from "../Components/Issues/IssueDetail"
import {
    Button,
} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../Actions/user.actions"
import { createMultipleStatus, createStatus } from "../Actions/status.actions"
import API from '@aws-amplify/api';
import { initiateProjectAndStatus } from "../Components/Util"

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
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()


    const putStatus = async () => {
        /**  const projects= await API.post("ProjectApi", "/projects", {
              body: {
                  _id: "test id",
                  name: "test project name",
                  key: "test key",
                  lead: "testUserId",
                  members: ["testUserId"],
                  image: "",
                  issues: [],
                  default_assignee: "Project Lead",
                  start_date: "",
                  statusOrder: ["1", "2", "3", "4"]
              }
          }
          )*/

        const testProject = {
            createdAt: "2020-11-08T05:59:49.358Z",
            default_assignee: "Project Lead",
            image: "",
            key: "TestProject1Key",
            lead: "testUserId",
            members: ["testUserId"],
            name: "TestProject1",
            statusOrder: [],
            updatedAt: "2020-11 - 08T05: 59: 49.358Z",
            _id: "b5d64095-24fa-48cc-8288-2dc6fae20ec6"
        }
        //   const projects = await API.post("ProjectApi", "/projects", {     body: testProject   })
        await API.post("UserApi", "/users", {
            body: {
                _id: "tsidadsjkdhiueiurt",
                name: "Zoe Zhang",
                email: "jin0925aki@gmail.com",
                projects: []
            }
        })
    }


    return (<div>
        <Button onClick={() => putStatus()}>open</Button>

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