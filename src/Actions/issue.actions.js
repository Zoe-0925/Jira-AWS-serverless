
import { appendNewIssue, deleteIssueFromStatus, fetchDeleteIssueFromStatus, fetchAppendNewIssue } from "./status.actions"
import { dispatchError, AUTHENTICATED, LOADING } from "./loading.actions"
import { generateDateString } from "../components/util"
import { API } from 'aws-amplify';

export const CREATE_SUB_TASK = "CREATE_SUB_TASK"
export const CREATE_ISSUE = "CREATE_ISSUE"
export const DELETE_TASK = "DELETE_TASK"
export const DELETE_EPIC = "DELETE_EPIC"
export const DELETE_ISSUE_BY_PROJECT = "DELETE_ISSUE_BY_PROJECT"
export const UPDATE_TASK = "UPDATE_TASK"
export const UPDATE_TASK_ATTRIBUTE = "UPDATE_TASK_ATTRIBUTE"
export const UPDATE_EPIC = "UPDATE_EPIC"
export const APPEND_ISSUES = "APPEND_ISSUES"
export const ADD_TASK_TO_EPIC = "ADD_TASK_TO_EPIC"
export const REMOVE_TASK_FROM_EPIC = "REMOVE_TASK_FROM_EPIC"

/**********************************  Thunk Actions  ******************************************/
export const chainCreateIssue = (data) => async (dispatch) => {
    try {
        const issue = { ...data, createdAt: generateDateString() }
        await Promise.all([
            dispatch({ type: LOADING }),
            fetchCreateIssue(issue),
            fetchAppendNewIssue({ statusId: issue.status, issueId: issue._id })
        ])
        await Promise.all([
            dispatch({
                type: CREATE_ISSUE,
                data: issue,
            }),
            //TODO
            //Uncomment below to enable web socket server
            /*
            await dispatch(sendWsToServer({
                type: CREATE_ISSUE,
                data: data,
                action: "create"
            }))
            */
            dispatch(appendNewIssue(issue.status, issue._id))
        ])
        return true
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

// source status id  = previousStatusId, destination status id = data.status
export const updateTaskAttribute = (data) => async (dispatch) => {
    try {
        dispatch({ type: LOADING })
        dispatch({
            type: UPDATE_TASK_ATTRIBUTE,
            id: data._id,
            key: data.attribute,
            value: data.value,
            updatedAt: data.updatedAt
        })
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const chainDeleteIssue = (issueId, statusId, issueType) => async (dispatch) => {
    try {
        if (issueType !== "task" && issueType !== "epic") { return }
        await Promise.all([
            dispatch({ type: LOADING }),
            fetchDeleteIssue(issueId),
            fetchDeleteIssueFromStatus({ issueId: issueId, statusId: statusId })
        ])
        dispatch({ type: LOADING })
        await Promise.all([
            dispatch(deleteIssue(issueId, issueType)),
            dispatch(deleteIssueFromStatus(issueId, statusId)),
        ])
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteIssue = (issueId, issueType) => async dispatch => {
    let midResult = {
        id: issueId,
        action: "delete"
    }
    let result
    switch (issueType) {
        case "task":
            result = {
                type: DELETE_TASK,
                ...midResult
            }
            break
        case "epic":
            result = {
                type: DELETE_EPIC,
                ...midResult
            }
            break
        default:
            return
    }
    await dispatch((result))

}

export const getProjectIssues = (projectId) => async dispatch => {
    try {
        const issues = await API.get("IssueApi", "/issues/project/" + projectId)
        let tasks = []
        let epics = []
        issues.map(each => {
            if (each.issueType === "task") {
                tasks = [...tasks, each]
                return
            }
            if (each.issueType === "epic") {
                epics = [...epics, each]
                return
            }
        })
        dispatch({
            type: APPEND_ISSUES,
            data: { tasks: tasks, epics: epics }
        })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

/********************************** API calls  ******************************************/

export const fetchCreateIssue = async data => {
    await API.push("IssueApi", "/issues", { body: data })
}

export const fetchUpdateIssueAttribute = async data => {
    await API.put("IssueApi", "/issues/update/attribute", { body: data })
}

export const fetchDeleteIssue = async id => {
    await API.del("IssueApi", "/issues/object" + id)
}

export const fetchDeleteIssueByProject = async projectId => {
    await API.del("IssueApi", "/issues/project" + projectId)
}