import API from '@aws-amplify/api';
import { dispatchError, LOADING } from "./loading.actions"
import { changeColumn, reorder } from "../Components/Util"

export const ADD_ISSUE_TO_TAIL = "ADD_ISSUE_TO_TAIL"
export const CREATE_SUCCESS_STATUS = "CREATE_SUCCESS_STATUS"
export const DELETE_SUCCESS_STATUS = "DELETE_SUCCESS_STATUS"
export const UPDATE_SUCCESS_STATUS = "UPDATE_SUCCESS_STATUS"
export const UPDATE_SUCCESS_STATUS_NAME = "UPDATE_SUCCESS_STATUS_NAME"
export const UPDATE_ISSUE_ORDER = "UPDATE_ISSUE_ORDER"
export const APPEND_SUCCESS_STATUS = "APPEND_SUCCESS_STATUS"
export const REORDER_ISSUES = "REORDER_ISSUES"
export const MOVE_ISSUES = "MOVE_ISSUES"
export const DELETE_ISSUE_FROM_STATUS = "DELETE_ISSUE_FROM_STATUS"
export const DELETE_STATUS_BY_PROJECT = "DELETE_STATUS_BY_PROJECT"

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

export const updateSuccessfulStatusName = (data) => {
    return {
        type: UPDATE_SUCCESS_STATUS_NAME,
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

export function deleteSuccessStatusByProject() {
    return {
        type: DELETE_STATUS_BY_PROJECT
    }
}

export function updateSuccessfulIssueOrder(data) {
    return {
        type: UPDATE_ISSUE_ORDER,
        data: data
    }
}

export function appendSuccessStatus(data) {
    return {
        type: APPEND_SUCCESS_STATUS,
        data: data
    }
}

export function addSuccessIssueToTail(statusId, issueId) {
    return {
        type: ADD_ISSUE_TO_TAIL,
        statusId: statusId,
        issueId: issueId
    }
}

/**************************** Thunk Actions ***************************/

export const moveIssues = (source, destination, startIndex, endIndex) => async (dispatch, getState) => {
    dispatch({ type: LOADING })
    try {
        const status = getState().StatusReducer.status
        let sourceStatus = { ...status.get(source) }
        let destinationStatus = { ...status.get(destination) }
        const { sourceIssueorder, destinationIssueorder } = changeColumn(sourceStatus.issues, destinationStatus.issues, startIndex, endIndex)
        const sourceUpdated = { _id: sourceStatus._id, issueOrder: sourceIssueorder }
        const destinationUpdated = { _id: destinationStatus._id, issueOrder: destinationIssueorder }
        await API.put("StatusApi", "/status/issueOrder", {
            body: {
                sourceUpdated
            }
        })
        await API.put("StatusApi", "/status/issueOrder", {
            body: {
                destinationUpdated
            }
        })
        dispatch({
            type: MOVE_ISSUES,
            source: sourceUpdated,
            destination: destinationUpdated
        })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const addIssueToTail = (statusId, issueId) => async (dispatch, getState) => {
    try {
        const issueOrder = [...getState().StatusReducer.status.get(statusId).issues, issueId]
        //TODO server returns 500
        dispatch(updateIssueOrder(statusId, issueOrder))
    } catch (err) {
        dispatch(dispatchError(err))
    }
}

export const reorderIssues = (source, startIndex, endIndex) => async (dispatch, getState) => {
    dispatch({ type: LOADING })
    try {
        const status = getState().StatusReducer.status
        let sourceStatus = { ...status.get(source) }
        const issueOrder = reorder(sourceStatus.issues, startIndex, endIndex)
        dispatch(updateIssueOrder(sourceStatus._id, issueOrder))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateIssueOrder = (id, issueOrder) => async  dispatch => {
    try {
        //TODO server returns 500
        await API.put("StatusApi", "/status/issueOrder", {
            body: { _id: id, value: issueOrder }
        })

        dispatch({
            type: UPDATE_ISSUE_ORDER,
            _id: id,
            issueOrder: issueOrder
        })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateStatusForIssue = (source, destination, issueId) => async (dispatch, getState) => {
    try {
        const allStatus = getState().StatusReducer.status
        const sourceUpdated = [allStatus.get(source).issues].filter(item => item._id === issueId)
        const destinationUpdated = [allStatus.get(destination).issues].push(issueId)

        await API.put("StatusApi", "/status/issueOrder", {
            body: { _id: source, value: sourceUpdated }
        })
        await API.put("StatusApi", "/status/issueOrder", {
            body: { _id: destination, value: destinationUpdated }
        })
        dispatch({
            type: MOVE_ISSUES,
            source: sourceUpdated,
            destination: destinationUpdated
        })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const getProjectStatus = (projectId) => async  dispatch => {
    try {
        const status = await API.get("StatusApi", "/status/project/" + projectId)
        dispatch(appendSuccessStatus(status))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const createStatus = (newStatus) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        await API.put("StatusApi", "/status", {
            body: newStatus
        })
        dispatch(createSuccessfulStatus(newStatus))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const createMultipleStatus = (list) => async  dispatch => {
    try {
        list.forEach(element => {
            API.post("StatusApi", "/status", {
                body: element
            }).catch(err => {
                dispatch(dispatchError(err))
                return
            })
        });
        dispatch(appendSuccessStatus(list))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateStatusName = (data) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        await API.put("StatusApi", "/status/name", {
            body: data
        })
        dispatch(updateSuccessfulStatusName(data))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateStatus = (data) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        await API.put("StatusApi", "/status/update", {
            body: data
        })
        dispatch(updateSuccessfulStatus(data))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteStatus = (id) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        await API.del("StatusApi", "/status/" + id)
        dispatch(deleteSuccessfulStatus(id))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const getAllStatus = (projectId) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        const data = await API.get("StatusApi", "/status/project/" + projectId)
        dispatch(createSuccessfulStatus(data))

    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteStatusByProject = (projectId, statusIds) => async (dispatch) => {
    dispatch({ type: LOADING })
    try {
        statusIds.foreach(statusId => {
            API.del("StatusApi", "/status/object/" + statusId).catch(err => {
                dispatch(dispatchError(err))
            })
        })
        dispatch(deleteSuccessStatusByProject(projectId))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteIssueFromStatus = (issueId, statusId) => async (dispatch, getState) => {
    dispatch({ type: LOADING })
    try {
        let status = getState().StatusReducer.status.get(statusId)
        let statusCopy = { ...status }
        let issuesUpdated = statusCopy.issues.filter(item => item !== issueId)
        await API.put("StatusApi", "/status/issueOrder", {
            body: issuesUpdated
        })
        dispatch(deleteSuccessfulIssueFromStatus(issueId, statusId))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}