import {
    LOADING_ISSUE, DELETE_SUCCESS_TASK, UPDATE_SUCCESS_TASK, DELETE_SUCCESS_EPIC,
    UPDATE_SUCCESS_EPIC, ERROR_ISSUE, UPDATE_ISSUE_GROUP, TOGGLE_FLAG, DELETE_SUCCESS_SUB_TASK,
    ADD_TASK_TO_EPIC, REMOVE_TASK_FROM_EPIC, ADD_SUBTASK_TO_TASK, REMOVE_SUBTASK_FROM_TASK,
    DELETE_ISSUE_BY_PROJECT, APPEND_SUCCESS_ISSUES,CREATE_SUCCESS_ISSUE
} from "../Actions/issue.actions"
import { DELETE_SUCCESS_STATUS } from "../Actions/status.actions"

const issues = new Map()
issues.set("hdkahdjaskdh", {
    _id: "hdkahdjaskdh", summary: "test 1", key: "test key 1", labels: ["test"], assignee: "testUserId",
    issueType: "task", flag: false, reportee: "testUserId", project: "test id", status: "1"
})

const initialState = {
    loading: false,
    tasks: issues, //Map()
    epics: [],
    subtasks: [],
    authenticated: false,
    errorMessage: ""
}

export default function IssueReducer(state = initialState, action) {
    let newState = { ...state, authenticated: true, loading: false }
    switch (action.type) {
        case LOADING_ISSUE:
            return { ...state, loading: true, authenticated: false }
        case APPEND_SUCCESS_ISSUES:
            return {
                ...state, loading: true, authenticated: false, tasks: action.data.tasks,
                epics: action.data.epics, subtasks: action.data.subtasks
            }
        case CREATE_SUCCESS_ISSUE:
            if (action.data.issueType === "task") { newState.tasks.set(action.data._id, action.data) }
            if (action.data.issueType === "epic") { newState.epics.push(action.data) }
            if (action.data.issueType === "subtask") { newState.subtasks.push(action.data) }
            return newState
        case DELETE_SUCCESS_TASK:
            newState.tasks.delete(action.id)
            newState.subtasks.filter(item => item.parent !== action.id)
            return newState
        case DELETE_SUCCESS_EPIC:
            //delete the epic
            newState.epics.filter(item => item._id !== action.id)
            return newState
        case DELETE_SUCCESS_SUB_TASK:
            //delete the subtask
            newState.subtasks.filter(item => item._id !== action.id)
            // remove the subtask's id from the task
            let parentEpic = newState.issues.find(item => item.subtasks.includes(action.id))
            parentEpic.filter(id => id !== action.id)
            return newState
        case UPDATE_SUCCESS_TASK:
            newState.issues.set(action.data._id, action.data)
            return newState
        case ADD_TASK_TO_EPIC:



            return newState
        case REMOVE_TASK_FROM_EPIC:


            return newState

        case ADD_SUBTASK_TO_TASK:



            return newState

        case REMOVE_SUBTASK_FROM_TASK:

            //TODO update the issue and update the epic
            // task = newState.issues.get(action.id)
            //task.epic = action.data
            // newState.issues.set(action.id, issue)
            return newState

        case DELETE_SUCCESS_STATUS:
            //accpets a list of issueIds (issues) and a new status id (id)
            let issuesToUpdate = newState.issues.filter(item => !action.issues.includes(item._id))
            issuesToUpdate.map(each => each.status = action.id)
            return newState
        case UPDATE_SUCCESS_EPIC:
            let epic = { ...newState.epics.find(item => item._id = action.data._id) }
            epic = action.data
            return newState
        case UPDATE_ISSUE_GROUP:
            const change = newState.issues.get(action.id)
            newState.splice(newState.indexOf(change), 1, action.data);
            return newState




        case TOGGLE_FLAG:
            let issue = newState.issues.get(action.id)
            issue.flag = !issue.flag
            return newState
        case DELETE_ISSUE_BY_PROJECT:
            return initialState
        case ERROR_ISSUE:
            return { ...state, authenticated: false, loading: false, errorMessage: action.data }
        default:
            return state;
    }
};

