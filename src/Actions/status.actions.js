import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"
import { reorder } from "../Components/Util"

export const APPEND_NEW_ISSUE = "APPEND_NEW_ISSUE"
export const ADD_ISSUE_TO_TAIL = "ADD_ISSUE_TO_TAIL"
export const CREATE_STATUS = "CREATE_STATUS"
export const DELETE_STATUS = "DELETE_STATUS"
export const UPDATE_ISSUE_ORDER = "UPDATE_ISSUE_ORDER"
export const UPDATE_STATUS_ATTRIBUTE = "UPDATE_STATUS_ATTRIBUTE"
export const APPEND_STATUS = "APPEND_STATUS"
export const REORDER_ISSUES = "REORDER_ISSUES"
export const MOVE_ISSUE = "MOVE_ISSUE"
export const DELETE_ISSUE_FROM_STATUS = "DELETE_ISSUE_FROM_STATUS"
export const DELETE_STATUS_BY_PROJECT = "DELETE_STATUS_BY_PROJECT"

/**************************** Thunk Actions ***************************/
export const chainCreateStatus = data => async (dispatch) => {
    try {
        dispatch({ type: LOADING })
        dispatch(createStatus(data))
        dispatch({ type: AUTHENTICATED })
    } catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteStatus = (statusId) => (dispatch) => {
    try {
        dispatch({ type: LOADING })
        dispatch(deleteStatusAction(statusId))
        dispatch({ type: AUTHENTICATED })
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

export const chainMove = (sourceStatus, destinationStatus, startIndex, endIndex) => async (dispatch) => {
    dispatch({ type: LOADING })
    try {
        let sourceIssueorder = [...sourceStatus.issues]
        let destinationIssueorder = [...destinationStatus.issues]
        const [removedToMove] = sourceIssueorder.splice(startIndex, 1);
        destinationIssueorder.splice(endIndex, 0, removedToMove);
        // const sourceUpdated = { _id: sourceStatus._id, value: sourceIssueorder, attribute: "issues" }
        //   const destinationUpdated = { _id: destinationStatus._id, value: destinationIssueorder, attribute: "issues" }

        //TODO
        //Move issues


    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}


export const appendNewIssue = (statusId, issueId) => dispatch => {
    dispatch({ type: LOADING })
    dispatch({
        type: APPEND_NEW_ISSUE,
        status: statusId,
        issue: issueId
    })
    dispatch({ type: AUTHENTICATED })
}



export const updateStatusAttribute = (data) => dispatch => {
    dispatch({ type: LOADING })
    dispatch({
        type: UPDATE_STATUS_ATTRIBUTE,
        _id: data._id,
        attribute: data.attribute,
        value: data.value
    })
    dispatch({ type: AUTHENTICATED })
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

export const deleteStatusAction = (id) => async dispatch => {
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

export const reorderToBotttom = (source, startIndex) => {
    return {
        type: REORDER_ISSUES,
        index: source,
        startIndex: startIndex,
        endIndex: -1
    }
}