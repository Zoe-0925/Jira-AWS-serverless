
import { API } from 'aws-amplify';
import { updateIssueOrder, deleteIssueFromStatus, fetchUpdateStatusAttribute, moveIssue } from "./status.actions"
import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"
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

/**********************************  Thunk Actions  ******************************************/
export const getProjectIssues = (projectId) => async  dispatch => {
    try {
        const issues = await API.get("IssueApi", "/issues/project/" + projectId)
        let tasks = []
        let epics = []
        let subtasks = []
        issues.map(each => {
            if (each.issueType === "task") {
                tasks = [...tasks, each]
                return
            }
            if (each.issueType === "epic") {
                epics = [...epics, each]
                return
            }
            if (each.issueType === "subtask") {
                subtasks = [...subtasks, each]
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

export const chainCreateIssueAndUpdateIssueOrder = (data) => async (dispatch, getState) => {
    try {
        const issueOrder = getState().StatusReducer.status.get(data.status).issues
        await Promise.all([
            dispatch({ type: LOADING }),
            fetchCreateIssue(data),
            fetchUpdateStatusAttribute({ _id: data.status, attribute: "issues", value: [...issueOrder, data._id] })
        ])
        await Promise.all([
            dispatch(createIssue(data)),
            dispatch(updateIssueOrder(data.status, [...issueOrder, data._id])),
            dispatch({ type: NEW_MESSAGE, payload: createIssue(data), action: "broadcast" }),
            dispatch({ type: NEW_MESSAGE, payload: updateIssueOrder(data.status, [...issueOrder, data._id]), action: "broadcast" })
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
            dispatch({ type: LOADING }),
            fetchUpdateIssueAttribute(data),
            fetchUpdateStatusAttribute({ _id: previousStatusId, value: updatedPreviousStatus, attribute: "issues" })
        ])
        await fetchUpdateStatusAttribute({ _id: data.status, value: updatedCurrentStatus, attribute: "issues" })
        const moveIssuePayload = moveIssue({ _id: previousStatusId, value: updatedPreviousStatus },
            { _id: updatedCurrentStatus, value: data.status })
        await Promise.all([
            dispatch({ type: LOADING }),
            disptch(moveIssuePayload),
            disptch(updateIssueAttribute(data)),
            dispatch({ type: NEW_MESSAGE, payload: moveIssuePayload }),
            dispatch({ type: NEW_MESSAGE, payload: updateIssueAttribute(data), action: "broadcast" })
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
            dispatch({ type: LOADING }),
            fetchDeleteIssue(issueId),
            fetchUpdateStatusAttribute({ _id: targetStatus._id, attribute: "issues", value: targetStatus.issues })
        ])
        await Promise.all([
            dispatch({ type: LOADING }),
            dispatch(deleteIssue(issueId, issueType)),
            dispatch(deleteIssueFromStatus(issueId, statusId)),
            dispatch({ type: NEW_MESSAGE, payload: deleteIssue(issueId, issueType) }),
            dispatch({ type: NEW_MESSAGE, payload: deleteIssueFromStatus(issueId, statusId) }),
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
                [...tasksToUpdate, key]
            }
        })
        tasksToUpdate.forEach(async eachIssue => {
            await fetchUpdateIssueAttribute({
                _id: issueId,
                attribute: "label",
                value: eachIssue.labels.filter(item => item !== labelId)
            })
            await Promise.all([
                dispatch(removeLabelFromIssue(labelId, eachIssue)),
                dispatch({ type: NEW_MESSAGE, payload: removeLabelFromIssue(labelId, eachIssue) })
            ])
        })
    }
    catch (err) {
        return dispatch(dispatchError(err))
    }
}

/********************************** Actions  ******************************************/
export const removeLabelFromIssue = () => {
    return {
        type: REMOVE_LABEL_FROM_ISSUE,
        id: labelId,
        data: task
    }
}

export const createIssue = data => {
    return {
        type: CREATE_ISSUE,
        data: data,
        action: "create"
    }
}

export const updateIssueAttribute = (data) => {
    return {
        type: UPDATE_TASK_ATTRIBUTE,
        id: data._id,
        key: data.attribute,
        value: data.value,
        action: "update"
    }
}

export const deleteIssue = (issueId, issueType) => {
    let result = {
        id: issueId,
        action: "delete"
    }
    switch (issueType) {
        case "task":
            return {
                type: DELETE_TASK,
                ...result
            }
        case "epic":
            return {
                type: DELETE_EPIC,
                ...result
            }
        case "subtask":
            return {
                type: DELETE_SUB_TASK,
                ...result
            }
        default:
            return
    }
}

/********************************** API calls  ******************************************/

export const fetchCreateIssue = async data => {
    await API.push("IssueApi", "/issues", { body: data })
}

export const fetchUpdateIssueAttribute = async data => {
    await API.put("IssueApi", "/issues/update/attribute", { body: data })
}

export const fetchDeleteIssue = async id => {
    await API.del("IssueApi", "/issues/object" + id)
}

export const fetchDeleteIssueByProject = async projectId => {
    await API.del("IssueApi", "/issues/project" + projectId)
}