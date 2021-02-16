import API from '@aws-amplify/api';
import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"
import { reorder } from "../Components/Util"
import { updateProjectAttribute, updateStatusOrder } from "./project.actions"

export const ADD_ISSUE_TO_TAIL = "ADD_ISSUE_TO_TAIL"
export const CREATE_STATUS = "CREATE_STATUS"
export const DELETE_STATUS = "DELETE_STATUS"
export const UPDATE_STATUS_NAME = "UPDATE_STATUS_NAME"
export const UPDATE_ISSUE_ORDER = "UPDATE_ISSUE_ORDER"
export const APPEND_STATUS = "APPEND_STATUS"
export const REORDER_ISSUES = "REORDER_ISSUES"
export const MOVE_ISSUE = "MOVE_ISSUE"
export const DELETE_ISSUE_FROM_STATUS = "DELETE_ISSUE_FROM_STATUS"
export const DELETE_STATUS_BY_PROJECT = "DELETE_STATUS_BY_PROJECT"

/**************************** Thunk Actions ***************************/
export const chainCreateStatus = data => async (dispatch, getState) => {
    try {
        const project = getState().ProjectReducer.projects.find(item => item._id === data.project)
        const projectAttributePayload = { _id: data.project, attribute: "statusOrder", value: [...project.statusOrder, data._id] }
        dispatch({ type: LOADING })
        await Promise.all([
            dispatch(createStatus(data)),
            dispatch(updateProjectAttribute(data)),
        ])
    } catch (err) {
        dispatch(dispatchError(err))
    }
}

export const chaninDeleteStatus = (statusId) => async (dispatch, getState) => {
    try {
        const status = getState().StatusReducer.status.get(statusId)
        const project = getState().ProjectReducer.projects.find(project => project._id === status.project)
        let newOrder = project.statusOrder.filter(item => item._id !== status._id)
        dispatch({ type: LOADING })
        await Promise.all([
            dispatch(deleteStatus(status._id)),
            dispatch(updateStatusOrder(newOrder))
        ])
    } catch (err) {
        dispatch(dispatchError(err))
    }
}

export const chainReorder = (sourceStatus, startIndex, endIndex) => async (dispatch) => {
    try {
        const issueOrder = reorder(sourceStatus.issues, startIndex, endIndex)
        dispatch({ type: LOADING })
            await dispatch(updateIssueOrder(sourceStatus._id, issueOrder))
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

//TODO 
//Needs to update///
//Because the reducer accepts 2 arrays of results

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

        //TODO
        //broadcast moveIssue()

    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateStatusName = (data) => async  dispatch => {
    try {
        dispatch({ type: LOADING })
        dispatch(updateStatusNameAction(data))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteIssueFromStatus = (issueId, statusId) => async (dispatch) => {
    try {
        await dispatch({
            type: DELETE_ISSUE_FROM_STATUS,
            issueId: issueId,
            statusId: statusId
        })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteStatus = (id) => async dispatch => {
    await dispatch({
        type: DELETE_STATUS,
        id: id
    })
}

export const createStatus = (newStatus) => async dispatch => {
    await dispatch({
        type: CREATE_STATUS,
        data: newStatus
    })
}

export const updateStatusNameAction = data => async dispatch => {
    await dispatch({
        type: UPDATE_STATUS_NAME,
        data: data
    })
}

export const updateIssueOrder = (id, issueOrder) => async dispatch => {
    await dispatch({ type: UPDATE_ISSUE_ORDER, _id: id, attribute: "issues", value: issueOrder, action: "update" })
}

export const appendSuccessStatus = (data) => {
    return {
        type: APPEND_STATUS,
        data: data
    }
}

export const moveIssue = (source, destination) => async dispatch => {
    await dispatch({
        type: MOVE_ISSUE,
        source: source,
        destination: destination,
    })
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