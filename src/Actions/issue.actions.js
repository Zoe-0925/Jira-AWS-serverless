import axios from 'axios'
import Util from "../Components/Util"
import { createSuccessfulStatus, deleteSuccessfulIssueFromStatus } from "./status.actions"
import { appendSuccessfulLabels } from "./label.actions"
require('dotenv').config()

const { post, put, jwtConfig } = Util

export const CREATE_SUCCESS_SUB_TASK = "CREATE_SUCCESS_SUB_TASK"
export const APPEND_SUCCESS_TASKS_PARENT = "APPEND_SUCCESS_TASKS_PARENT"
export const APPEND_SUCCESS_TASKS_CHILDREN = "APPEND_SUCCESS_TASKS_CHILDREN"
export const LOADING_ISSUE = "LOADING_ISSUE"
export const ERROR_ISSUE = "ERROR_ISSUE"
export const CREATE_SUCCESS_TASK = "CREATE_SUCCESS_TASK"
export const CREATE_SUCCESS_EPIC = "CREATE_SUCCESS_EPIC"
export const DELETE_SUCCESS_TASK = "DELETE_SUCCESS_TASK"
export const DELETE_SUCCESS_EPIC = "DELETE_SUCCESS_EPIC"
export const DELETE_ISSUE_BY_PROJECT="DELETE_ISSUE_BY_PROJECT"
export const UPDATE_SUCCESS_TASK = "UPDATE_SUCCESS_TASK"
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

export function appendCurrentTask(data) { //Append the issue to be opened in a page or modal
    return {
        type: APPEND_SUCCESS_CURRENT_TASK,
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

export function deleteSuccessIssueByProject(id){
    return {
        type: DELETE_ISSUE_BY_PROJECT,
        id: id
    }
}


/**********************************  Thunk Actions  ******************************************/
export const getLabelsAndIssuesGroupByStatus = (projectId, token) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {
        const response = await dispatch(fetchLabelsAndIssuesAndStatus(process.env.BASE, projectId, token))
        if (response.data.success) {
            dispatch(appendSuccessfulLabels(response.data.labels)) //Array
            dispatch(createSuccessfulStatus(response.data.status)) //Array
            dispatch(appendSuccessfulEpics(response.data.epics)) //Array
            dispatch(appendSuccessfulTasks(response.data.issues)) // Map()
        }
        else {
            dispatch(dispatchError(response.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
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
        if (subTasks.length > 0) { dispatch(appendSuccessfulSubTasks(subTasks)) }
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}


export const createTask = (data) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {
        //TODO change this to session storage
        const token = localStorage.getItem("token")
        const response = await dispatch(fetchCreateIssue(process.env.BASE, data, token))
        if (response.data.success) {
            let newData = Object.assign({}, data)
            newData._id = response.id
            dispatch(createSuccessfulTask(newData))
        }
        else {
            dispatch(dispatchError(response.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}

export const createEpic = (data) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {
        //TODO change this to session storage
        const token = localStorage.getItem("token")
        const response = await dispatch(fetchCreateIssue(process.env.BASE, data, token))
        if (response.data.success) {
            let newData = Object.assign({}, data)
            newData._id = response.id
            dispatch(createSuccessfulEpic(newData))
        }
        else {
            dispatch(dispatchError(response.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}

export const getASingleIssue = (id) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {
        const token = localStorage.getItem("token")
        const response = await dispatch(fetchIssueById(process.env.BASE, id, token))
        if (response.data.success) {
            dispatch(appendSuccessfulTasks(response.data.data))
        }
        else {
            dispatch(dispatchError(response.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}


//TODO need to think about the flow.
//Where to store in the store, and where does the client take it
export const getIssueByProjectAndType = (id, type) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {
        const token = localStorage.getItem("token")
        const response = await dispatch(fetchByProjectAndIssueType(process.env.BASE, id, type, token))
        if (response.data.success) {
            dispatch(appendCurrentTask(response.data.data))
        }
        else {
            dispatch(dispatchError(response.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}


export const updateIssue = (data) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {
        const token = localStorage.getItem("token")
        const response = await dispatch(fetchUpdateIssue(process.env.BASE, data, token))
        if (response.data.success) {
            dispatch(updateSuccessfulTask(data))
        }
        else {
            dispatch(dispatchError(response.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}

export const deleteIssue = (issueId, statusId) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {
        const token = localStorage.getItem("token")
        const response = await dispatch(fetchDeleteIssue(process.env.BASE, issueId, token))
        if (response.data.success) {
            dispatch(deleteSuccessfulTask(issueId))
            dispatch(deleteSuccessfulIssueFromStatus(issueId, statusId))
        }
        else {
            dispatch(dispatchError(response.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}

export const toggleFlag = (id) => async  dispatch => {
    dispatch({ type: LOADING_ISSUE })
    try {
        const token = localStorage.getItem("token")
        const response = await dispatch(fetchToggleFlag(process.env.BASE, id, token))
        if (response.data.success) {
            dispatch(toggleSuccessfulFlag(id))
        }
        else {
            dispatch(dispatchError(response.message))
        }

    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}

export const deleteIssueByProject = (projectId) => async  dispatch => {

}

/**********************************  API Call Actions  ******************************************/

