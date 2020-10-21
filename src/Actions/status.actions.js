import axios from 'axios'
import Util from "../Components/Util"
require('dotenv').config()


const { post, put, jwtConfig } = Util

export const LOADING_STATUS = "LOADING_STATUS"
export const ERROR_STATUS = "ERROR_STATUS"
export const CREATE_SUCCESS_STATUS = "CREATE_SUCCESS_STATUS"
export const DELETE_SUCCESS_STATUS = "DELETE_SUCCESS_STATUS"
export const UPDATE_SUCCESS_STATUS = "UPDATE_SUCCESS_STATUS"
export const APPEND_SUCCESS_STATUS = "APPEND_SUCCESS_STATUS"
export const REORDER_ISSUES = "REORDER_ISSUES"
export const MOVE_ISSUES = "MOVE_ISSUES"
export const DELETE_ISSUE_FROM_STATUS = "DELETE_ISSUE_FROM_STATUS"


export const createSuccessfulStatus = (data) => {
    return {
        type: CREATE_SUCCESS_STATUS,
        data: data
    }
}

export const updateSuccessfulStatus = (data) => {
    return {
        type: UPDATE_SUCCESS_STATUS,
        data: data
    }
}

export const deleteSuccessfulStatus = (id, issues) => {
    return {
        type: DELETE_SUCCESS_STATUS,
        id: id,
        issues: issues //issue ids
    }
}

export const appendSuccessfulStatus = (data, order) => {
    return {
        type: APPEND_SUCCESS_STATUS,
        data: data,
        order: order
    }
}

export function dispatchError(data) {
    return {
        type: ERROR_STATUS,
        data: data
    }
}

export const moveIssues = (source, destination, startIndex, endIndex) => {
    return {
        type: MOVE_ISSUES,
        sourceIndex: source,
        destinationIndex: destination,
        startIndex: startIndex,
        endIndex: endIndex
    }
}

export const reorderIssues = (source, startIndex, endIndex) => {
    return {
        type: REORDER_ISSUES,
        index: source,
        startIndex: startIndex,
        endIndex: endIndex
    }
}

export const reorderToBotttom = (source, startIndex) => {
    return {
        type: REORDER_ISSUES,
        index: source,
        startIndex: startIndex,
        endIndex: -1
    }
}

export const deleteSuccessfulIssueFromStatus = (issueId, statusId) => {
    return {
        type: DELETE_ISSUE_FROM_STATUS,
        issueId: issueId,
        statusId: statusId
    }
}

/**************************** Thunk Actions ***************************/

//TODO not finished yet.
export const moveIssuesRequest = (id, source, destination, startIndex, endIndex) => async  dispatch => {
    dispatch({ type: LOADING_STATUS })
    try {
        const token = localStorage.getItem("token")
        const call = source === destination
            ? fetchUpdateIssueOrders(process.env.BASE, id, source, startIndex, endIndex, token)
            : fetchUpdateMultipleIssueOrders(process.env.BASE, source, destination, startIndex, endIndex, token)
        const response = await dispatch(call)
        if (response.success && source === destination) {
            dispatch(reorderIssues(source, startIndex, endIndex))
        }
        else if (response.success && source !== destination) {
            dispatch(moveIssues(source, destination, startIndex, endIndex))
        }
        else {
            dispatch(dispatchError(response.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        //TODO
        //dispatch undo
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}

export const createStatus = (data) => async  dispatch => {
    dispatch({ type: LOADING_STATUS })
    try {
        const token = localStorage.getItem("token")
        const response = await dispatch(fetchCreateStatus(process.env.BASE, data, token))
        if (response.data.success) {
            data._id = response.data.data.id
            dispatch(createSuccessfulStatus(data))
        }
        else {
            dispatch(dispatchError(response.data.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}

export const updateStatus = (data) => async  dispatch => {
    dispatch({ type: LOADING_STATUS })
    try {
        const token = localStorage.getItem("token")
        const response = await dispatch(fetchUpdateStatus(process.env.BASE, data, token))
        if (response.data.success) {
            data._id = response.data.data.id
            dispatch(updateSuccessfulStatus(data))
        }
        else {
            dispatch(dispatchError(response.data.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}

export const deleteStatus = (id) => async  dispatch => {
    dispatch({ type: LOADING_STATUS })
    try {
        const token = localStorage.getItem("token")
        const response = await dispatch(deleteStatusById(process.env.BASE, id, token))
        if (response.data.success) {
            dispatch(deleteSuccessfulStatus(id))
        }
        else {
            dispatch(dispatchError(response.data.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}

export const getAllStatus = (projectId) => async  dispatch => {
    dispatch({ type: LOADING_STATUS })
    try {
        const token = localStorage.getItem("token")
        const response = await dispatch(fetchAllStatus(process.env.BASE, projectId, token))
        if (response.data.success) {
            //TODO check

            dispatch(createSuccessfulStatus(response.data.data))
        }
        else {
            dispatch(dispatchError(response.data.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        console.log('Error', err);
    }
}


/************************ API call Actions ****************************/
export async function fetchCreateStatus(BASE, item, token) {
    return post('status/', BASE, item, token)
}

export async function fetchStatusById(BASE, id, token) {
    return axios.get(BASE + 'status/' + id, jwtConfig(token));
}

export async function fetchAllStatus(BASE, id, token) {
    return axios.get(BASE + 'status/project/' + id, jwtConfig(token));
}

//TODO not sure if it's useful. Maybe delete later
export async function fetchUpdateStatus(BASE, id, update, token) {
    return put("status/" + id, BASE, update, token)
}

export async function fetchUpdateIssueOrders(BASE, id, startIndex, endIndex, token) {
    return put("status/" + id + "/issueOrders", BASE,
        { startIndex: startIndex, endIndex: endIndex }, token)
}

export async function fetchUpdateMultipleIssueOrders(BASE, sourceId, destinationId, startIndex, endIndex, token) {
    return put("status/issueOrders", BASE,
        { source: sourceId, destination: destinationId, startIndex: startIndex, endIndex: endIndex }, token)
}

export async function deleteStatusById(BASE, id, token) {
    return axios.delete(BASE + 'status/' + id, jwtConfig(token));
}

