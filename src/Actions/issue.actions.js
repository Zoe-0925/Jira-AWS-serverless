
import { createSuccessfulStatus, deleteSuccessfulIssueFromStatus } from "./status.actions"
import { appendSuccessfulLabels } from "./label.actions"
import { API } from 'aws-amplify';
require('dotenv').config()

export const CREATE_SUCCESS_SUB_TASK = "CREATE_SUCCESS_SUB_TASK"
export const APPEND_SUCCESS_TASKS_PARENT = "APPEND_SUCCESS_TASKS_PARENT"
export const APPEND_SUCCESS_TASKS_CHILDREN = "APPEND_SUCCESS_TASKS_CHILDREN"
export const LOADING_ISSUE = "LOADING_ISSUE"
export const ERROR_ISSUE = "ERROR_ISSUE"
export const CREATE_SUCCESS_TASK = "CREATE_SUCCESS_TASK"
export const CREATE_SUCCESS_EPIC = "CREATE_SUCCESS_EPIC"
export const DELETE_SUCCESS_TASK = "DELETE_SUCCESS_TASK"
export const DELETE_SUCCESS_EPIC = "DELETE_SUCCESS_EPIC"
export const DELETE_ISSUE_BY_PROJECT = "DELETE_ISSUE_BY_PROJECT"
export const UPDATE_SUCCESS_TASK = "UPDATE_SUCCESS_TASK"
export const UPDATE_SUCCESS_TASK_SUMMARY = "UPDATE_SUCCESS_TASK_SUMMARY"
export const UPDATE_SUCCESS_TASK_DESCRIPTION = "UPDATE_SUCCESS_TASK_DESCRIPTION"
export const UPDATE_SUCCESS_TASK_ASIGNEE = "UPDATE_SUCCESS_TASK_ASIGNEE"
export const UPDATE_SUCCESS_TASK_REPORTER = "UPDATE_SUCCESS_TASK_REPORTER"
export const UPDATE_SUCCESS_EPIC = "UPDATE_SUCCESS_EPIC"
export const APPEND_SUCCESS_TASKS = "APPEND_SUCCESS_TASKS"
export const APPEND_SUCCESS_EPICS = "APPEND_SUCCESS_EPICS"
export const APPEND_SUCCESS_SUBTASKS = "APPEND_SUCCESS_SUBTASKS"
export const APPEND_SUCCESS_CURRENT_TASK = "APPEND_SUCCESS_CURRENT_TASK"
export const APPEND_SUCCESS_CURRENT_EPIC = "APPEND_SUCCESS_CURRENT_EPIC"
export const DELETE_SUCCESS_SUB_TASK = "DELETE_SUCCESS_SUB_TASK"
export const ADD_TASK_TO_EPIC = "ADD_TASK_TO_EPIC"
export const REMOVE_TASK_FROM_EPIC = "REMOVE_TASK_FROM_EPIC"
export const ADD_SUBTASK_TO_TASK = "ADD_SUBTASK_TO_TASK"
export const REMOVE_SUBTASK_FROM_TASK = "REMOVE_SUBTASK_FROM_TASK"
export const UPDATE_ISSUE_GROUP = "UPDATE_ISSUE_GROUP"
export const TOGGLE_FLAG = "TOGGLE_FLAG"
/**********************************  Actions  ******************************************/
export function appendSuccessfulTasks(data) {
    return {
        type: APPEND_SUCCESS_TASKS,
        data: data
    }
}

export function appendSuccessfulEpics(data) {
    return {
        type: APPEND_SUCCESS_EPICS,
        data: data
    }
}

export function appendSuccessfulSubtasks(data) {
    return {
        type: APPEND_SUCCESS_SUBTASKS,
        data: data
    }
}

export function createSuccessfulTask(data) {
    return {
        type: CREATE_SUCCESS_TASK,
        data: data
    }
}

export function createSuccessfulEpic(data) {
    return {
        type: CREATE_SUCCESS_EPIC,
        data: data
    }
}

export function deleteSuccessfulTask(id) {
    return {
        type: DELETE_SUCCESS_TASK,
        id: id
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

export function updateSuccessfulTaskSummary(data) {
    return {
        type: UPDATE_SUCCESS_TASK_SUMMARY,
        data: data
    }
}

export function updateSuccessfulTaskDescription(data) {
    return {
        type: UPDATE_SUCCESS_TASK_DESCRIPTION,
        data: data
    }
}

export function updateSuccessfulTaskAssignee(data) {
    return {
        type: UPDATE_SUCCESS_TASK_ASSIGNEE,
        data: data
    }
}

export function updateSuccessfulTaskReporter(data) {
    return {
        type: UPDATE_SUCCESS_TASK_REPORTER,
        data: data
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

export function dispatchError() {
    return {
        type: ERROR_ISSUE
    }
}

export function deleteSuccessIssueByProject(id) {
    return {
        type: DELETE_ISSUE_BY_PROJECT,
        id: id
    }
}


/**********************************  Thunk Actions  ******************************************/
export const getLabelsAndIssuesGroupByStatus = (projectId, token) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {

    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const saveProjectIssues = (issues) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    const tasks = issues.filter(item => item.issueType === "task")
    const epics = issues.filter(item => item.issueType === "epic")
    const subTasks = issues.filter(item => item.issueType === "subtask")
    try {
        if (tasks.length > 0) { dispatch(appendSuccessfulTasks(tasks)) }
        if (epics.length > 0) { dispatch(appendSuccessfulEpics(epics)) }
        //TODO
        //  if (subTasks.length > 0) { dispatch(appendSuccessfulSubTasks(subTasks)) }
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}


export const createTask = (data) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {

    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const createEpic = (data) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {

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


//TODO need to think about the flow.
//Where to store in the store, and where does the client take it
export const getIssueByProjectAndType = (id, type) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {

    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}


export const updateIssue = (data) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {
        await API.put("IssueApi", "/issues/update", {
            body: data
        })
        dispatch(updateSuccessfulTask(data))
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
        dispatch(updateSuccessfulTaskSummary(data))
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
        dispatch(updateSuccessfulTaskDescription(data))
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
        dispatch(updateSuccessfulTaskAssignee(data))
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
        dispatch(updateSuccessfulTaskReporter(data))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteTask = (issueId) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {
        await API.del("IssueApi", "/issues/object/" + issueId)
        dispatch(deleteSuccessfulTask(issueId))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const toggleFlag = (id) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {


    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteIssueByProject = (projectId) => async (dispatch, getState) => {
    dispatch({ type: LOADING_ISSUE })
    try {
        //TODO
        //TODO: get all the keys of all issues to be deleted.
        // Then paginate the keys into sets of 25.
        // for each set, call the API's batch delete.


        //update batch write item and update the api call
        // await API.del("IssueApi", "/issues/project/" + projectId)
        dispatch(deleteSuccessIssueByProject(projectId))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

