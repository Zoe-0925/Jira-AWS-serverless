
import { updateIssueOrder, deleteIssueFromStatus, moveIssue } from "./status.actions"
import { dispatchError,  AUTHENTICATED } from "./loading.actions"

export const CREATE_SUB_TASK = "CREATE_SUB_TASK"
export const CREATE_ISSUE = "CREATE_ISSUE"
export const DELETE_TASK = "DELETE_TASK"
export const DELETE_EPIC = "DELETE_EPIC"
export const DELETE_SUB_TASK = "DELETE_SUB_TASK"
export const DELETE_ISSUE_BY_PROJECT = "DELETE_ISSUE_BY_PROJECT"
export const UPDATE_TASK = "UPDATE_TASK"
export const UPDATE_TASK_ATTRIBUTE = "UPDATE_TASK_ATTRIBUTE"
export const UPDATE_EPIC = "UPDATE_EPIC"
export const APPEND_ISSUES = "APPEND_ISSUES"
export const ADD_TASK_TO_EPIC = "ADD_TASK_TO_EPIC"
export const REMOVE_TASK_FROM_EPIC = "REMOVE_TASK_FROM_EPIC"
export const ADD_SUBTASK_TO_TASK = "ADD_SUBTASK_TO_TASK"
export const REMOVE_SUBTASK_FROM_TASK = "REMOVE_SUBTASK_FROM_TASK"
export const UPDATE_ISSUE_GROUP = "UPDATE_ISSUE_GROUP"
export const UPDATE_ISSUE_AFTER_DELETE_STATUS = "UPDATE_ISSUE_AFTER_DELETE_STATUS"
export const REMOVE_LABEL_FROM_ISSUE = "REMOVE_LABEL_FROM_ISSUE"

/**********************************  Thunk Actions  ******************************************/
export const chainCreateIssueAndUpdateIssueOrder = (data) => async (dispatch, getState) => {
    try {
        const issueOrder = getState().StatusReducer.status.get(data.status).issues
        await Promise.all([
            dispatch(createIssue(data)),
            dispatch(updateIssueOrder(data.status, [...issueOrder, data._id])),
        ])
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const chainUpdateIssueStatus = (data, previousStatusId) => async (dispatch, getState) => {
    try {
        const allStatus = getState().StatusReducer.status
        const updatedPreviousStatus = allStatus.get(previousStatusId).issues.filter(item => item._id !== data._id)
        const updatedCurrentStatus = [...allStatus.get(data.status).issues, data._id]
        await Promise.all([
            dispatch(updateIssueAttribute(data)),
            dispatch(moveIssue({ _id: previousStatusId, value: updatedPreviousStatus },
                { _id: updatedCurrentStatus, value: data.status }))
        ])
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const chainDeleteIssue = (issueId, statusId, issueType) => async (dispatch, getState) => {
    try {
        if (issueType !== "task" && issueType !== "epic" && issueType !== "subtask") { return }
        let targetStatus = getState().StatusReducer.status.get(statusId)
        targetStatus.issues = targetStatus.issues.filter(item => item._id !== issueId)
        await Promise.all([
            dispatch(deleteIssue(issueId, issueType)),
            dispatch(deleteIssueFromStatus(issueId, statusId)),
      ])
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const removeLabelFromIssues = labelId => async (dispatch, getState) => {
    try {
        let tasksToUpdate = []
        getState().IssueReducer.tasks.forEach((value, key) => {
            if (value.labels.include(labelId)) {
                tasksToUpdate = [...tasksToUpdate, key]
            }
        })
    }
    catch (err) {
        return dispatch(dispatchError(err))
    }
}

export const updateIssueAttribute = (data) => async dispatch => {
    await dispatch({
        type: UPDATE_TASK_ATTRIBUTE,
        id: data._id,
        key: data.attribute,
        value: data.value,
        action: "update"
    })

}

export const removeLabelFromIssue = (labelId, task) => async dispatch => {
    await dispatch({
        type: REMOVE_LABEL_FROM_ISSUE,
        id: labelId,
        data: task
    })

}

export const createIssue = data => async dispatch => {
    await dispatch({
        type: CREATE_ISSUE,
        data: data,
        action: "create"
    })

}

export const deleteIssue = (issueId, issueType) => async dispatch => {
    let midResult = {
        id: issueId,
        action: "delete"
    }
    let result
    switch (issueType) {
        case "task":
            result = {
                type: DELETE_TASK,
                ...midResult
            }
            break
        case "epic":
            result = {
                type: DELETE_EPIC,
                ...midResult
            }
            break
        case "subtask":
            result = {
                type: DELETE_SUB_TASK,
                ...midResult
            }
            break
        default:
            return
    }
    await dispatch((result))

}

