import API from '@aws-amplify/api';
import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"
import { reorder } from "../components/util"
import { sendWsToServer } from "./websocket.actions"

export const UPDATE_STATUS_ATTRIBUTE="UPDATE_STATUS_ATTRIBUTE"
export const CLEAR_STATUS = "CLEAR_STATUS"
export const APPEND_NEW_ISSUE = "APPEND_NEW_ISSUE"
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
export const getProjectStatus = (projectId) => async  dispatch => {
    try {
        const status = await API.get("StatusApi", "/status/project/" + projectId)
        await dispatch(appendSuccessStatus(status))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
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

export const deleteStatus = (statusId) => async (dispatch) => {
    try {
        await Promise.all([
            dispatch({ type: LOADING }),
            fetchDeleteStatus(statusId),
        ])
        dispatch(deleteStatusAction(statusId))
        dispatch({ type: AUTHENTICATED })
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
        Promise.all([
            dispatch({ type: LOADING }),
            dispatch(updateStatusAttribute(sourceUpdated)),
            dispatch(updateStatusAttribute(destinationUpdated))
        ])
        //TODO
        //broadcast moveIssue()

    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const appendNewIssue = (statusId, issueId) => dispatch => {
    dispatch({ type: LOADING })

    //TODO
    //Update API


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

export const deleteIssueFromStatus = (issueId, statusId) => async (dispatch, getState) => {
    try {
        let status = getState().StatusReducer.status.get(statusId)
        let statusCopy = { ...status }
        let issuesUpdated = statusCopy.issues.filter(item => item !== issueId)
        await fetchUpdateStatusAttribute({ _id: statusId, attribute: "issues", value: issuesUpdated })
        await dispatch({
            type: DELETE_ISSUE_FROM_STATUS,
            issueId: issueId,
            statusId: statusId
        })
        //TODO
        //Uncomment below to enable web socket
        /**
            await dispatch(sendWsToServer({
                type: DELETE_ISSUE_FROM_STATUS,
                issueId: issueId,
                statusId: statusId
            }))
            */
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

    //TODO
    //Uncomment below to enable web socket
    /**
    await dispatch(sendWsToServer({
        type: DELETE_STATUS,
        id: id
    }))
    */
}

export const createStatus = (newStatus) => async dispatch => {
    await dispatch({
        type: CREATE_STATUS,
        data: newStatus
    })


    //TODO
    //Uncomment below to enable web socket
    /**
    await dispatch(sendWsToServer({
        type: CREATE_STATUS,
        data: newStatus
    }))
      */
}

export const updateIssueOrder = (id, issueOrder) => async dispatch => {
    await dispatch({ type: UPDATE_ISSUE_ORDER, _id: id, attribute: "issues", value: issueOrder, action: "update" })

    //TODO
    //Uncomment below to enable web socket
    /**
     *     await dispatch(sendWsToServer({ type: UPDATE_ISSUE_ORDER, _id: id, attribute: "issues", value: issueOrder, action: "update" }))

     */
}

export const appendSuccessStatus = (data) => {
    return {
        type: APPEND_STATUS,
        data: data
    }
}

export const moveIssue = (source, destination) => async dispatch => {
    await dispatch(sendWsToServer({
        type: MOVE_ISSUE,
        source: source,
        destination: destination,
    }))
}

export const reorderToBotttom = (source, startIndex) => {
    return {
        type: REORDER_ISSUES,
        index: source,
        startIndex: startIndex,
        endIndex: -1
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
