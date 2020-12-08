import API from '@aws-amplify/api';
import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"
import { reorder } from "../Components/Util"
import { deleteIssue } from "./issue.actions"
import { removeStatusFromOrder, updateProjectAttribute, fetchUpdateProjectAttribute, updateStatusOrder } from "./project.actions"

export const ADD_ISSUE_TO_TAIL = "ADD_ISSUE_TO_TAIL"
export const CREATE_STATUS = "CREATE_STATUS"
export const DELETE_STATUS = "DELETE_STATUS"
export const UPDATE_STATUS_NAME = "UPDATE_STATUS_NAME"
export const UPDATE_ISSUE_ORDER = "UPDATE_ISSUE_ORDER"
export const APPEND_STATUS = "APPEND_STATUS"
export const REORDER_ISSUES = "REORDER_ISSUES"
export const MOVE_ISSUE = "MOVE_ISSUES"
export const DELETE_ISSUE_FROM_STATUS = "DELETE_ISSUE_FROM_STATUS"
export const DELETE_STATUS_BY_PROJECT = "DELETE_STATUS_BY_PROJECT"

/**************************** Thunk Actions ***************************/
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

export const chainCreateStatus = data => async (dispatch, getState) => {
    try {
        const project = getState().ProjectReducer.projects.find(item => item._id === data.project)
        const projectAttributePayload = { _id: data.project, attribute: "statusOrder", value: [...project.statusOrder, data._id] }
        await Promise.all([
            dispatch({ type: LOADING }),
            fetchCreateStatus(data),
            fetchUpdateProjectAttribute(projectAttributePayload)
        ])
        await Promise.all([
            dispatch(createStatus(data)),
            dispatch(updateProjectAttribute(data)),
            await dispatch({ type: NEW_MESSAGE, payload: createStatus(data) }),
            await dispatch({ type: NEW_MESSAGE, payload: updateProjectAttribute(projectAttributePayload) }),
        ])
    } catch (err) {
        dispatch(dispatchError(err))
    }
}

export const chaninDeleteStatus = (status) => async (dispatch, getState) => {
    try {
        const project = getState().ProjectReducer.projects.find(project => project._id === status.project)
        let newOrder = project.statusOrder.filter(item => item._id !== status._id)
        await Promise.all([
            dispatch({ type: LOADING }),
            fetchDeleteStatus(status._id),
            fetchUpdateProjectAttribute({ _id: status.project, attribute: "statusOrder", value: newOrder })
        ])
        await Promise.all([
            dispatch(deleteStatus(status._id)),
            dispatch(updateStatusOrder(newOrder)),
            dispatch({ type: NEW_MESSAGE, payload: deleteStatus(status._id) }),
            dispatch({ type: NEW_MESSAGE, payload: updateStatusOrder(newOrder) })
        ])
    } catch (err) {
        dispatch(dispatchError(err))
    }
}

export const chainReorder = (sourceStatus, startIndex, endIndex) => async (dispatch) => {
    try {
        const issueOrder = reorder(sourceStatus.issues, startIndex, endIndex)
        await Promise.all([
            dispatch({ type: LOADING }),
            fetchUpdateStatusAttribute({ _id: sourceStatus._id, attribute: "issues", value: issueOrder })
        ])
        let payload = [updateIssueOrder(sourceStatus._id, issueOrder)]
        await Promise.all([
            dispatch(payload),
            dispatch({ type: NEW_MESSAGE, payload: payload })
        ])
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

        const payload = moveIssue()
        await Promise.all([
            dispatch({ type: LOADING }),
            dispatch({ type: NEW_MESSAGE, payload: payload })
        ])

    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

//TODO check this.
export const moveIssue = (source, destination, issueId) => {
    return {
        type: MOVE_ISSUE,
        source: source,
        destination: destination,
        
    }
}



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
            data: data,
            action: "update"
        }
        dispatch({ type: NEW_MESSAGE, payload: payload })
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
        await fetchUpdateStatusAttribute({ _id: statusId, attribute: "issues", value: issuesUpdated })
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

/**************************** Actions ***************************/


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

export const updateIssueOrder = (id, issueOrder) => {
    return { type: UPDATE_ISSUE_ORDER, _id: id, attribute: "issues", value: issueOrder, action: "update" }
}

export const deleteStatus = (id) => {
    return {
        type: DELETE_STATUS,
        id: id
    }
}

export const createStatus = (newStatus) => {
    return {
        type: CREATE_STATUS,
        data: newStatus,
        action: "create"
    }
}

/**************************** APIs ***************************/

export const fetchUpdateStatusAttribute = async data => {
    await API.put("StatusApi", "/status/update/attribute", { body: data })
}

export const fetchDeleteStatusByProject = async projectId => {
    await API.del("StatusApi", "/status/project/" + projectId)
}

export const fetchDeleteStatus = async id => {
    await API.del("StatusApi", "/status/" + id)
}