import API from '@aws-amplify/api';

export const LOADING_STATUS = "LOADING_STATUS"
export const ERROR_STATUS = "ERROR_STATUS"
export const CREATE_SUCCESS_STATUS = "CREATE_SUCCESS_STATUS"
export const DELETE_SUCCESS_STATUS = "DELETE_SUCCESS_STATUS"
export const UPDATE_SUCCESS_STATUS = "UPDATE_SUCCESS_STATUS"
export const UPDATE_SUCCESS_STATUS_ORDER = "UPDATE_SUCCESS_STATUS_ORDER"
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

export const updateSuccessfulStatusOrder = (data) => {
    return {
        type: UPDATE_SUCCESS_STATUS_ORDER,
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

export const saveProjectStatus = (status) => async  dispatch => {
    dispatch({ type: LOADING_STATUS })
    try {
        dispatch(appendSuccessfulStatus(status))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const addStatusOrder = (projectId) => async (dispatch, getState) => {
    dispatch({ type: LOADING_STATUS })
    try {
        const projectReducer = getState().ProjectReducer
        const order = projectReducer.projects.find(project=>project._id===projectReducer.currentProjectId).statusOrder
        dispatch(updateStatusOrder(order))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

//TODO
//To be updated
export const moveIssuesRequest = (id, source, destination, startIndex, endIndex) => async  dispatch => {
    dispatch({ type: LOADING_STATUS })
    try {
        //  const call = source === destination
        //      ? fetchUpdateIssueOrders(process.env.BASE, id, source, startIndex, endIndex, token)
        //      : fetchUpdateMultipleIssueOrders(process.env.BASE, source, destination, startIndex, endIndex, token)
        //    const response = await dispatch(call)

        //  dispatch(reorderIssues(source, startIndex, endIndex))

        //   else if (response.success && source !== destination) {
        //      dispatch(moveIssues(source, destination, startIndex, endIndex))
        //   }

    }
    catch (err) {
        dispatch(dispatchError(err))
        //TODO
        //dispatch undo
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}

export const createStatus = (newStatus) => async  dispatch => {
    dispatch({ type: LOADING_STATUS })
    try {
        await API.post("StatusApi", "/status", {
            body: newStatus
        })
        dispatch(createSuccessfulStatus(newStatus))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateStatus = (data) => async  dispatch => {
    dispatch({ type: LOADING_STATUS })
    try {
        await API.put("StatusApi", "/status", {
            body: data
        })
        dispatch(updateSuccessfulStatus(data))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteStatus = (id) => async  dispatch => {
    dispatch({ type: LOADING_STATUS })
    try {
        await API.del("StatusApi", "/status/" + id)
        dispatch(deleteSuccessfulStatus(id))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const getAllStatus = (projectId) => async  dispatch => {
    dispatch({ type: LOADING_STATUS })
    try {
        const data = await API.get("StatusApi", "/status/project/" + projectId)
        dispatch(createSuccessfulStatus(data))

    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}
