
import { API } from 'aws-amplify';
require('dotenv').config()

export const CREATE_SUCCESS_SUB_TASK = "CREATE_SUCCESS_SUB_TASK"
export const CREATE_SUCCESS_ISSUE = "CREATE_SUCCESS_ISSUE"
export const LOADING_ISSUE = "LOADING_ISSUE"
export const ERROR_ISSUE = "ERROR_ISSUE"
export const DELETE_SUCCESS_TASK = "DELETE_SUCCESS_TASK"
export const DELETE_SUCCESS_EPIC = "DELETE_SUCCESS_EPIC"
export const DELETE_SUCCESS_SUB_TASK = "DELETE_SUCCESS_SUB_TASK"
export const DELETE_ISSUE_BY_PROJECT = "DELETE_ISSUE_BY_PROJECT"
export const UPDATE_SUCCESS_TASK = "UPDATE_SUCCESS_TASK"
export const UPDATE_SUCCESS_TASK_ATTRIBUTE = "UPDATE_SUCCESS_TASK_ATTRIBUTE"
export const UPDATE_SUCCESS_EPIC = "UPDATE_SUCCESS_EPIC"
export const APPEND_SUCCESS_ISSUES = "APPEND_SUCCESS_ISSUES"
export const APPEND_SUCCESS_CURRENT_TASK = "APPEND_SUCCESS_CURRENT_TASK"
export const APPEND_SUCCESS_CURRENT_EPIC = "APPEND_SUCCESS_CURRENT_EPIC"
export const ADD_TASK_TO_EPIC = "ADD_TASK_TO_EPIC"
export const REMOVE_TASK_FROM_EPIC = "REMOVE_TASK_FROM_EPIC"
export const ADD_SUBTASK_TO_TASK = "ADD_SUBTASK_TO_TASK"
export const REMOVE_SUBTASK_FROM_TASK = "REMOVE_SUBTASK_FROM_TASK"
export const UPDATE_ISSUE_GROUP = "UPDATE_ISSUE_GROUP"
export const TOGGLE_FLAG = "TOGGLE_FLAG"
/**********************************  Actions  ******************************************/
export function appendProjectIssues(data) {
    return {
        type: APPEND_SUCCESS_ISSUES,
        data: data
    }
}

export function createSuccessfulIssue(data) {
    return {
        type: CREATE_SUCCESS_ISSUE,
        data: data
    }
}

export function deleteSuccessfulEpic(id) {
    return {
        type: DELETE_SUCCESS_EPIC,
        id: id
    }
}

export function updateSuccessfulTask(data) {
    return {
        type: UPDATE_SUCCESS_TASK,
        data: data
    }
}

export function updateSuccessfulTaskAttribute(id, key, value) {
    return {
        type: UPDATE_SUCCESS_TASK_ATTRIBUTE,
        id: id,
        key: key,
        value: value
    }
}

export function updateSuccessfulEpic(data) {
    return {
        type: UPDATE_SUCCESS_EPIC,
        data: data
    }
}

export function updateIssueGroup(id, data) {
    return {
        type: UPDATE_ISSUE_GROUP,
        id: id,
        data: data
    }
}

export function toggleSuccessfulFlag(id) {
    return {
        type: TOGGLE_FLAG,
        id: id
    }
}

export function dispatchError(data) {
    return {
        type: ERROR_ISSUE,
        data: data
    }
}

export function deleteSuccessIssueByProject(id) {
    return {
        type: DELETE_ISSUE_BY_PROJECT,
        id: id
    }
}


/**********************************  Thunk Actions  ******************************************/
export const createIssue = (data) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {
        await API.post("IssueApi", "/issues/", { body: data })
        dispatch(createSuccessfulIssue(data))
        return true
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const getASingleIssue = (id) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {

    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const getProjectIssues = (projectId) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {
        const issues = await API.get("IssueApi", "/issues/project/" + projectId)
        let tasks = []
        let epics = []
        let subtasks = []
        issues.map(each => {
            if (each.issueType === "task") {
                tasks.push(each)
                return
            }
            if (each.issueType === "epic") {
                epics.push(each)
                return
            }
            if (each.issueType === "subtask") {
                subtasks.push(each)
                return
            }
        })
        dispatch(appendProjectIssues({
            tasks: tasks, epics: epics, subtasks: subtasks
        }))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateIssueSummary = (data) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {
        await API.put("IssueApi", "/issues/update/summary", {
            body: data
        })
        dispatch(updateSuccessfulTaskAttribute(data._id, "summary", data.value))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateIssueDescription = (data) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {
        await API.put("IssueApi", "/issues/update/description", {
            body: data
        })
        dispatch(updateSuccessfulTaskAttribute(data._id, "description", data.value))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateIssueAssignee = (data) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {
        await API.put("IssueApi", "/issues/update/assignee", {
            body: data
        })
        dispatch(updateSuccessfulTaskAttribute(data._id, "assignee", data.value))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateIssueReporter = (data) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {
        await API.put("IssueApi", "/issues/update/reporter", {
            body: data
        })
        dispatch(updateSuccessfulTaskAttribute(data._id, "reporter", data.value))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateIssueLabel = (data) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {
        await API.put("IssueApi", "/issues/update/labels", {
            body: data
        })
        dispatch(updateSuccessfulTaskAttribute(data._id, "labels", data.value))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const toggleFlag = (id, flag) => async dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {
        await API.put("IssueApi", "/issues/update/flag", {
            body: {
                _id: id,
                flag: flag
            }
        })
        dispatch(toggleSuccessfulFlag(id))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteIssue = (issueId, issueType) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {
        await API.del("IssueApi", "/issues/object/" + issueId)
        switch (issueType) {
            case "task":
                return dispatch(deleteSuccessfulTask(issueId))
            case "epic":
                return dispatch(deleteSuccessfulEpic(issueId))
            case "subtask":
                return dispatch(deleteSuccessfulSubtask(issueId))
            default:
                return
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteIssueByProject = (projectId) => async (dispatch, getState) => {
    dispatch({ type: LOADING_ISSUE })
    try {
        const reducer = getState.IssueReducer
        const tasksToDelete = reducer.tasks.filter(item => item.project === projectId).map(each => each._id)
        const epicsToDelete = reducer.epics.filter(item => item.project === projectId).map(each => each._id)
        const subtasksToDelete = reducer.subtasks.filter(item => item.project === projectId).map(each => each._id)
        tasksToDelete.concat(epicsToDelete).concat(subtasksToDelete)
            .foreach(item =>
                API.del("IssueApi", "/issues/object/" + item).catch(err => dispatchError(err))
            )
        dispatch(deleteSuccessIssueByProject(projectId))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

