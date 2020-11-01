import {
    LOADING_ISSUE, CREATE_SUCCESS_TASK, CREATE_SUCCESS_EPIC, DELETE_SUCCESS_TASK,
    UPDATE_SUCCESS_TASK, DELETE_SUCCESS_EPIC, UPDATE_SUCCESS_EPIC,
    APPEND_SUCCESS_TASKS_PARENT, APPEND_SUCCESS_TASKS_CHILDREN,
    ERROR_ISSUE, UPDATE_ISSUE_GROUP, TOGGLE_FLAG, CREATE_SUCCESS_SUB_TASK, APPEND_SUCCESS_SUBTASKS,
    DELETE_SUCCESS_SUB_TASK, ADD_TASK_TO_EPIC, REMOVE_TASK_FROM_EPIC, ADD_SUBTASK_TO_TASK, REMOVE_SUBTASK_FROM_TASK,
    DELETE_ISSUE_BY_PROJECT
} from "../Actions/issue.actions"
import { DELETE_SUCCESS_STATUS } from "../Actions/status.actions"

const issues = new Map()
issues.set("hdkahdjaskdh", {
    _id: "hdkahdjaskdh", summary: "test 1", key: "test key 1", labels: ["test"], assignee: "testUserId",
    issueType: "task", flag: false, reportee: "testUserId", project: "test id", status: "1"
})


export default function IssueReducer(state = {
    loading: false,
    tasks: issues, //Map()
    epics: [],
    subtasks: [],
    authenticated: false,
    errorMessage: ""
}, action) {
    let newState;
    let tempResult
    switch (action.type) {
        case LOADING_ISSUE:
            return { ...state, loading: true, authenticated: false }
        case CREATE_SUCCESS_TASK:
            newState = { ...state, authenticated: true, loading: false }
            newState.tasks.set(action.data._id, action.data)
            return newState
        case CREATE_SUCCESS_EPIC:
            newState = { ...state, authenticated: true, loading: false }
            newState.epics.push(action.data)
            return newState
        case CREATE_SUCCESS_SUB_TASK:
            newState = { ...state, authenticated: true, loading: false }
            newState.subtasks.push(action.data)
            return newState
        case DELETE_SUCCESS_TASK:
            newState = { ...state, authenticated: true, loading: false }
            newState.tasks.delete(action.id)
            newState.subtasks.filter(item => item.parent !== action.id)
            return newState
        case DELETE_SUCCESS_EPIC:
            newState = { ...state, authenticated: true, loading: false }
            //delete the epic
            tempResult = newState.epics.filter(item => item._id !== action.id)
            newState.epics = tempResult
            // remove the epic's id from all its children tasks
            let childrenTasks = newState.tasks.filter(item => item.parent === action.id)
            childrenTasks.map(each => {
                each.epic = ""
                return each
            })
            return newState
        case DELETE_SUCCESS_SUB_TASK:
            newState = { ...state, authenticated: true, loading: false }
            //delete the subtask
            tempResult = newState.subtasks.filter(item => item._id !== action.id)
            newState.subtasks = tempResult
            // remove the subtask's id from the task
            let parentEpic = newState.issues.find(item => item.subtasks.includes(action.id))
            parentEpic.filter(id => id !== action.id)
            return newState
        case UPDATE_SUCCESS_TASK:
            newState = { ...state, authenticated: true, loading: false }
            newState.issues.set(action.data._id, action.data)
            return newState
        case ADD_TASK_TO_EPIC:
            newState = { ...state, authenticated: true, loading: false }

            return newState
        case REMOVE_TASK_FROM_EPIC:
            newState = { ...state, authenticated: true, loading: false }


            return newState

        case ADD_SUBTASK_TO_TASK:
            newState = { ...state, authenticated: true, loading: false }


            return newState

        case REMOVE_SUBTASK_FROM_TASK:
            newState = { ...state, authenticated: true, loading: false }

            //TODO update the issue and update the epic
            // task = newState.issues.get(action.id)
            //task.epic = action.data
            // newState.issues.set(action.id, issue)
            return newState

        case DELETE_SUCCESS_STATUS:
            //accpets a list of issueIds (issues) and a new status id (id)
            newState = { ...state, authenticated: true, loading: false }
            let issuesToUpdate = newState.issues.filter(item => !action.issues.includes(item._id))
            issuesToUpdate.map(each => each.status = action.id)
            return newState
        case UPDATE_SUCCESS_EPIC:
            newState = { ...state, authenticated: true, loading: false }
            let epic = newState.epics.find(item => item._id = action.data._id)
            epic = action.data
            return newState
        case UPDATE_ISSUE_GROUP:
            newState = { ...state }
            const change = newState.issues.get(action.id)
            newState.splice(newState.indexOf(change), 1, action.data);
            return newState
        case APPEND_SUCCESS_TASKS_PARENT:
            return state;
        case APPEND_SUCCESS_TASKS_CHILDREN:
            return state;
        case APPEND_SUCCESS_SUBTASKS: //
            return state;
        case TOGGLE_FLAG:
            newState = { ...state, authenticated: true, loading: false }
            let issue = newState.issues.get(action.id)
            console.log("action.id", action.id, "issue", issue)
            issue.flag = !issue.flag
            return newState
        case DELETE_ISSUE_BY_PROJECT:
            newState = { ...state, authenticated: true, loading: false }
            for (let [key, value] of newState.entries()) {
                if (value.project === action.id) {
                    newState.delete(key)
                }
            }
            return newState 
        case ERROR_ISSUE:
            return { ...state, authenticated: false, loading: false, errorMessage: action.data }
        default:
            return state;
    }
};

