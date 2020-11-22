import API from '@aws-amplify/api';
import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"
import { reorder } from "../Components/Util"
import {  deleteIssue } from "./issue.actions"
import { removeStatusFromOrder, updateProjectAttribute } from "./project.actions"

export const ADD_ISSUE_TO_TAIL = "ADD_ISSUE_TO_TAIL"
export const CREATE_STATUS = "CREATE_STATUS"
export const DELETE_STATUS = "DELETE_STATUS"
export const UPDATE_STATUS_NAME = "UPDATE_STATUS_NAME"
export const UPDATE_ISSUE_ORDER = "UPDATE_ISSUE_ORDER"
export const APPEND_STATUS = "APPEND_STATUS"
export const REORDER_ISSUES = "REORDER_ISSUES"
export const MOVE_ISSUES = "MOVE_ISSUES"
export const DELETE_ISSUE_FROM_STATUS = "DELETE_ISSUE_FROM_STATUS"
export const DELETE_STATUS_BY_PROJECT = "DELETE_STATUS_BY_PROJECT"

export const reorderToBotttom = (source, startIndex) => {
    return {
        type: REORDER_ISSUES,
        index: source,
        startIndex: startIndex,
        endIndex: -1
    }
}

export function appendSuccessStatus(data) {
    return {
        type: APPEND_STATUS,
        data: data
    }
}

//TODO
//Check if it is necessary
export function addSuccessIssueToTail(statusId, issueId) {
    return {
        type: ADD_ISSUE_TO_TAIL,
        statusId: statusId,
        issueId: issueId
    }
}

/**************************** Thunk Actions ***************************/

export const chainCreateStatus = data => async (dispatch, getState) => {
    dispatch({ type: LOADING })
    try {
        const project = getState().ProjectReducer.projects.find(item => item._id === data.project)
        await Promise.all([
            dispatch(createStatus(data)),
            dispatch(updateProjectAttribute({ _id: data.project, attribute: "statusOrder", value: [...project.statusOrder, data._id] }))
        ])
        dispatch({ type: AUTHENTICATED })
    } catch (err) {
        dispatch(dispatchError(err))
    }
}

export const chaninDeleteStatus = (status) => async (dispatch) => {
    dispatch({ type: LOADING })
    try {
        await Promise.all([
            dispatch(deleteStatus(status._id)),
            dispatch(removeStatusFromOrder(status._id))
        ])
        status.issues.map(each => dispatch(deleteIssue(each), "task"))
    } catch (err) {
        dispatch(dispatchError(err))
    }
}

//TODO
//No api call here
export const chainReorder = (sourceStatus, startIndex, endIndex) => async (dispatch) => {
    dispatch({ type: LOADING })
    try {
        const issueOrder = reorder(sourceStatus.issues, startIndex, endIndex)
        await dispatch(updateIssueOrder(sourceStatus._id, issueOrder))
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const chainMove = (sourceStatus, destinationStatus, startIndex, endIndex) => async (dispatch) => {
    dispatch({ type: LOADING })
    try {
        let sourceIssueorder = [...sourceStatus.issues]
        let destinationIssueorder = [...destinationStatus.issues]
        const [removedToMove] = sourceIssueorder.splice(startIndex, 1);
        destinationIssueorder.splice(endIndex, 0, removedToMove);
        const sourceUpdated = { _id: sourceStatus._id, value: sourceIssueorder, attribute: "issues" }
        const destinationUpdated = { _id: destinationStatus._id, value: destinationIssueorder, attribute: "issues" }
        await API.put("StatusApi", "/status/update/attribute", {
            body: {
                sourceUpdated
            }
        })
        await API.put("StatusApi", "/status/update/attribute", {
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

export const updateIssueOrder = (id, issueOrder) => async  dispatch => {
    try {
        const data = { _id: id, attribute: "issues", value: issueOrder }
        await dispatch({ ...data, type: UPDATE_ISSUE_ORDER })
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

        await API.put("StatusApi", "/status/update/attribute", {
            body: { _id: source, value: sourceUpdated, attribute: "issues" }
        })
        await API.put("StatusApi", "/status/update/attribute", {
            body: { _id: destination, value: destinationUpdated, attribute: "issues" }
        })
        await dispatch({
            type: MOVE_ISSUES,
            source: sourceUpdated,
            destination: destinationUpdated
        })
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const getProjectStatus = (projectId) => async  dispatch => {
    try {
        const status = await API.get("StatusApi", "/status/project/" + projectId)
        await dispatch(appendSuccessStatus(status))
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const createStatus = (newStatus) =>   dispatch => {
         dispatch({
            type: CREATE_STATUS,
            data: newStatus
        })
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
        await dispatch(appendSuccessStatus(list))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateStatusName = (data) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        await API.put("StatusApi", "/status/update/attribute", {
            body: data
        })
        await dispatch({
            type: UPDATE_STATUS_NAME,
            data: data
        })
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteStatus = (id) => async  dispatch => {
    try {
        await API.del("StatusApi", "/status/" + id)
        dispatch({
            type: DELETE_STATUS,
            id: id
        })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteStatusByProject = (projectId) => async (dispatch) => {
    try {
        await API.del("StatusApi", "/status/project/" + projectId)
        dispatch({ type: "DELETE_PROJECT" })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteIssueFromStatus = (issueId, statusId) => async (dispatch, getState) => {
    try {
        let status = getState().StatusReducer.status.get(statusId)
        let statusCopy = { ...status }
        let issuesUpdated = statusCopy.issues.filter(item => item !== issueId)
        await API.put("StatusApi", "/status/update/attribute", {
            body: { _id: statusId, attribute: "issues", value: issuesUpdated }
        })
        dispatch({
            type: DELETE_ISSUE_FROM_STATUS,
            issueId: issueId,
            statusId: statusId
        })
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}