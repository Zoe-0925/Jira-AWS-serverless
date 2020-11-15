
import { API } from 'aws-amplify';
import { addIssueToTail, updateStatusForIssue, deleteIssueFromStatus } from "./status.actions"
import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"

export const CREATE_SUCCESS_SUB_TASK = "CREATE_SUCCESS_SUB_TASK"
export const CREATE_SUCCESS_ISSUE = "CREATE_SUCCESS_ISSUE"
export const DELETE_SUCCESS_TASK = "DELETE_SUCCESS_TASK"
export const DELETE_SUCCESS_EPIC = "DELETE_SUCCESS_EPIC"
export const DELETE_SUCCESS_SUB_TASK = "DELETE_SUCCESS_SUB_TASK"
export const DELETE_ISSUE_BY_PROJECT = "DELETE_ISSUE_BY_PROJECT"
export const UPDATE_SUCCESS_TASK = "UPDATE_SUCCESS_TASK"
export const UPDATE_SUCCESS_TASK_ATTRIBUTE = "UPDATE_SUCCESS_TASK_ATTRIBUTE"
export const UPDATE_SUCCESS_EPIC = "UPDATE_SUCCESS_EPIC"
export const APPEND_SUCCESS_ISSUES = "APPEND_SUCCESS_ISSUES"
export const APPEND_SUCCESS_CURRENT_TASK = "APPEND_SUCCESS_CURRENT_TASK"
export const APPEND_SUCCESS_CURRENT_EPIC = "APPEND_SUCCESS_CURRENT_EPIC"
export const ADD_TASK_TO_EPIC = "ADD_TASK_TO_EPIC"
export const REMOVE_TASK_FROM_EPIC = "REMOVE_TASK_FROM_EPIC"
export const ADD_SUBTASK_TO_TASK = "ADD_SUBTASK_TO_TASK"
export const REMOVE_SUBTASK_FROM_TASK = "REMOVE_SUBTASK_FROM_TASK"
export const UPDATE_ISSUE_GROUP = "UPDATE_ISSUE_GROUP"
export const TOGGLE_FLAG = "TOGGLE_FLAG"
export const UPDATE_ISSUE_AFTER_DELETE_STATUS = "UPDATE_ISSUE_AFTER_DELETE_STATUS"
/**********************************  Actions  ******************************************/
export function appendProjectIssues(data) {
    return {
        type: APPEND_SUCCESS_ISSUES,
        data: data
    }
}

export function createSuccessfulIssue(data) {
    return {
        type: CREATE_SUCCESS_ISSUE,
        data: data
    }
}

export function deleteSuccessfulEpic(id) {
    return {
        type: DELETE_SUCCESS_EPIC,
        id: id
    }
}

export function updateSuccessfulTask(data) {
    return {
        type: UPDATE_SUCCESS_TASK,
        data: data
    }
}

export function updateSuccessfulTaskAttribute(id, key, value) {
    return {
        type: UPDATE_SUCCESS_TASK_ATTRIBUTE,
        id: id,
        key: key,
        value: value
    }
}

export function updateIssueAfterDeleteStatus(data, id) {
    return {
        type: UPDATE_ISSUE_AFTER_DELETE_STATUS,
        data: data,
        id: id
    }
}

export function updateSuccessfulEpic(data) {
    return {
        type: UPDATE_SUCCESS_EPIC,
        data: data
    }
}

export function updateIssueGroup(id, data) {
    return {
        type: UPDATE_ISSUE_GROUP,
        id: id,
        data: data
    }
}

export function deleteSuccessIssueByProject(id) {
    return {
        type: DELETE_ISSUE_BY_PROJECT,
        id: id
    }
}

export function deleteSuccessfulTask(id) {
    return {
        type: DELETE_SUCCESS_TASK,
        id: id
    }
}

export function deleteSuccessfulSubtask(id) {
    return {
        type: DELETE_SUCCESS_SUB_TASK,
        id: id
    }
}


/**********************************  Thunk Actions  ******************************************/
export const chainCreateIssueAndUpdateIssueOrder = (data) => async (dispatch, getState) => {
    try {
        const issueOrder = getState().StatusReducer.status.get(data.status).issues
        await Promise.all([
            dispatch({ type: LOADING }),
            dispatch(createIssue(data)),
            dispatch(addIssueToTail(data.status, [...issueOrder, data._id]))])
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const chainUpdateIssueStatus = (data, previousState) => async (dispatch) => {
    try {
        await Promise.all([
            dispatch({ type: LOADING }),
            dispatch(updateIssueAttribute(data)),
            dispatch(updateStatusForIssue(previousState, data._status, data._id))])
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

//TODO
//Add delete task from epic
//Add delete task from subtask......
export const chainDeleteIssue = (issueId, statusId, issueType) => async (dispatch) => {
    try {
        await Promise.all([
            dispatch({ type: LOADING }),
            dispatch(deleteIssue(issueId, issueType)),
            deleteIssueFromStatus(issueId, statusId)
        ])
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const handleIssueAfterDeleteStatus = (statusId, newStatusId) => async (dispatch, getState) => {
    try {
        let tasksToUpdate = []
        getState().IssueReducer.tasks.forEach((value, key) => {
            if (value.status === statusId) {
                tasksToUpdate.push(key)
            }
        })
        tasksToUpdate.forEach(issueId => {
            await API.put("IssueApi", "/issues/update/attribute", {
                body: {
                    _id: issueId,
                    attribute: "status",
                    value: newStatusId
                }
            })
        });
        dispatch(updateIssueAfterDeleteStatus(tasksToUpdate, newStatusId))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}


export const createIssue = (data) => async  dispatch => {
    try {
        await API.post("IssueApi", "/issues/", { body: data })
        dispatch(createSuccessfulIssue(data))
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
        dispatch(appendProjectIssues({
            tasks: tasks, epics: epics, subtasks: subtasks
        }))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateIssueAttribute = (data) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        await API.put("IssueApi", "/issues/update/attribute", {
            body: data
        })
        await dispatch(updateSuccessfulTaskAttribute(data._id, data.attribute, data.value))
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}



export const deleteIssue = (issueId, issueType) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        await API.del("IssueApi", "/issues/object/" + issueId)
        switch (issueType) {
            case "task":
                return dispatch(deleteSuccessfulTask(issueId))
            case "epic":
                return dispatch(deleteSuccessfulEpic(issueId))
            case "subtask":
                return dispatch(deleteSuccessfulSubtask(issueId))
            default:
                return
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteIssueByProject = (projectId) => async (dispatch) => {
    try {
        await API.del("IssueApi", "/issues/project/" + projectId)
        dispatch(deleteSuccessIssueByProject(projectId))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

