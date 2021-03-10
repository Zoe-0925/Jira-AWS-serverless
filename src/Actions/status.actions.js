import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"
import API from '@aws-amplify/api';

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
export const deleteStatus = (statusId) => async (dispatch) => {
    try {
        await Promise.all([
            dispatch({ type: LOADING }),
            fetchDeleteStatus(statusId),
        ])
        dispatch({ type: DELETE_STATUS, id: statusId })
        dispatch({ type: AUTHENTICATED })
    } catch (err) {
        dispatch(dispatchError(err))
    }
}

export const chainMove = (sourceIndex, destinationIndex, startIndex, endIndex) => async (dispatch) => {
    try {
        dispatch({ type: LOADING })

        let sourceIssueorder = sourceStatus.issues.map(each => each._id)
        let destinationIssueorder = destinationStatus.issues.map(each => each._id)
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

//TODO 
//Update API
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

export const fetchDeleteIssueFromStatus = () => {

}

export const fetchAppendNewIssue = () => {

}


export const chainCreateStatus = data => async (dispatch) => {
    try {
        await Promise.all([
            dispatch({ type: LOADING }),
            fetchCreateStatus(data),
        ])
        dispatch(createStatus(data))
        dispatch({ type: AUTHENTICATED })
    } catch (err) {
        dispatch(dispatchError(err))
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

export const fetchCreateStatus = async data => {
    await API.post("StatusApi", "/status/", { body: data })
}

export const fetchCreateMultipleStatus = list => async dispatch => {
    list.forEach(element => {
        API.post("StatusApi", "/status", {
            body: element
        }).catch(err => {
            dispatch(dispatchError(err))
        })
    })
}
