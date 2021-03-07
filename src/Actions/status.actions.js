import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"

export const APPEND_NEW_ISSUE = "APPEND_NEW_ISSUE"
export const CREATE_STATUS = "CREATE_STATUS"
export const DELETE_STATUS = "DELETE_STATUS"
export const UPDATE_STATUS_ATTRIBUTE = "UPDATE_STATUS_ATTRIBUTE"
export const APPEND_STATUS = "APPEND_STATUS"
export const REORDER_ISSUES = "REORDER_ISSUES"
export const MOVE_ISSUE = "MOVE_ISSUE"
export const DELETE_ISSUE_FROM_STATUS = "DELETE_ISSUE_FROM_STATUS"
export const DELETE_STATUS_BY_PROJECT = "DELETE_STATUS_BY_PROJECT"

/**************************** Thunk Actions ***************************/



export const deleteStatus = (statusId) => (dispatch) => {
    try {
        dispatch({ type: LOADING })
        dispatch({ type: DELETE_STATUS, id: statusId })
        dispatch({ type: AUTHENTICATED })
    } catch (err) {
        dispatch(dispatchError(err))
    }
}

export const chainMove = (sourceIndex, destinationIndex, startIndex, endIndex) => async (dispatch) => {
    try {
        dispatch({ type: LOADING })
        dispatch({
            type: MOVE_ISSUE,
            sourceIndex: sourceIndex,
            destinationIndex: destinationIndex,
            startIndex: startIndex,
            endIndex: endIndex
        })
        dispatch({ type: AUTHENTICATED })
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


export const createStatus = (newStatus) => dispatch => {
    dispatch({ type: LOADING })
    dispatch({
        type: CREATE_STATUS,
        data: newStatus
    })
    dispatch({ type: AUTHENTICATED })
}

export const appendSuccessStatus = (data) => {
    return {
        type: APPEND_STATUS,
        data: data
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