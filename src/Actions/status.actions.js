import API from '@aws-amplify/api';
import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"
import { reorder } from "../Components/Util"
import { deleteIssue } from "./issue.actions"
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

/**************************** Thunk Actions ***************************/

export const chainCreateStatus = data => async (dispatch, getState) => {
    dispatch({ type: LOADING })
    try {
        const project = getState().ProjectReducer.projects.find(item => item._id === data.project)
        let payload = [createStatus(data), updateProjectAttribute({ _id: data.project, attribute: "statusOrder", value: [...project.statusOrder, data._id] })]
        await dispatch({ type: NEW_MESSAGE, payload: payload })
    } catch (err) {
        dispatch(dispatchError(err))
    }
}

//TODO 
// removeStatusFromOrder needs to update payload
// otherwise the wss server can not call the API
export const chaninDeleteStatus = (status) => async (dispatch) => {
    dispatch({ type: LOADING })
    try {
        let payload = [deleteStatus(status._id), removeStatusFromOrder(status._id)]
        //status.issues.map(each => dispatch(deleteIssue(each), "task"))
    } catch (err) {
        dispatch(dispatchError(err))
    }
}

export const chainReorder = (sourceStatus, startIndex, endIndex) => async (dispatch) => {
    try {
        const issueOrder = reorder(sourceStatus.issues, startIndex, endIndex)
        let payload = [updateIssueOrder(sourceStatus._id, issueOrder)]
        await Promise.all([
            dispatch({ type: LOADING }),
            dispatch({ type: NEW_MESSAGE, payload: payload })
        ])
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

//TODO:
//The actions to send to the API and the action to send back to the store is different......
//Solved. It should be handled in the server
export const chainMove = (sourceStatus, destinationStatus, startIndex, endIndex) => async (dispatch) => {
    dispatch({ type: LOADING })
    try {
        let sourceIssueorder = [...sourceStatus.issues]
        let destinationIssueorder = [...destinationStatus.issues]
        const [removedToMove] = sourceIssueorder.splice(startIndex, 1);
        destinationIssueorder.splice(endIndex, 0, removedToMove);
        const sourceUpdated = { _id: sourceStatus._id, value: sourceIssueorder, attribute: "issues" }
        const destinationUpdated = { _id: destinationStatus._id, value: destinationIssueorder, attribute: "issues" }

        /** 
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
        */
        const payload = [{
            type: MOVE_ISSUES,
            source: sourceUpdated,
            destination: destinationUpdated
        }]
        await Promise.all([
            dispatch({ type: LOADING }),
            dispatch({ type: NEW_MESSAGE, payload: payload })
        ])

    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateIssueOrder = (id, issueOrder) => {
    return { type: UPDATE_ISSUE_ORDER, _id: id, attribute: "issues", value: issueOrder }
}

//TODO check this.
export const updateStatusForIssue = (source, destination, issueId) => {
    const allStatus = getState().StatusReducer.status
    const sourceUpdated = [allStatus.get(source).issues].filter(item => item._id === issueId)
    const destinationUpdated = [allStatus.get(destination).issues].push(issueId)
    /**
    await API.put("StatusApi", "/status/update/attribute", {
        body: { _id: source, value: sourceUpdated, attribute: "issues" }
    })
    await API.put("StatusApi", "/status/update/attribute", {
        body: { _id: destination, value: destinationUpdated, attribute: "issues" }
    })
    */
    return {
        type: MOVE_ISSUES,
        source: sourceUpdated,
        destination: destinationUpdated
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

export const createStatus = (newStatus) => {
    return {
        type: CREATE_STATUS,
        data: newStatus
    }
}


//======================= Below has not been changed yet


export const createMultipleStatus = (list) => async dispatch => {
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
        /**    await API.put("StatusApi", "/status/update/attribute", {
               body: data
           })*/
        const payload = {
            type: UPDATE_STATUS_NAME,
            data: data
        }
        dispatch({ type: NEW_MESSAGE, payload: payload })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteStatus = (id) => async  dispatch => {
    try {
        //  await API.del("StatusApi", "/status/" + id)
        const payload = {
            type: DELETE_STATUS,
            id: id
        }
        dispatch({ type: NEW_MESSAGE, payload: payload })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

//TODO
//Check in the last
export const deleteStatusByProject = (projectId) => async (dispatch) => {
    try {
        await API.del("StatusApi", "/status/project/" + projectId)
        dispatch({ type: "DELETE_PROJECT" })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteIssueFromStatus = (issueId, statusId) => (dispatch, getState) => {
    try {
        let status = getState().StatusReducer.status.get(statusId)
        let statusCopy = { ...status }
        let issuesUpdated = statusCopy.issues.filter(item => item !== issueId)

        //TODO

        //Needs to update the payload, otherwise, the wss server can not update this...

        /**
        await API.put("StatusApi", "/status/update/attribute", {
            body: { _id: statusId, attribute: "issues", value: issuesUpdated }
        }) */
        return {
            type: DELETE_ISSUE_FROM_STATUS,
            issueId: issueId,
            statusId: statusId
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}