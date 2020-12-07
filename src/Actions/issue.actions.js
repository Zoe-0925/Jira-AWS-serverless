
import { API } from 'aws-amplify';
import { updateIssueOrder, updateStatusForIssue, deleteIssueFromStatus } from "./status.actions"
import { dispatchError, LOADING } from "./loading.actions"
import { NEW_MESSAGE } from './websocket.actions';

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
/**********************************  Actions  ******************************************/
export function updateSuccessfulEpic(data) {
    return {
        type: UPDATE_EPIC,
        data: data
    }
}

/**********************************  Thunk Actions  ******************************************/
export const chainCreateIssueAndUpdateIssueOrder = (data) => async (dispatch, getState) => {
    try {
        const issueOrder = getState().StatusReducer.status.get(data.status).issues
        let payload = [createIssue(data), updateIssueOrder(data.status, [...issueOrder, data._id])]
        await Promise.all([
            dispatch({ type: LOADING }),
            dispatch({ type: NEW_MESSAGE, payload: payload })
        ])
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const createIssue = data => {
    return {
        type: CREATE_ISSUE,
        data: data
    }
}

export const chainUpdateIssueStatus = (data, previousState) => async (dispatch) => {
    try {
        let payload = [updateIssueAttribute(data), updateStatusForIssue(previousState, data._status, data._id)]
        await Promise.all([
            dispatch({ type: LOADING }),
            dispatch({ type: NEW_MESSAGE, payload: payload })
        ])
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

//TODO
// deleteIssueFromStatus needs to update the payload
// otherwise, the wss server can not update things.
export const chainDeleteIssue = (issueId, statusId, issueType) => async (dispatch) => {
    try {
        if (issueType !== "task" && issueType !== "epic" && issueType !== "subtask") { return }
        let payload = [deleteIssue(issueId, issueType), deleteIssueFromStatus(issueId, statusId)]

        await Promise.all([
            dispatch({ type: LOADING }),
            dispatch({ type: NEW_MESSAGE, payload: payload })
        ])
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}


export const getProjectIssues = (projectId) => async  dispatch => {
    try {
        const issues = await API.get("IssueApi", "/issues/project/" + projectId)
        let tasks = []
        let epics = []
        let subtasks = []
        issues.map(each => {
            if (each.issueType === "task") {
                tasks.push(each)
                return
            }
            if (each.issueType === "epic") {
                epics.push(each)
                return
            }
            if (each.issueType === "subtask") {
                subtasks.push(each)
                return
            }
        })
        dispatch({
            type: APPEND_ISSUES,
            data: { tasks: tasks, epics: epics, subtasks: subtasks }
        })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateIssueAttribute = (data) => {
    return {
        type: UPDATE_TASK_ATTRIBUTE,
        id: data._id,
        key: data.attribute,
        value: data.value
    }
}

export const deleteIssue = (issueId, issueType) => {
    switch (issueType) {
        case "task":
            return {
                type: DELETE_TASK,
                id: issueId
            }
        case "epic":
            return {
                type: DELETE_EPIC,
                id: issueId
            }
        case "subtask":
            return {
                type: DELETE_SUB_TASK,
                id: issueId
            }
        default:
            return
    }
}

//TODO
//This needs to update the payload
//Otherwise the wss server can not call API
export const removeLabelFromIssues = labelId => async (dispatch, getState) => {
    try {
        let tasksToUpdate = []
        getState().IssueReducer.tasks.forEach((value, key) => {
            if (value.label === labelId) {
                tasksToUpdate.push(key)
            }
        })
        tasksToUpdate.forEach(issueId => {
            API.put("IssueApi", "/issues/update/attribute", {
                body: {
                    _id: issueId,
                    attribute: "label",
                    value: tasksToUpdate.labels.filter(item => item !== labelId)
                }
            })
        });
        dispatch({
            type: REMOVE_LABEL_FROM_ISSUE,
            id: labelId,
            data: tasksToUpdate
        })
    }
    catch (err) {
        return dispatch(dispatchError(err))
    }
}