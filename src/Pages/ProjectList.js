import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { saveProjectIssues } from "../Actions/issue.actions"
import { saveProjectStatus } from "../Actions/status.actions"
import { saveProjectLabels } from "../Actions/labels.actions"
import { selectAllProjects } from "../Reducers/Selectors"
import API from '@aws-amplify/api';

export default function ProjectList() {
    const dispatch = useDispatch()
    const projects = useSelector(selectAllProjects)

    const fetchBoardPage = (projectId) => {
        const [issues, status, labels] = await Promise.all(
            API.get("IssueApi", "/issues/project/" + projectId),
            API.get("StatusApi", "/status/project/" + projectId),
            API.get("LabelApi", "/labels/project/" + projectId)
        )
        dispatch(saveProjectIssues(issues))
        dispatch(saveProjectStatus(status, projects.statusOrder)) //TODO need status order from the project object
        dispatch(saveProjectLabels(labels))
        history.push("/board")
    }

    const handleClick = () => {
        // retrieve the projectId and call fetchBoardPage

    }

    return (
        <div>

        </div>
    )
}
